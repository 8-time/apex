import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { PixelRatio, Text, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../components/Icon';
import i18n from '../localization';
import Colors from '../theme/colors';
import { ISing } from '../types/common';

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

interface ISignButtonProps {
  sign: ISing;
}

const SignButton: React.FC<ISignButtonProps> = ({ sign }) => {
  const navigation = useNavigation();

  const onPress = React.useCallback(() => {
    navigation.navigate('Sign', { sign });
  }, [navigation, sign]);

  return (
    <View style={styles.sign}>
      <TouchableOpacity
        style={styles.signButton}
        activeOpacity={0.6}
        onPress={onPress}
      >
        <Icon name={sign} fill={Colors.silver} style={styles.icon} />
        <Text style={styles.label}>{i18n.t(`signs.${sign}`)}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignButton;
