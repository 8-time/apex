import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { Animated } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export const ACCELEROMETER_MULTIPLEXER = 15;

export const useAccelerometerXAnimateValueRef = (): MutableRefObject<Animated.Value> => {
  const [isAvailable, setIsAvailable] = useState(false);
  const ref = useRef(new Animated.Value(0));

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
      const value = props.x * ACCELEROMETER_MULTIPLEXER;
      ref.current.setValue(
        (value > ACCELEROMETER_MULTIPLEXER && ACCELEROMETER_MULTIPLEXER) ||
          (value < -ACCELEROMETER_MULTIPLEXER && -ACCELEROMETER_MULTIPLEXER) ||
          value,
      );
    });

    return () => remove();
  }, [isAvailable]);

  return ref;
};
