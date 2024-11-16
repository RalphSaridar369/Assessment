import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UniversitiesScreen from "../pages/Universities/Universities";
import { Ionicons } from "@expo/vector-icons";
import Favourites from "../pages/Favourites/Favourites";

const Tab = createBottomTabNavigator();

export default function BottomTabStack() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Universities"
        screenOptions={{
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Universities"
          component={UniversitiesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="book" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Favourites"
          component={Favourites}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="albums" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
