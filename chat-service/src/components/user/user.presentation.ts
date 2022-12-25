import { inject, injectable } from "inversify";
import { Request, Response } from 'express';
import winston from 'winston';

import { ResponseStatus } from "../../utils/consts";
import { TYPES } from "../../configs/di.types.config";
import { LoggerDriver } from "../../drivers/logger.driver";
import { UserCtrl } from './user.controller';
import { InputUserData } from "./user.model";

@injectable()
export class UserPresntationLayer {
    Logger: winston.Logger;

    constructor(
        @inject(TYPES.LoggerDriver) private loggerDriver: LoggerDriver, 
        @inject(TYPES.UserCtrl) private userCtrl: UserCtrl
    ) {
        this.Logger = this.loggerDriver.Logger;
    }

    test_R(req: Request, res: Response): Response {
        this.Logger.info('test_R() executed');
        this.userCtrl.someFunc();

        return res.status(ResponseStatus.Ok).json({
            date: Date.now(),
            description: 'This is the date right now'
        });
    }

    async login_R(req: Request, res: Response): Promise<void> {
        const reqBody: LoginRequestBody = req.body as LoginRequestBody;
        const verificatedUser = await this.userCtrl.verifyUser(reqBody);
        
        let statusCode: number = ResponseStatus.BadRequest;
        let payload: any = {
            description: 'Request must have username and password fields in body'
        }

        if (verificatedUser) {
            statusCode = ResponseStatus.Ok;
            payload = verificatedUser;
        }

        res.status(statusCode).json(payload);
    }

    async signUp_R(req: Request, res: Response): Promise<Response> {
        const userData: InputUserData = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            name: req.body.name,
            profileImage: req.body.profileImagePath
        }

        this.userCtrl.createUser(userData);
        return res.status(ResponseStatus.InternalError).json({ description: 'Operation failed, please try again' });
    }

    async deleteUser_R(req: Request, res: Response): Promise<void> {
        const userData: LoginRequestBody = req.body;
        let statusCode: number;
        let payload: any;

        try {
            try {
                await this.userCtrl.deleteUserFlow(userData);
                
                statusCode = ResponseStatus.Ok;
                payload = {
                    description: 'User deleted successfully'
                }
            } catch(ex) {
                statusCode = ResponseStatus.Ok;
                payload = { 
                    description: 'User credentials is not accurte, Please change and try again'
                }
            }
        } catch(ex) {
            console.error(ex);
            statusCode = ResponseStatus.InternalError
            payload = {
                description: 'There was an error, User delete did not happened'
            }
        }

        res.status(statusCode).json(payload);
    }
}

export interface LoginRequestBody {
    username: string;
    password: string;
}