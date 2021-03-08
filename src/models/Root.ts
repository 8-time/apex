import { types } from 'mobx-state-tree';
import { WithLoadable } from './WithLoadable';

const RootModel = types.compose(types.model('RootModel', {}), WithLoadable);

export default RootModel;
