import { injectable, inject } from 'inversify';

import { CollectionsNames } from '../utils/consts';
import { TYPES } from '../configs/di.types.config';
import { DbDriver } from '../drivers/db.driver';

@injectable()
export class DefaultDataLayer {
    constructor(@inject(TYPES.DbDriver) private db: DbDriver) {}

    addNewProfiler(chatID: string, interval: number): void {
        this.db.createNewDoc(CollectionsNames.Profilers, { t: 1 });
    }
}

interface Profiler {
    channelID: string;
    interval: number;
}