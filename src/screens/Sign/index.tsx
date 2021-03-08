import * as React from 'react';
import {
  PixelRatio,
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import times from 'lodash/times';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import i18n from '../../localization';
import Colors from '../../theme/colors';
import Icon from '../../components/Icon';
import { ISing } from '../../types/common';

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
    color: Colors.gainsboro,
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
    color: Colors.gainsboro,
  },
  period: {
    textAlign: 'center',
    marginTop: PixelRatio.getPixelSizeForLayoutSize(8),
    fontSize: PixelRatio.getPixelSizeForLayoutSize(12),
    fontFamily: 'Geometria-Light',
    letterSpacing: 1.1,
    color: Colors.gray,
  },
  border: {
    textAlign: 'center',
    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(8),
    fontSize: PixelRatio.getPixelSizeForLayoutSize(14),
    fontFamily: 'Geometria-Light',
    letterSpacing: -0.5,
    color: Colors.gray,
  },
  calendar: {
    marginTop: PixelRatio.getPixelSizeForLayoutSize(8),
    alignItems: 'center',
  },
  iconCalendar: {
    width: PixelRatio.getPixelSizeForLayoutSize(16),
    aspectRatio: 1,
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

const border = times(100, () => '.').join('');

const Sign: React.FC = () => {
  const { params: { sign } = {} } = useRoute<ISignRouteProp>();
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
          <Icon name={sign} fill={Colors.silver} style={styles.icon} />
        </View>
        <View style={styles.headerRight} />
      </View>
      <Text style={styles.title}>{i18n.t(`signs.${sign}`)}</Text>
      <Text style={styles.period}>{i18n.t(`signsDatePeriods.${sign}`)}</Text>
      <Text style={styles.border} lineBreakMode="clip" numberOfLines={1}>
        {border}
      </Text>
      <View style={styles.calendar}>
        <Icon name="calendar" fill={Colors.gray} style={styles.iconCalendar} />
      </View>
    </SafeAreaView>
  );
};

export default Sign;
