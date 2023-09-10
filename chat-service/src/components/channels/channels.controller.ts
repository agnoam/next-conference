import { injectable, inject } from 'inversify';
import winston from 'winston';

import { TYPES } from '../../configs/di.types.config';
import { LoggerDriver } from '../../drivers/logger.driver';
import { ChannelsDataLayer } from './channels.datalayer';
import { Channel, ChannelData } from './channels.model';
import { DbAnchor } from '../../drivers/db.driver';
import { DocumentNotExistsError } from '../../constants/errors.constants';

console.log('import channels.controller');

@injectable()
export class ChannelsCtrl {
    private logger: winston.Logger;

    constructor(
        @inject(TYPES.LoggerDriver) private loggerDriver: LoggerDriver,
        @inject(TYPES.ChannelsDataLayer) private channelsDataLayer: ChannelsDataLayer
    ) {
        this.logger = this.loggerDriver.Logger;
    }

    async createChannel(channelData: ChannelData): Promise<string> {
        const channel: Channel = new Channel(channelData);
        return this.channelsDataLayer.addChannel(channel);
    }

    async getAvailableChannels(): Promise<DbAnchor<Channel>[]> {
        return this.channelsDataLayer.getAvailableChannels();
    }

    async getChannelByID(id: string): Promise<Channel> {
        return this.channelsDataLayer.getChannel(id);
    }

    async deleteChannelByID(channelID: string): Promise<void> {
        if (this.channelsDataLayer.isChannelExists(channelID)) {
            return this.channelsDataLayer.deleteChannel(channelID);
        }

        throw new DocumentNotExistsError();
    }
}