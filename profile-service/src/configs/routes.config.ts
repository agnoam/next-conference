import { container } from './di.config';
import { TYPES } from "./di.types.config";

import { DefaultPresentationLayer } from '../components/default.presentation';

const defaultPL: DefaultPresentationLayer = container.get(TYPES.DefaultPresentationLayer);

console.log("import routes.config");

// This file exposes all wanted BLOC (Business logic) functions implemntation to the `swagger.yaml`
export const addProfiler = defaultPL.defaultRoot_R.bind(defaultPL);
export const getProfiler = defaultPL.defaultRoot_R.bind(defaultPL);
export const updateProfiler = defaultPL.defaultRoot_R.bind(defaultPL);
export const removeProfiler = defaultPL.defaultRoot_R.bind(defaultPL);

export const healthRoute = defaultPL.healthCheck_R.bind(defaultPL);