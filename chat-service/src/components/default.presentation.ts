import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '../configs/di.types.config';
import { LoggerDriver } from '../drivers/logger.driver';

@injectable()
export class DefaultPresentationLayer {
    constructor(@inject(TYPES.LoggerDriver) loggerDriver: LoggerDriver) {}

    /**
     * Returns string to show the server alive
     * 
     * @param req Express's request object
     * @param res Express's response object
     */
    health_R(req: Request, res: Response): void {
        res.send('node-ts server is running ;) (by swagger router)');
    }
}