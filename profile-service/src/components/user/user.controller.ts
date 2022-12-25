import { inject, injectable } from "inversify";
import { Logger } from 'winston';

import { TYPES } from "../../configs/di.types.config";
import { LoggerDriver } from '../../drivers/logger.driver';
import { InputUserData } from './user.model';
import { UserDataLayer } from "./user.datalayer";
import { LoginRequestBody } from "./user.presentation";

console.log("import app.controller");

@injectable()
export class UserCtrl {
    private Logger: Logger;

    constructor(
        @inject(TYPES.LoggerDriver) LoggerDriver: LoggerDriver,
        @inject(TYPES.UserDataLayer) private userDataLayer: UserDataLayer
    ) {
        this.Logger = LoggerDriver.Logger;
    }
        
    async verifyUser(reqBody: LoginRequestBody): Promise<any> {
        if (reqBody.username && reqBody.password) {
            // Encrypting the password with md5
            const userData = await this.userDataLayer.isLegit(reqBody.username, reqBody.password);
            
            if (!userData) return null;
            return {
                name: userData.name,
                profileImage: userData.profileImage,
                date: userData.date
            }
        }
    }

    someFunc(): void {
        console.log('someFunc');

        for (let i = 0; i < 1000; i++) {
            // calculating something
            i ** 2;
        }
    }

    async createUser(userData: InputUserData): Promise<void> {
        if(userData.username && userData.password && userData.email && userData.name) {
            // Deletes the profileImage if does not exists
            !userData.profileImage ? delete userData.profileImage : undefined;

            try {
                await this.userDataLayer.createNewUser(userData);
            } catch(ex) {
                console.error('MongoDB creation ex: ', ex);
                throw ex;
            }
        }
    }

    async deleteUserFlow(userData: LoginRequestBody): Promise<void> {
        if (await this.userDataLayer.isLegit(userData.username, userData.password))
            this.userDataLayer.deleteUser(userData.username);
    }
}
