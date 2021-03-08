import { useContext } from 'react';
import { ContextOfRootStore } from '../contexts/RootStoreContext';
import { IRootModel } from '../models/Root';

export default (): IRootModel => useContext(ContextOfRootStore);
