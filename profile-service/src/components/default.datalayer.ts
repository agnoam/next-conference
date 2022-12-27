import { injectable, inject } from 'inversify';

import { CollectionsNames } from '../utils/consts';
import { TYPES } from '../configs/di.types.config';
import { DbDriver } from '../drivers/db.driver';

@injectable()
export class DefaultDataLayer {
    constructor(@inject(TYPES.DbDriver) private db: DbDriver) {}

    async addNewProfiler(chatID: string, interval: number): Promise<void> {
        await this.db.createNewDoc(CollectionsNames.Profilers, { t: 1 });
    }

    async readProfiler(profilerID: string): Promise<Profiler> {
        return await this.db.readDocument<Profiler>(CollectionsNames.Profilers, profilerID);
    }

    async updateProfiler(profilerID: string, newProfiler: Profiler): Promise<void> {
        await this.db.updateDocument(CollectionsNames.Profilers, profilerID, newProfiler);
    }

    async deleteProfiler(profilerID: string): Promise<void> {
        await this.db.deleteDocument(CollectionsNames.Profilers, profilerID);
    }
}

export interface Profiler {
    channelID: string;
    interval: number;
}