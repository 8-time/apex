import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export default function useAnimateValueByTrigger(
  trigger: boolean,
  before: number,
  to: number,
  time = 500,
): Animated.Value {
  const animatedValueBefore = useRef(new Animated.Value(before)).current;
  const animatedValueTo = useRef(new Animated.Value(to)).current;

  useEffect(() => {
    if (trigger) {
      animatedValueTo.setValue(to);
      Animated.timing(animatedValueBefore, {
        toValue: to,
        duration: time,
        useNativeDriver: false,
        isInteraction: true,
      }).start();
    } else {
      animatedValueBefore.setValue(before);
      Animated.timing(animatedValueTo, {
        toValue: before,
        duration: time,
        useNativeDriver: false,
        isInteraction: true,
      }).start();
    }
  }, [trigger, animatedValueBefore, animatedValueTo, time, to, before]);

  return trigger ? animatedValueBefore : animatedValueTo;
}
