import { container } from './di.config';
import { TYPES } from "./di.types.config";

import { DefaultPresentationLayer } from '../components/default.presentation';

const defaultPL: DefaultPresentationLayer = container.get(TYPES.DefaultPresentationLayer);

console.log("import routes.config");

// This file exposes all wanted BLOC (Business logic) functions implemntation to the `swagger.yaml`
export const addProfiler = defaultPL.addProfiler_R.bind(defaultPL);
export const getProfiler = defaultPL.getProfiler_R.bind(defaultPL);
export const updateProfiler = defaultPL.updateProfiler_R.bind(defaultPL);
export const removeProfiler = defaultPL.deleteProfiler_R.bind(defaultPL);

export const healthRoute = defaultPL.healthCheck_R.bind(defaultPL);