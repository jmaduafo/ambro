import { useState, useEffect } from "react";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack'

import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home"

import AppIntroSlider from "react-native-app-intro-slider";
import { slides } from "./utils/onboarding";
import OnboardingSlide from "./components/OnboardingSlide";
import OnboardingButton from "./components/OnboardingButton";
import Root from "./components/Root";
import Profile from "./screens/Profile";

export default function App({navigation}) {
  const [showHome, setShowHome] = useState(true);

  const Stack = createStackNavigator();

  const [fontsLoaded] = useFonts({
    "Satoshi-Light": require("./assets/fonts/Satoshi-Light.otf"),
    "Satoshi-Regular": require("./assets/fonts/Satoshi-Regular.otf"),
    "Satoshi-Medium": require("./assets/fonts/Satoshi-Medium.otf"),
    "Satoshi-Bold": require("./assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-Black": require("./assets/fonts/Satoshi-Black.otf"),

    "Boska-Light": require("./assets/fonts/Boska-Extralight.otf"),
    "Boska-Light": require("./assets/fonts/Boska-Light.otf"),
    "Boska-Regular": require("./assets/fonts/Boska-Regular.otf"),
    "Boska-Medium": require("./assets/fonts/Boska-Medium.otf"),
    "Boska-Bold": require("./assets/fonts/Boska-Bold.otf"),
    "Boska-Black": require("./assets/fonts/Boska-Black.otf"),
  });

  // Show Splash Screen while fonts load
  useEffect(function () {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  // Hide Splash Screen when fonts have finished loading
  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  if (showHome) {
    return Onboarding();
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Root">
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name="SignUp" component={SignUp}  options={{ headerShown: false }} />
            <Stack.Screen name="Root" component={Root} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />  
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );

  function Onboarding() {
    return (
      <>
        <AppIntroSlider
          data={slides}
          renderItem={({ item }) => {
            return (
              <OnboardingSlide
                image={item.image}
                title={item.title}
                description={item.description}
              />
            );
          }}
          dotStyle={{ backgroundColor: "rgba(214, 109, 64, .4)" }}
          activeDotStyle={{ backgroundColor: "rgb(214, 109, 64)", width: 20 }}
          showSkipButton
          renderSkipButton={() => <OnboardingButton text="Skip" />}
          renderNextButton={() => <OnboardingButton text="Next" />}
          renderDoneButton={() => <OnboardingButton text="Done" />}
          onSkip={() => {
            setShowHome(false)
          }}
          onDone={() => {
            setShowHome(false)
          }}
        />
      </>
    );
  }
}
