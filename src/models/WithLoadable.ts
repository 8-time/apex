import { types, Instance } from 'mobx-state-tree';

const WithLoadableBase = types.model('WithLoadableBase', {
  errorMsg: types.maybeNull(types.string),
  counterForLoading: 0,
});

export type IWithLoadableBase = Instance<typeof WithLoadableBase>;

export const WithLoadable = WithLoadableBase.views(self => ({
  get loading() {
    return self.counterForLoading > 0;
  },
  getSnapshotWithLoadable(props = {}) {
    return {
      ...props,
      ...{ counterForLoading: self.counterForLoading },
    };
  },
})).actions(self => ({
  catchError(e: Error) {
    self.errorMsg = e.message;
  },
  clearError() {
    self.errorMsg = null;
  },
  loadingStart() {
    self.counterForLoading += 1;
  },
  loadingStop() {
    self.counterForLoading -= 1;
  },
  setCounterForLoading(counterForLoading: number) {
    self.counterForLoading = counterForLoading;
  },
}));
