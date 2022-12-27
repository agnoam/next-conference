import { inject, injectable } from "inversify";
import winston from "winston";
import { firestore } from 'firebase-admin'

import { initialize } from '../configs/firebase.config';
import { TYPES } from "../configs/di.types.config";
import { LoggerDriver } from './logger.driver';
import { CollectionsNames } from "../utils/consts";

@injectable()
export class DbDriver {
    private logger: winston.Logger;
    db: firestore.Firestore;
    
    constructor(@inject(TYPES.LoggerDriver) LoggerDriver: LoggerDriver) {
        this.logger = LoggerDriver.Logger;

        // Establishing firebase's real-database connection
        console.log('Initializing firebase');
        this.db = initialize();
    }

    async createNewDoc<T>(collection: CollectionsNames, data: T): Promise<void> {
        try {
            await this.db.collection(collection).add(data);
        } catch(ex) {
            this.logger.error('createNewDoc() ex:', ex);
        }
    }

    async readDocument<T = any>(collection: CollectionsNames, id: string): Promise<T> {
        try {
            const _collection: firestore.CollectionReference = this.db.collection(collection);
            const docRef: firestore.DocumentReference = _collection.doc(id);
            const doc: firestore.DocumentSnapshot = await docRef.get();
            return doc.data() as T;
        } catch(ex) {
            this.logger?.error('readDocument() ex:', ex);
            throw ex;
        }
    }

    async updateDocument<T = any>(collection: CollectionsNames, id: string, data: T): Promise<void> {
        try {
            const _collection: firestore.CollectionReference = this.db.collection(collection);
            const doc: firestore.DocumentReference = _collection.doc(id);
            doc.set(data, { merge: true});
        } catch(ex) {
            this.logger?.error('updateDocument ex:', ex);
            throw ex;
        }
    }

    async deleteDocument(collection: CollectionsNames, id: string): Promise<void> {
        try {
            const _collection = this.db.collection(collection);
            const docRef: firestore.DocumentReference = _collection.doc(id);
            await docRef.delete();
        } catch(ex) {
            this.logger?.error('deleteDocument ex:', ex);
            throw ex;
        }
    }
}