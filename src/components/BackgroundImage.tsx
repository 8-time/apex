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
  // ACCELEROMETER_MULTIPLEXER,
} from '../hooks/useAccelerometer';

// TODO: work on perfomance
const { width, height } = Dimensions.get('screen');
// const w = width + ACCELEROMETER_MULTIPLEXER * 2;
// const h = height + ACCELEROMETER_MULTIPLEXER * 2;
const w = width;
const h = height;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    height: h,
    width: w,
    // marginLeft: -ACCELEROMETER_MULTIPLEXER,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
});

const BackgroundImage: React.FC = () => {
  const refValue = useAccelerometerXAnimateValueRef();

  return (
    <Animated.View style={[styles.root, { left: refValue.current }]}>
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
