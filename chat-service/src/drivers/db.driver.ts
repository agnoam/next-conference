import { inject, injectable } from "inversify";
import winston from "winston";
import { database } from 'firebase-admin';

import { initialize } from '../configs/firebase.config';
import { TYPES } from "../configs/di.types.config";
import { LoggerDriver } from './logger.driver';
import { CollectionsNames } from "../constants/default.constants";

@injectable()
export class DbDriver {
    private logger: winston.Logger;
    private db: database.Database;
    
    constructor(@inject(TYPES.LoggerDriver) LoggerDriver: LoggerDriver) {
        this.logger = LoggerDriver.Logger;

        // Establishing firebase's real-database connection
        console.log('Initializing firebase');
        this.db = initialize();
    }

    private async findByID(collection: CollectionsNames, id: string): Promise<database.DataSnapshot> {
        const collectionRef: database.Reference = this.db.ref(`${collection}/${id}`);
        return collectionRef.get();
    }

    /**
     * Add DbAnchor to the snapshot value
     * 
     * @param snapshot - The snapshot value from the database
     * @returns Append the snapshot alongside the id
     */
    private generateValue<T>(snapshot: database.DataSnapshot): DbAnchor<T> {
        return {
            id: snapshot.key,
            document: snapshot.val()
        }
    }

    async isExists(collection: CollectionsNames, id: string): Promise<boolean> {
        const document = await this.findByID(collection, id);
        return document.exists();
    }

    async createNewDocument<T>(collection: CollectionsNames, data: T): Promise<string> {
        try {
            const collectionRef: database.Reference = this.db.ref(`${collection}`);
            const ref: database.Reference = await collectionRef.push(data);
            return ref.key;
        } catch(ex) {
            this.logger.error('createNewDoc() ex:', ex);
        }
    }

    async readDocument<T>(collection: CollectionsNames, id: string): Promise<T> {
        const snapshot: database.DataSnapshot = await this.findByID(collection, id);        
        return snapshot.val();
    }

    async getAllDocuments<T>(collection: CollectionsNames): Promise<DbAnchor<T>[]> {
        const collectionRef = this.db.ref(`/${collection}`);
        const snapshot: database.DataSnapshot = await collectionRef.orderByKey().get();
        if (!snapshot.exists()) 
            return [];

        const allDocsIds = [];
        snapshot.forEach((snapshot: database.DataSnapshot) => {
            allDocsIds.push(this.generateValue(snapshot));
        });

        return allDocsIds;
    }

    async delete(collection: CollectionsNames, id: string): Promise<void> {
        const docRef: database.Reference = (await this.findByID(collection, id)).ref;
        docRef.remove();
    }
}

export interface DbAnchor<T> {
    id: string;
    document: T;
}

interface Message {
    channelID: string;
    nickname: string;
    profileLogo: string; // URL | default
    content: string;
}