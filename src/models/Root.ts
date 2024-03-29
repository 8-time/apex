import { types, Instance, flow } from 'mobx-state-tree';
import * as Font from 'expo-font';
import { WithLoadable } from './WithLoadable';
import DailyModel from './Daily';

const RootModel = types
  .compose(
    WithLoadable,
    types.model('RootModel', {
      counterForLoading: 1,
      daily: types.optional(DailyModel, {}),
    }),
  )
  .actions(() => ({
    loadAssets: flow(function* loadAssets() {
      yield Promise.all([
        Font.loadAsync({
          'Geometria-Light': require('../../assets/fonts/geometria-light.ttf'),
        }),
      ]);
    }),
  }))
  .actions(self => ({
    initialize: flow(function* initialize() {
      try {
        yield self.loadAssets();
      } catch (error) {
        self.catchError(error);
      } finally {
        self.loadingStop();
      }
    }),
  }));

export type IRootModel = Instance<typeof RootModel>;

export default RootModel;
