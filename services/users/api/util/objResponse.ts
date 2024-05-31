import { Response } from "express";

const objResponse = ({ code, message, res, resCode, data }: { code: number, message: string, res: Response, resCode: number, data?: object }) => {
    return res.status(resCode).json({
        code: code,
        message: message,
        data: data,
    });
};

export default objResponse;
