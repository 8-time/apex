import { createContext } from 'react';
import Root from '../models/Root';

export const valueOfContext = Root.create();
valueOfContext.initialize();
export const ContextOfRootStore = createContext(valueOfContext);
