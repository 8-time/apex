import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Animated, PixelRatio } from 'react-native';
import Icon from '../components/Icon';
import COLORS from '../theme/colors';

const styles = StyleSheet.create({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: COLORS.black,
    opacity: 0.6,
  },
  animated: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 60,
    aspectRatio: 1,
  },
});

const BrandLoader: React.FC = () => {
  const opacityAries = useRef(new Animated.Value(1)).current;
  const opacityTaurus = useRef(new Animated.Value(0)).current;
  const opacityGemini = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(opacityAries, {
            duration: 500,
            toValue: 0,
            useNativeDriver: false,
          }),
          Animated.timing(opacityTaurus, {
            duration: 500,
            toValue: 1,
            useNativeDriver: false,
          }),
        ]),
        Animated.parallel([
          Animated.timing(opacityTaurus, {
            duration: 500,
            toValue: 0,
            useNativeDriver: false,
          }),
          Animated.timing(opacityGemini, {
            duration: 500,
            toValue: 1,
            useNativeDriver: false,
          }),
        ]),
        Animated.parallel([
          Animated.timing(opacityGemini, {
            duration: 500,
            toValue: 0,
            useNativeDriver: false,
          }),
          Animated.timing(opacityAries, {
            duration: 500,
            toValue: 1,
            useNativeDriver: false,
          }),
        ]),
      ]),
    ).start();
  }, [opacityAries, opacityTaurus, opacityGemini]);

  return (
    <>
      <View style={styles.backdrop} />

      <View style={styles.modal}>
        <Animated.View
          style={[
            styles.animated,
            {
              opacity: opacityAries,
            },
          ]}
        >
          <Icon name="aries" style={styles.icon} fill={COLORS.white} />
        </Animated.View>
        <Animated.View
          style={[
            styles.animated,
            {
              opacity: opacityTaurus,
            },
          ]}
        >
          <Icon name="taurus" style={styles.icon} fill={COLORS.white} />
        </Animated.View>
        <Animated.View
          style={[
            styles.animated,
            {
              opacity: opacityGemini,
            },
          ]}
        >
          <Icon name="gemini" style={styles.icon} fill={COLORS.white} />
        </Animated.View>
      </View>
    </>
  );
};

export default BrandLoader;
