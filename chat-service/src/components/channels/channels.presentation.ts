import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import { ResponseStatus } from '../../constants/default.constants';
import { TYPES } from '../../configs/di.types.config';
import { ChannelsCtrl } from './channels.controller';
import { Channel } from './channels.model';

@injectable()
export class ChannelsPresentationLayer {
    constructor(@inject(TYPES.ChannelsCtrl) private channelsCtrl: ChannelsCtrl) {}

    async getAvailableChannels_R(req: Request, res: Response): Promise<void> {
        let resStatus: number = ResponseStatus.Ok;
        let body: any = { description: 'All avilable channels returned sucessfully' };

        try {
            body.channels = await this.channelsCtrl.getAvailableChannels();
        } catch(ex) {
            resStatus = ResponseStatus.InternalError;
            body = { description: 'Internal Error occourred' };
        }

        res.status(resStatus).json(body);
    }

    async createChannel_R(req: Request, res: Response): Promise<void> {
        let resStatus: number = ResponseStatus.Ok;
        let body: any = { description: 'All avilable channels returned sucessfully' };

        try {
            body.channelID = await this.channelsCtrl.createChannel(req.body as Channel);
        } catch(ex) {
            resStatus = ResponseStatus.InternalError;
            body = { description: 'Internal Error occourred' };
        }

        res.status(resStatus).json(body);
    }

    async getChannelByID_R(req: Request, res: Response): Promise<void> {
        let resStatus: number = ResponseStatus.Ok;
        let body: any = { description: 'Relevant channels found' };

        try {
            body.channel = await this.channelsCtrl.getChannelByID(req.params.channelID as string);
        } catch(ex) {
            resStatus = ResponseStatus.InternalError;
            body = { description: 'Internal Error occourred' };
        }

        res.status(resStatus).json(body);
    }

    async deleteChannelByID_R(req: Request, res: Response): Promise<void> {
        let resStatus: number = ResponseStatus.Ok;
        let body: any = { description: 'Channel deleted sucessfully' };

        try {
            await this.channelsCtrl.deleteChannelByID(req.params.channelID as string);
        } catch(ex) {
            resStatus = ResponseStatus.InternalError;
            body = { description: 'Internal Error occourred' };
        }

        res.status(resStatus).json(body);
    }
}