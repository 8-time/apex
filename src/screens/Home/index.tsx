import * as React from 'react';
import {
  PixelRatio,
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { map } from 'lodash';
import { observer } from 'mobx-react';
import i18n from '../../localization';
import COLORS from '../../theme/colors';
import useRootStore from '../../hooks/useRootStore';
import SignButton from '../../components/SignButton';
import { ISing } from '../../types/common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 24 / PixelRatio.get(),
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'Geometria-Light',
    color: COLORS.silver,
  },
  msg: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: 'Geometria-Light',
  },
  errorMsg: {
    color: COLORS.burntSienna,
  },
  signs: {
    marginHorizontal: 3 / PixelRatio.get(),
    marginTop: 'auto',
    marginBottom: 'auto',
    flexDirection: 'row',
  },
  firstRow: {
    marginTop: 0,
  },
  contaienerForMsg: {
    marginHorizontal: 16,
    height: 48,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningMsg: {
    color: COLORS.sandyBrown,
  },
  scroll: {
    flexGrow: 1,
  },
});

const HomeScreen: React.FC = observer(() => {
  const { daily } = useRootStore();
  const isDisabledSing = (daily.isEmpty && !!daily.errorMsg) || daily.loading;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{i18n.t('homePageTitle')}</Text>
      <View style={styles.contaienerForMsg}>
        {daily.errorMsg ? (
          <Text
            style={[
              styles.msg,
              daily.isEmpty ? styles.errorMsg : styles.warningMsg,
            ]}
          >
            {(daily.isEmpty && i18n.t('loadErrorForEmpty')) ||
              i18n.t('loadErrorForOutdated')}
          </Text>
        ) : null}
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        overScrollMode="never"
        refreshControl={
          <RefreshControl
            enabled={!!daily.errorMsg}
            refreshing={false}
            onRefresh={daily.errorMsg ? daily.load : undefined}
          />
        }
      >
        <View style={[styles.signs, styles.firstRow]}>
          {map(['aries', 'taurus', 'gemini'] as ISing[], sign => (
            <SignButton key={sign} sign={sign} disabled={isDisabledSing} />
          ))}
        </View>
        <View style={styles.signs}>
          {map(['cancer', 'leo', 'virgo'] as ISing[], sign => (
            <SignButton key={sign} sign={sign} disabled={isDisabledSing} />
          ))}
        </View>
        <View style={styles.signs}>
          {map(['libra', 'scorpio', 'sagittarius'] as ISing[], sign => (
            <SignButton key={sign} sign={sign} disabled={isDisabledSing} />
          ))}
        </View>
        <View style={styles.signs}>
          {map(['capricorn', 'aquarius', 'pisces'] as ISing[], sign => (
            <SignButton key={sign} sign={sign} disabled={isDisabledSing} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

export default HomeScreen;
