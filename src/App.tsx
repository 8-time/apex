import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import HomeScreen from './screens/Home';
import {
  ContextOfRootStore,
  valueOfContext,
} from './contexts/RootStoreContext';
import BackgroundImage from './components/BackgroundImage';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    // eslint-disable-next-line global-require
    'Geometria-Light': require('../assets/fonts/geometria-light.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ContextOfRootStore.Provider value={valueOfContext}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" animated />
        <BackgroundImage />
        <Stack.Navigator
          initialRouteName="Home"
          headerMode="none"
          screenOptions={{
            cardStyle: { backgroundColor: 'transparent' },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextOfRootStore.Provider>
  );
};

export default App;
