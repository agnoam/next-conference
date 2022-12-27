import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import winston from 'winston';

import { TYPES } from '../configs/di.types.config';
import { LoggerDriver } from '../drivers/logger.driver';
import { DefaultCtrl } from './default.controller';

@injectable()
export class DefaultPresentationLayer {
    logger: winston.Logger;
    
    constructor(
        @inject(TYPES.LoggerDriver) loggerDriver: LoggerDriver, 
        @inject(TYPES.DefaultCtrl) private defaultCtrl: DefaultCtrl
    ) {
        this.logger = loggerDriver.Logger;
    }

    async defaultRoot_R(req: Request, res: Response, next: NextFunction): Promise<void> {
        res.send('node-ts server is running ;) (by swagger router)');
    }

    async healthCheck_R(req: Request, res: Response, next: NextFunction): Promise<void> {
        res.send('node-ts server is running ;) (by swagger router)');
    }
}