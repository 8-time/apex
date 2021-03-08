import * as React from 'react';
import {
  ContextOfRootStore,
  valueOfContext,
} from './src/contexts/RootStoreContext';
import Router from './src/components/Router';

const App: React.FC = () => (
  <ContextOfRootStore.Provider value={valueOfContext}>
    <Router />
  </ContextOfRootStore.Provider>
);

export default App;
