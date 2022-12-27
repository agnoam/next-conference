import { injectable, inject } from 'inversify';

import { TYPES } from '../configs/di.types.config';
import { DefaultDataLayer } from './default.datalayer';

@injectable()
export class DefaultCtrl {
    constructor(@inject(TYPES.DefaultDataLayer) private dataLayer: DefaultDataLayer) {}

    async createNewProfiler(): Promise<void> {
        this.dataLayer.addNewProfiler('', 123);
    }
}