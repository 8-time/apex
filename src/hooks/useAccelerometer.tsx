import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { Animated } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export const ACCELEROMETER_MULTIPLEXER = 35;

export const useAccelerometerXAnimateValueRef = (): MutableRefObject<Animated.ValueXY> => {
  const [isAvailable, setIsAvailable] = useState(false);
  const refXY = useRef(new Animated.ValueXY({ x: 0, y: 0 }));
  const refXYOut = useRef(new Animated.ValueXY({ x: 0, y: 0 }));

  Animated.spring(refXYOut.current, {
    toValue: {
      x: (refXY.current.x.interpolate({
        inputRange: [-1.1, 1.1],
        outputRange: [-ACCELEROMETER_MULTIPLEXER, ACCELEROMETER_MULTIPLEXER],
      }) as unknown) as number,
      y: (refXY.current.y.interpolate({
        inputRange: [-1.1, 1.1],
        outputRange: [-ACCELEROMETER_MULTIPLEXER, ACCELEROMETER_MULTIPLEXER],
      }) as unknown) as number,
    },
    useNativeDriver: true,
  }).start();

  useEffect(() => {
    const start = async () => {
      setIsAvailable(await Accelerometer.isAvailableAsync());
    };

    start();
  }, []);

  useEffect(() => {
    if (!isAvailable) {
      return () => null;
    }

    const { remove } = Accelerometer.addListener(props => {
      refXY.current.setValue(props);
    });

    return () => remove();
  }, [isAvailable]);

  return refXYOut;
};
