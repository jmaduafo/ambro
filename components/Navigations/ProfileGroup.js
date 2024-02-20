import { StyleSheet } from "react-native";
import React from "react";
import Profile from "../../screens/Profile";
import EditProfile from "../Profile/EditProfile";
import MoreOptions from "../Profile/MoreOptions";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const ProfileStack = createNativeStackNavigator();

const ProfileGroup = () => {

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
