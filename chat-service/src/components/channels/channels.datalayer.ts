import { injectable, inject } from 'inversify';
import winston from 'winston';

import { TYPES } from '../../configs/di.types.config';
import { LoggerDriver } from '../../drivers/logger.driver';
import { DbAnchor as DbAnchor, DbDriver } from '../../drivers/db.driver';
import { CollectionsNames } from '../../constants/default.constants';
import { Channel, ChannelData } from './channels.model';

@injectable()
export class ChannelsDataLayer {
    private logger: winston.Logger;

    constructor(
        @inject(TYPES.LoggerDriver) private loggerDriver: LoggerDriver, 
        @inject(TYPES.DbDriver) private dbDriver: DbDriver
    ) {
        this.logger = this.loggerDriver.Logger;
    }

    /**
     * Create new channel
     * 
     * @param name - The name of the channel to create
     * @throws `ExistsException` in case the channel already exists
     */
    async addChannel(channel: Channel): Promise<string> {
        this.logger.info(`Adding new channel: ${channel.name}`);
        return this.dbDriver.createNewDocument(CollectionsNames.Channels, channel.toJSON());
    }

    /**
     * Returns all the available channels
     */
    async getAvailableChannels(): Promise<DbAnchor<Channel>[]> {
        const availableChannelsData: DbAnchor<ChannelData>[] = await this.dbDriver.getAllDocuments(CollectionsNames.Channels);
        const allChannels: DbAnchor<Channel>[] = [];

        for (let channel of availableChannelsData) {
            allChannels.push({ ...channel, document: new Channel(channel.document) });
        }

        return allChannels;
    }

    async getChannel(id: string): Promise<Channel> {
        const dbValue: ChannelData = await this.dbDriver.readDocument(CollectionsNames.Channels, id);
        return new Channel(dbValue);
    }

    /**
     * Edit channel data
     * 
     * @param id - The id of the channel to be edited
     * @param changesObject - The object containing the changes
     * @param inplace - Whether to overwrite the existing channel with the changes data
     * 
     * @throws `DocumentNotExists` if the channel not exists
     */
    async editChannel(id: string, changesObject: Partial<Channel>, inplace: boolean = false): Promise<void> {

    }

    async isChannelExists(id: string): Promise<boolean> {
        return this.dbDriver.isExists(CollectionsNames.Channels, id);
    }

    /**
     * Delete a channel by it's ID
     * 
     * @param id - The ID of the channel to delete
     * @throws `DocumentNotExists` if the channel not exists
     */
    async deleteChannel(id: string): Promise<void> {
        return this.dbDriver.delete(CollectionsNames.Channels, id);
    }
}