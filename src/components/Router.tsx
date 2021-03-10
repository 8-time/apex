import * as React from 'react';
import SplashScreen from 'expo-app-loading';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import HomeScreen from '../screens/Home';
import SignScreen from '../screens/Sign';
import BackgroundImage from '../components/BackgroundImage';
import cardStyleInterpolatorFuntion from '../animation/cardStyleInterpolatorFuntion';
import useRootStore from '../hooks/useRootStore';
import BrandLoader from './BrandLoader';

const Stack = createStackNavigator();

const Router: React.FC = observer(() => {
  const {
    loading,
    daily: { loading: isFethingDaily },
  } = useRootStore();

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" animated />
      <BackgroundImage />
      <Stack.Navigator
        initialRouteName="Home"
        headerMode="none"
        screenOptions={{
          cardStyleInterpolator: cardStyleInterpolatorFuntion,
          cardStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sign" component={SignScreen} />
      </Stack.Navigator>
      {isFethingDaily ? <BrandLoader /> : null}
    </NavigationContainer>
  );
});

export default Router;
