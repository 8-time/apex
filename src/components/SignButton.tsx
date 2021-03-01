import * as React from 'react';
import { PixelRatio, Text, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../components/Icon';
import i18n from '../localization';
import Colors from '../theme/colors';

const styles = StyleSheet.create({
  sign: {
    flexDirection: 'column',
    flex: 1,
  },
  icon: {
    width: PixelRatio.getPixelSizeForLayoutSize(42),
    aspectRatio: 1,
  },
  label: {
    marginTop: PixelRatio.getPixelSizeForLayoutSize(8),
    fontSize: PixelRatio.getPixelSizeForLayoutSize(10),
    textAlign: 'center',
    fontFamily: 'Geometria-Light',
    color: Colors.silver,
  },
  signButton: {
    alignItems: 'center',
  },
});

export type ISing =
  | 'aquarius'
  | 'aries'
  | 'cancer'
  | 'capricornius'
  | 'gemini'
  | 'leo'
  | 'libra'
  | 'pisces'
  | 'sagittariusSymbol'
  | 'scorpius'
  | 'taurus'
  | 'virgo';

interface ISignButtonProps {
  sign: ISing;
}

const SignButton: React.FC<ISignButtonProps> = ({ sign }) => {
  return (
    <View style={styles.sign}>
      <TouchableOpacity style={styles.signButton} activeOpacity={0.6}>
        <Icon name={sign} fill={Colors.silver} style={styles.icon} />
        <Text style={styles.label}>{i18n.t(`signs.${sign}`)}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignButton;
