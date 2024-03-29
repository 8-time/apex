import * as React from 'react';
import {
  PixelRatio,
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
} from 'react-native';
import * as Linking from 'expo-linking';
import { format } from 'date-fns';
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
import useAnimateValueByTrigger from '../../hooks/useAnimateValueByTrigger';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginTop: 24 / PixelRatio.get(),
    marginLeft: 16,
    marginRight: 16,
  },
  headerLeft: {
    fontSize: 48,
    fontFamily: 'Geometria-Light',
    color: COLORS.gainsboro,
    width: 48,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    aspectRatio: 1,
    width: 48,
  },
  icon: {
    width: 142,
    aspectRatio: 1,
  },
  title: {
    textAlign: 'center',
    marginTop: 24 / PixelRatio.get(),
    fontSize: 36,
    fontFamily: 'Geometria-Light',
    color: COLORS.gainsboro,
  },
  period: {
    textAlign: 'center',
    marginTop: 16 / PixelRatio.get(),
    fontSize: 22,
    fontFamily: 'Geometria-Light',
    letterSpacing: -0.5,
    color: COLORS.gray,
  },
  actionsCircles: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 24 / PixelRatio.get(),
    marginHorizontal: 20,
  },
  circle: {
    marginHorizontal: 3,
    width: 14,
    aspectRatio: 1,
  },
  cards: {
    flexDirection: 'row',
  },
  calendar: {
    alignItems: 'center',
  },
  iconCalendar: {
    width: 32,
    aspectRatio: 1,
  },
  link: {
    textAlign: 'center',
    color: COLORS.gainsboro,
    fontFamily: 'Geometria-Light',
    lineHeight: 14,
    fontSize: 14,
    letterSpacing: -0.1,
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
  const scrollRef = React.useRef<ScrollView | null>(null);
  const [selectedDatesIndex, setSelectedDatesIndex] = React.useState(0);
  const [scrollState, setScrollState] = React.useState<'begin' | 'end'>('end');
  const opacity = useAnimateValueByTrigger(
    scrollState === 'begin',
    1,
    0.8,
    300,
  );

  const onMomentumScrollEnd = React.useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      setScrollState('end');
      setSelectedDatesIndex(
        Math.round(e.nativeEvent.contentOffset.x / SIGN_CARD_WIDTH),
      );
    },
    [],
  );
  const onMomentumScrollBegin = React.useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const floatIndex = e.nativeEvent.contentOffset.x / SIGN_CARD_WIDTH;
      if (floatIndex < daily.datesKeys.length - 1 && floatIndex > 0) {
        setScrollState('begin');
      }
    },
    [daily.datesKeys],
  );
  const onPressToIngio = React.useCallback(() => {
    Linking.openURL('https://ignio.com/');
  }, []);

  React.useEffect(() => {
    const indexOfCurrentDate = daily.datesValues.indexOf(
      format(new Date(), 'dd.MM.yyyy'),
    );
    if (indexOfCurrentDate !== -1) {
      scrollRef.current?.scrollTo({
        x: indexOfCurrentDate * SIGN_CARD_WIDTH,
        animated: false,
      });
      setSelectedDatesIndex(indexOfCurrentDate);
    }
  }, [daily.datesValues]);

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
      <Animated.View style={{ opacity }}>
        <View style={styles.actionsCircles}>
          {map(daily.datesKeys, (value, index) => (
            <Icon
              name="brightness"
              key={value}
              fill={
                scrollState === 'end' && index === selectedDatesIndex
                  ? COLORS.silver
                  : COLORS.gray
              }
              style={styles.circle}
            />
          ))}
        </View>
        <View style={styles.calendar}>
          <Icon
            name="event"
            fill={scrollState === 'end' ? COLORS.silver : COLORS.gray}
            style={styles.iconCalendar}
          />
        </View>
      </Animated.View>
      <ScrollView
        ref={scrollRef}
        horizontal
        overScrollMode="never"
        nestedScrollEnabled
        accessible={false}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        scrollToOverflowEnabled={false}
        snapToAlignment="start"
        pagingEnabled
        snapToStart
        scrollEventThrottle={16}
        snapToInterval={SIGN_CARD_WIDTH}
      >
        <View style={styles.cards}>
          {map(daily.datesKeys, key => (
            <SingCard key={key} sign={sign} dateKey={key as IDateModelKeys} />
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity activeOpacity={0.6} onPress={onPressToIngio}>
        <Text style={styles.link}>{i18n.t('linkTo')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
});

export default Sign;
