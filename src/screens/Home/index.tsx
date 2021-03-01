import * as React from 'react';
import {
  PixelRatio,
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
} from 'react-native';
import { map } from 'lodash';
import i18n from '../../localization';
import Colors from '../../theme/colors';
import SignButton, { ISing } from '../../components/SignButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: PixelRatio.getPixelSizeForLayoutSize(12),
    fontSize: PixelRatio.getPixelSizeForLayoutSize(16),
    textAlign: 'center',
    fontFamily: 'Geometria-Light',
    color: Colors.silver,
  },
  signs: {
    marginTop: PixelRatio.getPixelSizeForLayoutSize(24),
    flexDirection: 'row',
  },
});

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{i18n.t('homePageTitle')}</Text>
      <ScrollView>
        <View style={styles.signs}>
          {map(['aries', 'taurus', 'gemini'] as ISing[], sign => (
            <SignButton key={sign} sign={sign} />
          ))}
        </View>
        <View style={styles.signs}>
          {map(['cancer', 'leo', 'virgo'] as ISing[], sign => (
            <SignButton key={sign} sign={sign} />
          ))}
        </View>
        <View style={styles.signs}>
          {map(['libra', 'scorpius', 'sagittariusSymbol'] as ISing[], sign => (
            <SignButton key={sign} sign={sign} />
          ))}
        </View>
        <View style={styles.signs}>
          {map(['capricornius', 'aquarius', 'pisces'] as ISing[], sign => (
            <SignButton key={sign} sign={sign} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
