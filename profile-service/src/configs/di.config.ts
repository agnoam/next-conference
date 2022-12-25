import { Container } from "inversify";

import { TYPES } from "./di.types.config";
import { UserCtrl } from '../components/user/user.controller';
import { UserDataLayer } from '../components/user/user.datalayer';
// import { /* IDbDriver, */ DbDriver } from "./db.config";
// import { IEtcdDriver, EtcdDriver } from "./etcd.config";
// import { IDefaultCtrl, DefaultCtrl } from '../components/default/default.controller';

import { LoggerDriver } from '../drivers/logger.driver';
import MorganMiddleware from '../middlewares/morgan.middleware';
import { ProbeServer } from "../drivers/probe.driver";
import { DefaultPresentationLayer } from '../components/default.presentation';
import { UserPresntationLayer } from "../components/user/user.presentation";
import { DbDriver } from "../drivers/db.driver";

export const container: Container = new Container();

container.bind<LoggerDriver>(TYPES.LoggerDriver).to(LoggerDriver).inSingletonScope();
container.bind<ProbeServer>(TYPES.ProbeServerDriver).to(ProbeServer).inSingletonScope();
container.bind<DbDriver>(TYPES.DbDriver).to(DbDriver).inSingletonScope();

container.bind<MorganMiddleware>(TYPES.MorganMiddleware).to(MorganMiddleware).inSingletonScope();

container.bind<DefaultPresentationLayer>(TYPES.DefaultPresentationLayer).to(DefaultPresentationLayer).inSingletonScope();
container.bind<UserPresntationLayer>(TYPES.UserPresentationLayer).to(UserPresntationLayer).inSingletonScope();
container.bind<UserCtrl>(TYPES.UserCtrl).to(UserCtrl).inSingletonScope();
container.bind<UserDataLayer>(TYPES.UserDataLayer).to(UserDataLayer).inSingletonScope();
// container.bind<IDefaultDataLayer>(TYPES.DefaultDataLayer).to(DefaultDataLayer);
