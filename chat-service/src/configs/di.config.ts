import { Container } from "inversify";

import { TYPES } from "./di.types.config";
import { LoggerDriver } from '../drivers/logger.driver';
import MorganMiddleware from '../middlewares/morgan.middleware';
import { ProbeServer } from "../drivers/probe.driver";
import { DefaultPresentationLayer } from '../components/default.presentation';
import { UserPresntationLayer } from "../components/user/user.presentation";
import { DbDriver } from "../drivers/db.driver";

import { ChannelsPresentationLayer } from "../components/channels/channels.presentation";
import { ChannelsCtrl } from "../components/channels/channels.controller";
import { ChannelsDataLayer } from "../components/channels/channels.datalayer";

export const container: Container = new Container();

container.bind<LoggerDriver>(TYPES.LoggerDriver).to(LoggerDriver).inSingletonScope();
container.bind<ProbeServer>(TYPES.ProbeServerDriver).to(ProbeServer).inSingletonScope();
container.bind<DbDriver>(TYPES.DbDriver).to(DbDriver).inSingletonScope();

container.bind<MorganMiddleware>(TYPES.MorganMiddleware).to(MorganMiddleware).inSingletonScope();

container.bind<DefaultPresentationLayer>(TYPES.DefaultPresentationLayer).to(DefaultPresentationLayer).inSingletonScope();
container.bind<UserPresntationLayer>(TYPES.UserPresentationLayer).to(UserPresntationLayer).inSingletonScope();
container.bind<ChannelsPresentationLayer>(TYPES.ChannelsPresentationLayer).to(ChannelsPresentationLayer).inSingletonScope();
container.bind<ChannelsCtrl>(TYPES.ChannelsCtrl).to(ChannelsCtrl).inSingletonScope();
container.bind<ChannelsDataLayer>(TYPES.ChannelsDataLayer).to(ChannelsDataLayer).inSingletonScope();