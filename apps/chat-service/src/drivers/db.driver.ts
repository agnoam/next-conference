import { injectable } from "inversify";
import * as admin from 'firebase-admin';
import { database } from 'firebase-admin'

@injectable()
export class DbDriver {
    db: database.Database;
    
    constructor() {
        // Added connection to database
        this.db = admin.database();
    }

    
}