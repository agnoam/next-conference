import { inject, injectable } from "inversify";
import winston from "winston";
import { database } from 'firebase-admin'

import { initialize } from '../configs/firebase.config';
import { TYPES } from "../configs/di.types.config";
import { LoggerDriver } from './logger.driver';
import { CollectionsNames } from "../utils/consts";

@injectable()
export class DbDriver {
    private logger: winston.Logger;
    db: database.Database;
    
    constructor(@inject(TYPES.LoggerDriver) LoggerDriver: LoggerDriver) {
        this.logger = LoggerDriver.Logger;

        // Establishing firebase's real-database connection
        console.log('Initializing firebase');
        this.db = initialize();
    }

    async createNewDoc<T>(collection: CollectionsNames, data: T): Promise<void> {
        try {
            const collectionRef: database.Reference = this.db.ref(`/${collection}`);
            collectionRef.push();
        } catch(ex) {
            this.logger.error('createNewDoc() ex:', ex);
        }
    }

    // async readDocument<T>(collection: CollectionsNames, id: string): Promise<T> {
        // const doc = await this.db..doc(id);
    // }
}

interface Channel {
    name: string;
    description: string;
    channelLogo: string; // URL | default
}

interface Message {
    channelID: string;
    nickname: string;
    profileLogo: string; // URL | default
    content: string;
}