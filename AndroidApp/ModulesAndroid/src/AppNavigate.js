import * as React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ChangeProfiles from "./component/ChangeProfiles";
import HomePage from "./component/HomePage";
import Profiles from "./component/Profiles";
// import SchudeleExams from "./components/SchudeleExams";
import SearchScore from "./component/SearchScore";
import { useDispatch } from "react-redux";
import { getStudentsAccApiAsync } from "./Api/StudentsApi";
import { getSubjectScoreApiAsync } from "./Api/SubjectScoreApi";
import { getSubjectScoreClassApiAsync } from "./Api/SubjectScoreClassApi";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigate() {
  const [isLogin, setIslogin] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    const getItem = async () => {
      setIslogin(await AsyncStorage.getItem("UserLogin"));
    };
    getItem();
    const getEmail = async () => {
      setEmail(await AsyncStorage.getItem("UserEmail"));
    };
    getEmail();
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStudentsAccApiAsync());
    dispatch(getSubjectScoreApiAsync());
    dispatch(getSubjectScoreClassApiAsync());
  }, [dispatch]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={`${isLogin ? "Menu" : "Trang chủ"}`}>
        <Stack.Screen name="Trang chủ" component={HomePage} />
        <Stack.Screen name="Xem Điểm Thi" component={SearchScore} />
        <Stack.Screen name="Menu" component={TabPage} />
        <Stack.Screen name="Tài khoản" component={ChangeProfiles} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export function TabPage() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="View Suggest Score"
        component={Profiles}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="View Score"
        component={Profiles}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profiles"
        component={Profiles}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
