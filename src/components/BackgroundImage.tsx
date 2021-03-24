// TODO: Imporove performance of BackgroundImage Component
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { Asset } from 'expo-asset';
import {
  useAccelerometerXAnimateValueRef,
  ACCELEROMETER_MULTIPLEXER,
} from '../hooks/useAccelerometer';
import COLORS from '../theme/colors';

const { width, height } = Dimensions.get('screen');
const w = width + ACCELEROMETER_MULTIPLEXER * 2;
const h = height + ACCELEROMETER_MULTIPLEXER * 2;

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.black,
    position: 'absolute',
    height: h,
    width: w,
    top: -ACCELEROMETER_MULTIPLEXER,
    left: -ACCELEROMETER_MULTIPLEXER,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
});

const BackgroundImage: React.FC = () => {
  const refValueXY = useAccelerometerXAnimateValueRef();

  return (
    <Animated.View
      style={[
        styles.root,
        {
          transform: refValueXY.current.getTranslateTransform(),
        },
      ]}
    >
      <ImageBackground
        source={{
          uri: Asset.fromModule(require('../../assets/bg/main.png')).uri,
        }}
        style={styles.image}
      />
    </Animated.View>
  );
};

export default BackgroundImage;
