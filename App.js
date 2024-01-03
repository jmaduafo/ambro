import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from './screens/Home';
import Create from './screens/Create';
import Notification from './screens/Notification';
import Profile from './screens/Profile';
import Login from './screens/Login';

import AppIntroSlider from 'react-native-app-intro-slider';
import { slides } from './utils/onboarding';
import OnboardingSlide from './components/OnboardingSlide';
import OnboardingButton from './components/OnboardingButton';

export default function App() {
  const [ showHome, setShowHome ] = useState(true)

  const Tab = createBottomTabNavigator();

  const [fontsLoaded] = useFonts({
    'Satoshi-Light': require('./assets/fonts/Satoshi-Light.otf'),
    'Satoshi-Regular': require('./assets/fonts/Satoshi-Regular.otf'),
    'Satoshi-Medium': require('./assets/fonts/Satoshi-Medium.otf'),
    'Satoshi-Bold': require('./assets/fonts/Satoshi-Bold.otf'),
    'Satoshi-Black': require('./assets/fonts/Satoshi-Black.otf'),

    'Boska-Light': require('./assets/fonts/Boska-Extralight.otf'),
    'Boska-Light': require('./assets/fonts/Boska-Light.otf'),
    'Boska-Regular': require('./assets/fonts/Boska-Regular.otf'),
    'Boska-Medium': require('./assets/fonts/Boska-Medium.otf'),
    'Boska-Bold': require('./assets/fonts/Boska-Bold.otf'),
    'Boska-Black': require('./assets/fonts/Boska-Black.otf'),
  });

  // Show Splash Screen while fonts load
  useEffect(function() {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, [])

  // Hide Splash Screen when fonts have finished loading
  if (!fontsLoaded) {
    return null
  } else {
    SplashScreen.hideAsync()
  }

  if (showHome) {
    return Onboarding()
  }

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen name='Home' options={{ headerShown: false }} component={Home}/>
        <Tab.Screen name='Notification' options={{ headerShown: false }} component={Notification}/>
        <Tab.Screen name='Create' options={{ headerShown: false }} component={Create}/>
        <Tab.Screen name='Login' options={{ headerShown: false }} component={Login}/>
        <Tab.Screen name='Profile' options={{ headerShown: false }} component={Profile}/>
      </Tab.Navigator>
    </NavigationContainer>

  );

  function Onboarding() {
    return (
      <>
      <AppIntroSlider
        data={slides}
        renderItem={({item}) => {
          return <OnboardingSlide image={item.image} title={item.title} description={item.description}/>
        }}
        dotStyle={{backgroundColor: 'rgba(214, 109, 64, .4)'}}
        activeDotStyle={{ backgroundColor: 'rgb(214, 109, 64)', width: 20 }}
        showSkipButton
        renderSkipButton={() => <OnboardingButton text='Skip'/>}
        renderNextButton={() => <OnboardingButton text='Next'/>}
        renderDoneButton={() => <OnboardingButton text='Done'/>}
        onSkip={() => setShowHome(false)}
        />
      </>
    )
  }
}


