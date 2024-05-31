import axios from 'axios';
import CreateUser from '../models/CreateUser';
import AnUser from '../models/AnUser';

class UserController {
    async create(user: CreateUser | undefined) {
        if (user) {
            try {
                const { data } = await axios({
                    method: 'POST',
                    //@ts-ignore
                    url: `${import.meta.env.VITE_API_URL}/users/create/`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        password: user.getPassword(),
                        login: user.getLogin(),
                        name: user.getName(),
                        surname: user.getSurname(),
                        reset_password: user.getResetPassword(),
                        email: user.getEmail(),
                        telephone: user.getTelephone(),
                    },
                });
    
                if (data.code === 1003) {
                    return {
                        status: 'CREATED',
                    };
                } else if (data.code === 1002) {
                    return {
                        status: 'NOT_CREATED',
                    };
                }
            } catch (err) {
                throw err;
            }
        }
    }

    async checkLogin(login: string | undefined) {
        if (login) {
            try {
                const { data } = await axios({
                    method: 'GET',
                    //@ts-ignore
                    url: `${import.meta.env.VITE_API_URL}/users/check-login/${login}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (data.code === 1013) {
                    return true;
                } else if (data.code === 1012) {
                    return false;
                }
            } catch (err) {
                throw err;
            }
        }
    }

    async getUser(uuid4: string | undefined) {
        if (uuid4) {
            try {
                const { data } = await axios({
                    method: 'GET',
                    url: `${import.meta.env.VITE_API_URL}/users/get/${uuid4}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (data.code === 1010) {
                    return new AnUser(data.data);
                }
            } catch (err) {
                throw err;
            }
        }
    }

    async userUpdatePassword(uuid4: string | undefined, password: string | undefined) {
        if (password) {
            try {
                const { data } = await axios({
                    method: 'PUT',
                    url: `${import.meta.env.VITE_API_URL}/users/update/password/${uuid4}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        password: password,
                    }
                });

                if (data.code === 1016) {
                    return true;
                } else {
                    return false;
                }
            } catch (err) {
                throw err;
            }
        }
    }
}

export default new UserController();
