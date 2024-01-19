import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome } from "react-native-vector-icons";

import Home from "../../screens/Home";
import Create from "../../screens/Create";
import Notification from "../../screens/Notification";
import Profile from "../../screens/Profile";
import Search from "../../screens/Search";

// Import Search components as a stack navigation to nest within tab navigator
import SearchGroup from './SearchGroup';

import { COLORS, SHADOW } from '../../constant/default';

const Tab = createBottomTabNavigator();

const Root = () => {
    const [ selectedCat, setSelectedCat ] = useState(null)

    
  return (
        // BOTTOM TAB NAVIGATION
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
              } else if (route.name === "SearchGroup") {
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
              borderTopWidth: 1,
              height: 90
            },
          })}>
          <Tab.Screen
            name="Home"
            options={{
              title: "Feed",
            }}
            component={Home}
            initialParams={''}
          />
          <Tab.Screen
            name="Notification"
            options={{
              title: "Notification",
            }}
            component={Notification}
            initialParams={''}
          />
          <Tab.Screen
            name="Create"
            options={{
              title: ""
            }}
            component={Create}
            initialParams={''}
            
          />
          <Tab.Screen
            name="SearchGroup"
            options={{
              title: "Search"
            }}
            component={SearchGroup}
            initialParams={''}
          />
          <Tab.Screen
            name="Profile"
            options={{
              title: "Profile",
            }}
            component={Profile}
            initialParams={''}
          />
        </Tab.Navigator>
  )
}

export default Root

const styles = StyleSheet.create({})