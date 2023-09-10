import { container } from './di.config';
import { TYPES } from "./di.types.config";

import { DefaultPresentationLayer } from '../components/default.presentation';
import { ResponseStatus } from '../constants/default.constants';
import { ChannelsPresentationLayer } from '../components/channels/channels.presentation';

const defaultPL: DefaultPresentationLayer = container.get(TYPES.DefaultPresentationLayer);
const channelsPL: ChannelsPresentationLayer = container.get(TYPES.ChannelsPresentationLayer);

console.log("import routes.config");

// This file exposes all wanted BLOC (Business logic) functions implemntation to the `swagger.yaml`
export const health_R = defaultPL.health_R.bind(defaultPL);
export const createChannel_R = channelsPL.createChannel_R.bind(channelsPL);
export const getAvailableChannels_R = channelsPL.getAvailableChannels_R.bind(channelsPL);
export const getChannelByID_R = channelsPL.getChannelByID_R.bind(channelsPL);
export const deleteChannelByID_R = channelsPL.deleteChannelByID_R.bind(channelsPL);

export const postNewMessage_R = (req, res) => res.status(ResponseStatus.NotImplemented).json({ description: '!NotImplemented!' });