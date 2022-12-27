import { injectable, inject } from 'inversify';

import { TYPES } from '../configs/di.types.config';
import { DefaultDataLayer, Profiler } from './default.datalayer';

@injectable()
export class DefaultCtrl {
    constructor(@inject(TYPES.DefaultDataLayer) private dataLayer: DefaultDataLayer) {}

    async createNewProfiler(profiler: Profiler): Promise<void> {
        // TODO: Check whther the channel id is valid
        this.dataLayer.addNewProfiler('', 123);
    }

    async getProfiler(profilerID: string): Promise<Profiler> {
        return await this.dataLayer.readProfiler(profilerID);
    }

    async updateProfiler(profilerID: string, newProfiler: Profiler): Promise<void> {
        return await this.dataLayer.updateProfiler(profilerID, newProfiler);
    }

    async deleteProfiler(profilerID: string): Promise<void> {
        return await this.dataLayer.deleteProfiler(profilerID);
    }
}