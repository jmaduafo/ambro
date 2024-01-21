import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Profile from "../../screens/Profile";
import EditProfile from "../Profile/EditProfile";
import MoreOptions from "../Profile/MoreOptions";
import { ArrowLeftIcon } from "react-native-heroicons/outline";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "../../constant/default";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProfileStack = createNativeStackNavigator();

const ProfileGroup = ({navigation}) => {
  const { navigate } = useNavigation()
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{
          // headerLeft: () => (
          //   <Pressable onPress={() => navigation.goBack()}>
          //     <ArrowLeftIcon color={COLORS.textColorFull} strokeWidth={1} />
          //   </Pressable>
          // ),
          presentation: "modal"
        }}
      />
      <ProfileStack.Screen
        name="Settings"
        component={MoreOptions}
        options={{ presentation: "modal" }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileGroup;

const styles = StyleSheet.create({});
