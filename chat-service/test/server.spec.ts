import { Application } from 'express';
import request, { Response } from 'supertest';

import { container } from "../src/configs/di.config";
import { TYPES } from '../src/configs/di.types.config';
import { DbDriver } from '../src/drivers/db.driver';
import { LoggerDriver } from '../src/drivers/logger.driver';
import { ProbeServer } from '../src/drivers/probe.driver';
import MorganMiddleware from '../src/middlewares/morgan.middleware';
import { ServerBoot } from '../src/server';

describe('Routes tests', () => {
    let app: Application;
    let serverInstance: ServerBoot;

    beforeAll(async () => {
        process.env.NODE_ENV = 'test';

        const _loggerConfig = container.get<LoggerDriver>(TYPES.LoggerDriver);
        const _dbDriver = container.get<DbDriver>(TYPES.DbDriver);
        // const _etcdConfig = container.get<EtcdDriver>(TYPES.ETCDDriver);
        const _probeServer = container.get<ProbeServer>(TYPES.ProbeServerDriver);
        const _morganMiddleware = container.get<MorganMiddleware>(TYPES.MorganMiddleware);

        serverInstance = new ServerBoot(_loggerConfig, /* _etcdConfig, */ _dbDriver, _probeServer, _morganMiddleware);
        app = await serverInstance.listen();
    });

    afterAll(() => {
        serverInstance.server.close();
        console.log('Closing server');
    });

    test('Always true test', () => {
        const firstDate: number = Date.now();
        setTimeout(() => {
            const secondDate: number = Date.now();
            expect(secondDate).toBeGreaterThan(firstDate);
        }, 1);
    });

    test('Request mocking test', async () => {
        const res: Response = await request(app).get('/users/test');
        console.log(res.body);
        expect(res.body).toHaveProperty('description');
        expect(res.body).toHaveProperty('date');
    });
});
