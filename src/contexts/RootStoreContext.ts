import { createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist } from 'mst-persist';
import Root from '../models/Root';

export const valueOfContext = Root.create();
export const ContextOfRootStore = createContext(valueOfContext);

valueOfContext.initialize();

(async function rehydrate() {
  await persist('APEX_DAILY_STORE', valueOfContext.daily, {
    storage: AsyncStorage,
    jsonify: true,
    whitelist: ['daily'],
  });
  valueOfContext.daily.loadAfterRehydrate();
})();
