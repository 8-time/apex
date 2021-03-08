import { createContext } from 'react';
import Root from '../models/Root';

export const valueOfContext = createContext(Root.create());
export const ContextOfRootStore = createContext(valueOfContext);
