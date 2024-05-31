import chalk from "chalk";
import { NextFunction, Request, Response } from "express";
import language from "../../lang/language";
import objResponse from "../../util/objResponse";

export default async (err: Error, req: Request, res: Response, next: NextFunction) => {
    const lang = await language().then((lang) => lang.server)
    console.error(chalk.bgRed(err.stack));

    return objResponse({
        code: lang.error.code,
        message: lang.error.message,
        res: res,
        resCode: 500,
    });
}