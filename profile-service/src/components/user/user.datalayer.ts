import { inject, injectable } from "inversify";
import winston from 'winston';
import md5 from 'md5';

import { TYPES } from "../../configs/di.types.config";
import { DbDriver } from "../../drivers/db.driver";
import { InputUserData } from "./user.model";
import { LoggerDriver } from "../../drivers/logger.driver";

/* 
    Description: 
    The DataLayer module contains all the calls to DB. At the time the controller module has the logic
*/
@injectable()
export class UserDataLayer {
    logger: winston.Logger;
    constructor(
        @inject(TYPES.LoggerDriver) LoggerDriver: LoggerDriver, 
        @inject(TYPES.DbDriver) db: DbDriver
    ) {
        this.logger = LoggerDriver.Logger;
    }
    
    async createNewUser(userData: InputUserData): Promise<any> {
        // Hashing password before saving it to the DB
        userData.password = md5(userData.password);
        this.logger.info('new user data', userData);
        // return await UserModel.create(userData);
        return {};
    }

    deleteUser(username: string): void {
        this.logger.info('deleteing', username);
    }

    async isLegit(username: string, password: string): Promise<any> {
        try {
            // const userQuery: DocumentQuery<IUser, IUser> = UserModel.findOne({ username: username });
            // const userData: IUser = await userQuery.exec();

            // Encrypting the password with md5
            // if(userData.password === md5(password)) {
            //     span.end();
            //     return userData;
            // }
            return null;
        } catch(ex) {
            console.error(`ex with querying db: `, ex);
            throw ex;
        }
    }
}