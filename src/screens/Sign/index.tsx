import * as React from 'react';
import {
  PixelRatio,
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { observer } from 'mobx-react';
import map from 'lodash/map';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import i18n from '../../localization';
import COLORS from '../../theme/colors';
import Icon from '../../components/Icon';
import { ISing } from '../../types/common';
import useRootStore from '../../hooks/useRootStore';
import SingCard, { SIGN_CARD_WIDTH } from '../../components/SingCard';
import { IDateModelKeys } from '../../models/Daily';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginTop: PixelRatio.getPixelSizeForLayoutSize(12),
    marginLeft: PixelRatio.getPixelSizeForLayoutSize(8),
    marginRight: PixelRatio.getPixelSizeForLayoutSize(8),
  },
  headerLeft: {
    fontSize: PixelRatio.getPixelSizeForLayoutSize(24),
    fontFamily: 'Geometria-Light',
    color: COLORS.gainsboro,
    width: PixelRatio.getPixelSizeForLayoutSize(24),
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    aspectRatio: 1,
    width: PixelRatio.getPixelSizeForLayoutSize(24),
  },
  icon: {
    width: PixelRatio.getPixelSizeForLayoutSize(72),
    aspectRatio: 1,
  },
  title: {
    textAlign: 'center',
    marginTop: PixelRatio.getPixelSizeForLayoutSize(12),
    fontSize: PixelRatio.getPixelSizeForLayoutSize(18),
    fontFamily: 'Geometria-Light',
    color: COLORS.gainsboro,
  },
  period: {
    textAlign: 'center',
    marginTop: PixelRatio.getPixelSizeForLayoutSize(8),
    fontSize: PixelRatio.getPixelSizeForLayoutSize(11),
    fontFamily: 'Geometria-Light',
    letterSpacing: -0.5,
    color: COLORS.gray,
  },
  borderContainer: {
    position: 'relative',
    marginTop: PixelRatio.getPixelSizeForLayoutSize(10),
    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10),
    height: PixelRatio.getPixelSizeForLayoutSize(1),
    overflow: 'hidden',
  },
  border: {
    position: 'absolute',
    width: '100%',
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(2),
    borderWidth: PixelRatio.getPixelSizeForLayoutSize(1),
    borderColor: COLORS.gray,
    borderStyle: 'dotted',
  },
  cards: {
    flexDirection: 'row',
  },
});

type ISignRouteProp = RouteProp<
  {
    Sign: {
      sign: ISing;
    };
  },
  'Sign'
>;

const Sign: React.FC = observer(() => {
  const { params: { sign } = {} } = useRoute<ISignRouteProp>();
  const { daily } = useRootStore();
  const navigation = useNavigation();

  if (!sign) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity activeOpacity={0.6} onPress={navigation.goBack}>
            <Text style={styles.headerLeft}>←</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerCenter}>
          <Icon name={sign} fill={COLORS.silver} style={styles.icon} />
        </View>
        <View style={styles.headerRight} />
      </View>
      <Text style={styles.title}>{i18n.t(`signs.${sign}`)}</Text>
      <Text style={styles.period}>{i18n.t(`signsDatePeriods.${sign}`)}</Text>
      <View style={styles.borderContainer}>
        <View style={styles.border} />
      </View>

      <ScrollView
        horizontal
        accessible={false}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToAlignment="start"
        pagingEnabled
        scrollEventThrottle={16}
        snapToInterval={SIGN_CARD_WIDTH}
      >
        <View style={styles.cards}>
          {map(daily.horo.date, (value, key) => (
            <SingCard key={key} sign={sign} dateKey={key as IDateModelKeys} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

export default Sign;
