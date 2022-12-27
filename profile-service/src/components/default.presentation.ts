import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import winston from 'winston';

import { TYPES } from '../configs/di.types.config';
import { LoggerDriver } from '../drivers/logger.driver';
import { DefaultCtrl } from './default.controller';
import { ResponseStatus } from '../utils/consts';
import { Profiler } from './default.datalayer';

@injectable()
export class DefaultPresentationLayer {
    logger: winston.Logger;
    
    constructor(
        @inject(TYPES.LoggerDriver) loggerDriver: LoggerDriver, 
        @inject(TYPES.DefaultCtrl) private defaultCtrl: DefaultCtrl
    ) {
        this.logger = loggerDriver.Logger;
    }

    async addProfiler_R(req: Request, res: Response): Promise<void> {
        try {
            // Validate request body
            if (!req.body.channelID || !req.body.interval) {
                res.status(ResponseStatus.BadRequest).json({ description: 'Request body is not valid' });
                return;
            }
    
            await this.defaultCtrl.createNewProfiler(req.body);
        } catch(ex) {
            this.logger?.error('addProfiler_R() ex:', ex);
            res.status(ResponseStatus.InternalError).json({
                description: 'Internal Server Error'
            });
        }
    }

    async getProfiler_R(req: Request, res: Response): Promise<void> {
        try {
            const profiler: Profiler = await this.defaultCtrl.getProfiler(req.params.profilerID);
            res.status(ResponseStatus.Ok).json({ 
                description: 'Profiler fetched successfully', 
                profiler 
            });
        } catch(ex) {
            this.logger?.error('getProfiler_R() ex:', ex);
            res.status(ResponseStatus.InternalError).json({
                description: 'Internal Server Error'
            });
        }
    }

    async updateProfiler_R(req: Request, res: Response): Promise<void> {
        try {
            if (!req.params.profilerID || !req.body) {
                res.status(ResponseStatus.BadRequest).json({ description: 'Request parameters or request body is not valid' });
                return;
            }

            this.defaultCtrl.updateProfiler(req.params.profilerID, req.body);
            res.status(ResponseStatus.Ok).json({
                description: 'Profiler updated successfully'
            });
        } catch(ex) {
            this.logger?.error('updateProfiler_R() ex:', ex);
            res.status(ResponseStatus.InternalError).json({
                description: 'Internal Server Error'
            });
        }
    }

    async deleteProfiler_R(req: Request, res: Response): Promise<void> {
        try {
            if (!req.params.profilerID) {
                res.status(ResponseStatus.BadRequest).json({ description: 'Request does not have a valid profiler id in it' });
                return;
            }

            await this.defaultCtrl.deleteProfiler(req.params.profilerID);
            res.status(ResponseStatus.Ok).json({
                description: 'Profiler deleted successfully'
            });
        } catch(ex) {
            this.logger?.error('deleteProfiler_R() ex:', ex);
            res.status(ResponseStatus.InternalError).json({
                description: 'Internal Server Error'
            });
        }
    }

    async defaultRoot_R(req: Request, res: Response, next: NextFunction): Promise<void> {
        res.send('node-ts server is running ;) (by swagger router)');
    }

    async healthCheck_R(req: Request, res: Response, next: NextFunction): Promise<void> {
        res.send('node-ts server is running ;) (by swagger router)');
    }
}