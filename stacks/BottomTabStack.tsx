import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UniversitiesScreen from "../pages/Universities/Universities";
import { Ionicons } from "@expo/vector-icons";
import EntriesScreen from "../pages/Entries/Entries";

const Tab = createBottomTabNavigator();

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

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
          name="Entries"
          component={EntriesScreen}
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
