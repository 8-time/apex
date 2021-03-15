import { types, Instance, flow, applySnapshot } from 'mobx-state-tree';
import toArray from 'lodash/toArray';
import keys from 'lodash/keys';
import { WithLoadable } from './WithLoadable';

const DayModel = types.model('Day', {
  Text: types.maybe(types.string),
});

const SignModel = types.model('Sign', {
  yesterday: types.optional(DayModel, {}),
  today: types.optional(DayModel, {}),
  tomorrow: types.optional(DayModel, {}),
  tomorrow02: types.optional(DayModel, {}),
});

const DateModel = types.model('Date', {
  yesterday: types.maybe(types.string),
  today: types.maybe(types.string),
  tomorrow: types.maybe(types.string),
  tomorrow02: types.maybe(types.string),
});

export type IDateModel = Instance<typeof DateModel>;
export type IDateModelKeys = keyof Pick<
  IDateModel,
  'today' | 'tomorrow' | 'tomorrow02' | 'yesterday'
>;

const DailyModel = types
  .compose(
    WithLoadable,
    types.model('Daily', {
      horo: types.optional(
        types.model({
          date: types.optional(DateModel, {}),
          aries: types.optional(SignModel, {}),
          taurus: types.optional(SignModel, {}),
          gemini: types.optional(SignModel, {}),
          cancer: types.optional(SignModel, {}),
          leo: types.optional(SignModel, {}),
          virgo: types.optional(SignModel, {}),
          libra: types.optional(SignModel, {}),
          scorpio: types.optional(SignModel, {}),
          sagittarius: types.optional(SignModel, {}),
          capricorn: types.optional(SignModel, {}),
          aquarius: types.optional(SignModel, {}),
          pisces: types.optional(SignModel, {}),
        }),
        {},
      ),
    }),
  )
  .views(self => ({
    get datesValues() {
      return toArray(self.horo.date);
    },
    get datesKeys() {
      return keys(self.horo.date);
    },
  }))
  .actions(self => ({
    load: flow(function* load() {
      try {
        self.loadingStart();
        const response = yield fetch(
          'https://script.google.com/macros/s/AKfycbwrx-qW5-MDodK0x02yuTbjOehP3_vSSj7W-WfDyarIUiOI7P7JtUx-YaGMtCMelmQg/exec',
        );
        const responseJson = yield response.json();

        if (!responseJson.horo) {
          throw new Error('Error while SignModel/load');
        }

        applySnapshot(self.horo, responseJson.horo);
      } catch (error) {
        self.catchError(error);
      } finally {
        self.loadingStop();
      }
    }),
  }));

export type IDailyModel = Instance<typeof DailyModel>;

export default DailyModel;
