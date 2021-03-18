import { types, Instance, flow, applySnapshot } from 'mobx-state-tree';
import toArray from 'lodash/toArray';
import keys from 'lodash/keys';
import isEmpty from 'lodash/isEmpty';
import { parse, differenceInDays } from 'date-fns';
import { WithLoadable } from './WithLoadable';
import { getLanguageByCurrentLocale } from '../utils';

const DIFFERENCE_IN_DAYS_TO_LOAD = 2;

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

const HoroModel = types.model('Horo', {
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
});

export type IDateModel = Instance<typeof DateModel>;
export type IDateModelKeys = keyof Pick<
  IDateModel,
  'today' | 'tomorrow' | 'tomorrow02' | 'yesterday'
>;
const language = getLanguageByCurrentLocale();

const DailyModel = types
  .compose(
    WithLoadable,
    types.model('Daily', {
      daily: types.optional(
        types.model({
          en: types.optional(
            types.model({ horo: types.optional(HoroModel, {}) }),
            {},
          ),
          ru: types.optional(
            types.model({ horo: types.optional(HoroModel, {}) }),
            {},
          ),
        }),
        {},
      ),
    }),
  )
  .views(self => ({
    get dailyByCurrentLanguage() {
      return self.daily[language];
    },
  }))
  .views(self => ({
    get datesValues() {
      return toArray(self.dailyByCurrentLanguage.horo.date);
    },
    get datesKeys() {
      return keys(self.dailyByCurrentLanguage.horo.date);
    },
  }))
  .views(self => ({
    get isEmpty() {
      return isEmpty(self.datesValues) || !self.datesValues[0];
    },
    get isOutdated() {
      return (
        differenceInDays(
          new Date(),
          parse(self.datesValues[0] as string, 'dd.MM.yyyy', new Date()),
        ) >= DIFFERENCE_IN_DAYS_TO_LOAD
      );
    },
  }))
  .actions(self => ({
    load: flow(function* load() {
      try {
        self.loadingStart();
        self.clearError();
        const response = yield fetch(
          'https://script.google.com/macros/s/AKfycbx8zU6YZV_dNx5ys7G-x71IJqmVgy2VLAWfCVKftCS_yl4GwvqwbIWfBYeq3rNKsB1b/exec',
        );
        const responseJson = yield response.json();

        if (!responseJson) {
          throw new Error('Error while SignModel/load');
        }

        applySnapshot(self.daily, responseJson);
      } catch (error) {
        self.catchError(error);
      } finally {
        self.loadingStop();
      }
    }),
  }))
  .actions(self => ({
    loadAfterRehydrate() {
      if (self.isEmpty || self.isOutdated) {
        self.load();
      }
    },
  }));

export type IDailyModel = Instance<typeof DailyModel>;

export default DailyModel;
