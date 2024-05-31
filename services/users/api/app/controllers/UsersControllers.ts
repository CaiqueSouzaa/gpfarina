import { matchedData } from "express-validator";
import * as Yup from 'yup';
import uuid4 from 'uuid4';
import { NextFunction, Response } from "express";

import Users from "../models/Users";
import language from "../../lang/language";
import objResponse from "../../util/objResponse";
import IRequest from "../../ts/interfaces/IRequest";
import defineUndefined from "../../util/defineUndefined";
import { Op, Sequelize } from "sequelize";

class UsersController {
    async show(req: IRequest, res: Response, next: NextFunction) {
        const lang = await language().then((lang) => lang.controllers.users.show);
        const data = matchedData(req) as {
            uuid4: string;
        };
        const schema = Yup.object().shape({
            uuid4: Yup.string().required(),
        });

        try {
            await schema.validate(data);
        } catch (err: any) {
            return objResponse({
                code: lang.invalid_body.code,
                message: lang.invalid_body.message || err.errors[0],
                res: res,
                resCode: 200
            });
        }

        // Buscando pelo uuid4 de usuário
        let user: Users | null;
        try {
            user = await Users.findOne({
                where: {
                    uuid4: data.uuid4,
                },
                attributes: ['id', 'uuid4', 'name', 'surname', 'login', 'reset_password', 'email', 'telephone'],
            });

            if (!user) {
                return objResponse({
                    code: lang.user_not_finded.code,
                    message: lang.user_not_finded.message,
                    res: res,
                    resCode: 200,
                });
            }
        } catch (err) {
            return next(err);
        }

        return objResponse({
            code: lang.sucess.code,
            message: lang.sucess.message,
            res: res,
            resCode: 200,
            data: user,
        });
    }

    async find(req: IRequest, res: Response, next: NextFunction) {
        const lang = await language().then((lang) => lang.controllers.users.find);
        const data = matchedData(req) as {
            term: string;
        };
        const schema = Yup.object().shape({
            term: Yup.string().required(),
        });

        try {
            await schema.validate(data);
        } catch (err: any) {
            return objResponse({
                code: lang.invalid_body.code,
                message: lang.invalid_body.message || err.errors[0],
                res: res,
                resCode: 200,
            });
        }

        // Buscando pelos usuários que correspondam ao termo
        let users: Users[] | null;
        try {
            const searchTerm = `%${data.term.replace(/[%_]/g, '\\$&')}%`; // Escapa caracteres especiais
            users = await Users.findAll({
                attributes: ['id', 'uuid4', 'name', 'surname', 'login', 'email'],
                where: {
                    [Op.or]: [
                        {
                            name: {
                                [Op.like]: searchTerm,
                            },
                        },
                        {
                            surname: {
                                [Op.like]: searchTerm,
                            },
                        },
                        {
                            login: {
                                [Op.like]: searchTerm,
                            },
                        },
                        {
                            email: {
                                [Op.like]: searchTerm,
                            },
                        },
                        Sequelize.literal(`CONCAT(COALESCE(name, ''), ' ', COALESCE(surname, '')) LIKE '${searchTerm}'`)
                    ],
                },
            });
        } catch (err) {
            return next(err);
        }

        return objResponse({
            code: lang.sucess.code,
            message: lang.sucess.message,
            res: res,
            resCode: 200,
            data: users,
        });
    }

    async store(req: IRequest, res: Response, next: NextFunction) {
        const lang = await language().then((lang) => lang.controllers.users.store);
        let userCreated: boolean = false;
        let userId: number = 0;
        const data = matchedData(req) as {
            name: string;
            surname: string;
            login: string;
            password: string;
            reset_password: boolean;
            email: string;
            telephone: string;
        };
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            surname: Yup.string(),
            login: Yup.string().min(5).required(),
            password: Yup.string().min(5).required(),
            reset_password: Yup.boolean(),
            email: Yup.string(),
            telephone: Yup.string(),
        });

        Object.keys(data).map((key: any) => {
            //@ts-ignore
            if (data[key] == '') {
            //@ts-ignore
                data[key] = undefined;
            }
        });

        try {
            await schema.validate(data);
        } catch (err: any) {
            return objResponse({
                code: lang.invalid_body.code,
                message: lang.invalid_body.message || err.errors[0],
                res: res,
                resCode: 200,
            });
        }

        // Verificando se o login de usuário segue registrado
        try {
            const hasUserLogin = await Users.count({
                where: {
                    login: data.login,
                },
            });

            if (hasUserLogin > 0) {
                return objResponse({
                    code: lang.userlogin_in_use.code,
                    message: lang.userlogin_in_use.message,
                    res: res,
                    resCode: 200,
                });
            }
        } catch (err) {
            return next(err);
        }

        // Criando o usuário
        try {
           const { id } = await Users.create({
                uuid4: uuid4(),
                name: data.name,
                surname: data.surname,
                login: data.login,
                password: data.password,
                reset_password: data.reset_password,
                email: data.email,
                telephone: data.telephone,
                created_by: req.userId,
            });

            if (id) {
                userCreated = true;
                userId = id;
            }
        } catch (err) {
            return next(err);
        }

        if (userCreated && userId > 0) {
            return objResponse({
                code: lang.sucess.code,
                message: lang.sucess.message,
                res: res,
                resCode: 201,
                data: {
                    user_id: userId,
                }
            });
        }
    }

    async index(req: IRequest, res: Response, next: NextFunction) {
        const lang = await language().then((lang) => lang.controllers.users.index);
        const data =  defineUndefined(matchedData(req)) as {
            start_in: string;
            end_in: string;
        };
        const schema = Yup.object().shape({
            start_in: Yup.number().integer().min(0),
            end_in: Yup.number().integer().min(0)
        });

        try {
            await schema.validate(data);
        } catch (err: any) {
            return objResponse({
                code: lang.invalid_body.code,
                message: lang.invalid_body.message || err.errors[0],
                res: res,
                resCode: 200,
            });
        }

        // Buscando pelos usuários
        let users: Users[] | null;
        try {
            users = await Users.findAll({
                attributes: ['id', 'uuid4', 'name', 'surname', 'login', 'email'],
                offset: Number(data.start_in) || undefined,
                limit: Number(data.end_in) || undefined,
            });
        } catch (err) {
            return next(err);
        }

        return objResponse({
            code: lang.sucess.code,
            message: lang.sucess.message,
            res: res,
            resCode: 200,
            data: users,
        });
    }

    async checkLogin(req: IRequest, res: Response, next: NextFunction) {
        const lang = await language().then((lang) => lang.controllers.users.checkLogin);
        const data = matchedData(req) as { login: string };
        const schema = Yup.object().shape({
            login: Yup.string().min(5).required(),
        });

        try {
            await schema.validate(data);
        } catch (err: any) {
            return objResponse({
                code: lang.invalid_body.code,
                message: lang.invalid_body.message || err.errors[0],
                res: res,
                resCode: 200,
            });
        }

        // Verificando se o login de usuário segue registrado
        try {
            const hasUserLogin = await Users.count({
                where: {
                    login: data.login,
                },
            });

            if (hasUserLogin > 0) {
                return objResponse({
                    code: lang.userlogin_in_use.code,
                    message: lang.userlogin_in_use.message,
                    res: res,
                    resCode: 200,
                    data: {
                        status: false,
                    }
                });
            }
        } catch (err) {
            return next(err);
        }

        return objResponse({
            code: lang.sucess.code,
            message: lang.sucess.message,
            res: res,
            resCode: 200,
            data: {
                status: true,
            }
        });
    }

    async updatePassword(req: IRequest, res: Response, next: NextFunction) {
        const lang = await language().then((lang) => lang.controllers.users.resetPassword);
        const data = matchedData(req) as { uuid4: string, password: string };
        const schema = Yup.object().shape({
            uuid4: Yup.string().required(),
            password: Yup.string().min(5).required(),
        });

        try {
            await schema.validate(data);
        } catch (err: any) {
            return objResponse({
                code: lang.invalid_body.code,
                message: lang.invalid_body.message || err.errors[0],
                res: res,
                resCode: 200,
            });
        }

        // Verificando se o uuid4 de usuário existe
        let hasUser = 0;
        try {
            hasUser = await Users.count({
                where: {
                    uuid4: data.uuid4,
                }
            });

            if (hasUser == 0) {
                return objResponse({
                    code: lang.user_not_found.code,
                    message: lang.user_not_found.message,
                    res: res,
                    resCode: 200,
                });
            }
        } catch (err) {
            return next(err);
        }

        // Buscando pelo usuário
        let user: Users | null;
        try {
            user = await Users.findOne({
                where: {
                    uuid4: data.uuid4,
                },
                attributes: ['id'],
            });

        } catch (err) {
            return next(err);
        }

        // Atualizando a senha de usuário
        try {
            await user?.update({
                password: data.password
            });
        } catch (err) {
            return next(err);
        }

        return objResponse({
            code: lang.sucess.code,
            message: lang.sucess.message,
            res: res,
            resCode: 200,
        });
    }

    async update(req: IRequest, res: Response, next: NextFunction) {}

    async destroy(req: IRequest, res: Response, next: NextFunction) {}
}

export default new UsersController();
