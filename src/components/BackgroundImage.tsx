import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import main from '../../assets/bg/main.jpg';
import {
  useAccelerometerXAnimateValueRef,
  ACCELEROMETER_MULTIPLEXER,
} from '../hooks/useAccelerometer';

const { width, height } = Dimensions.get('screen');
const w = width + ACCELEROMETER_MULTIPLEXER * 2;
const h = height + ACCELEROMETER_MULTIPLEXER * 2;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    height: h,
    width: w,
    marginLeft: -ACCELEROMETER_MULTIPLEXER,
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
      <ImageBackground source={main} style={styles.image} />
    </Animated.View>
  );
};

export default BackgroundImage;
