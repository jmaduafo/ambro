import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome } from "react-native-vector-icons";

import Home from "../screens/Home";
import Create from "../screens/Create";
import Notification from "../screens/Notification";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import { COLORS, SHADOW } from '../constant/default';

const Root = () => {
    const Tab = createBottomTabNavigator();

  return (
    
        <Tab.Navigator initialRouteName='Home'
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
                // HOME SCREEN
              if (route.name === "Home") {
                return (
                  <Ionicons
                    name={focused ? "home" : "home-outline"}
                    size={size}
                    color={color}
                  />
                );
                // NOTIFICATION SCREEN
              } else if (route.name === "Notification") {
                return (
                  <Ionicons
                    name={focused ? "notifications-sharp" : "notifications-outline"}
                    size={size}
                    color={color}
                  />
                );
                // CREATE SCREEN
              } else if (route.name === "Create") {
                return <Ionicons name="add-circle" size={50} color={color} />;
                // SEARCH SCREEN
              } else if (route.name === "Search") {
                return (
                  <Ionicons
                    name={focused ? "md-search" : "search-outline"}
                    size={size}
                    color={color}
                  />
                );
                // PROFILE SCREEN
              } else if (route.name === "Profile") {
                return (
                  <FontAwesome
                    name={focused ? "user" : "user-o"}
                    size={size}
                    color={color}
                  />
                );
              }
            },
            tabBarActiveTintColor: COLORS.textColorFull,
            tabBarInactiveTintColor: COLORS.textColorFull,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: COLORS.backgroundLight,
              borderTopColor: COLORS.backgroundLight,
              shadowColor: SHADOW.color,
              shadowOffset: {width: -4, height: 0},
              shadowOpacity: SHADOW.opacity,
              shadowRadius: SHADOW.radius,
              // borderRightColor: COLORS.textColorFull,
              // borderLeftColor: COLORS.textColorFull,
              borderTopWidth: 1,
              // borderRightWidth: 1,
              // borderLeftWidth: 1,
            //   borderTopRightRadius: 30,
            //   borderTopLeftRadius: 30,
              height: 90
            },
          })}>
          <Tab.Screen
            name="Home"
            options={{
              title: "Feed",
            }}
            component={Home}
          />
          <Tab.Screen
            name="Notification"
            options={{
              title: "Notification",
            }}
            component={Notification}
          />
          <Tab.Screen
            name="Create"
            options={{
              title: ""
            }}
            component={Create}
            
          />
          <Tab.Screen
            name="Search"
            options={{
              title: "Search"
            }}
            component={Search}
          />
          <Tab.Screen
            name="Profile"
            options={{
              title: "Profile",
            }}
            component={Profile}
          />
        </Tab.Navigator>
  )
}

export default Root

const styles = StyleSheet.create({})