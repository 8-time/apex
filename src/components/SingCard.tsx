import * as React from 'react';
import { format, parse } from 'date-fns';
import {
  PixelRatio,
  Text,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import { observer } from 'mobx-react';
import useRootStore from '../hooks/useRootStore';
import { ISing } from '../types/common';
import { IDateModelKeys } from '../models/Daily';
import { getDateFnsCurrentLocale } from '../utils';
import COLORS from '../theme/colors';

export const { width: SIGN_CARD_WIDTH } = Dimensions.get('screen');
const locale = getDateFnsCurrentLocale();

const styles = StyleSheet.create({
  card: {
    width: SIGN_CARD_WIDTH,
  },
  date: {
    textTransform: 'capitalize',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 24,
    fontFamily: 'Geometria-Light',
    color: COLORS.gainsboro,
    letterSpacing: -0.9,
  },
  innerCardWrapper: {
    flex: 1,
    margin: 16,
    backgroundColor: COLORS.gainsboro,
    borderRadius: 4,
  },
  innerCardScroll: {
    flex: 1,
    margin: 4,
    borderWidth: 2,
    borderColor: COLORS.silver,
    borderStyle: 'dotted',
  },
  cardText: {
    margin: 16 / PixelRatio.get(),
    color: COLORS.darkslategray,
    fontSize: 22,
    lineHeight: 26,
    fontFamily: 'Geometria-Light',
  },
});

interface ISingCardProps {
  sign: ISing;
  dateKey: IDateModelKeys;
}

const SingCard: React.FC<ISingCardProps> = observer(({ sign, dateKey }) => {
  const { daily } = useRootStore();

  return (
    <View style={styles.card}>
      <Text style={styles.date}>
        {daily.dailyByCurrentLanguage?.horo.date[dateKey] &&
          format(
            parse(
              daily.dailyByCurrentLanguage.horo.date[dateKey] as string,
              'dd.MM.yyyy',
              new Date(),
            ),
            'EEEE, LLLL dd, yyyy',
            { locale },
          )}
      </Text>
      <View style={styles.innerCardWrapper}>
        <ScrollView style={styles.innerCardScroll}>
          <Text style={styles.cardText}>
            {daily.dailyByCurrentLanguage?.horo[sign][dateKey].Text}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
});

export default SingCard;
