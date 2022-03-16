import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function Profiles() {
  const navigation = useNavigation();
  const student = useSelector((state) => state?.StudentsAccount?.StudentsAccountApi.data[0]);

  return (
    <ScrollView>
      <View style={style.conTactCard}>
        <View style={{ marginLeft: 15 }}>
          <Image
            style={style.image}
            source={{
              uri: student?.Image,
            }}
          ></Image>
        </View>
        <View style={style.contact}>
          <Text style={style.name}>{student?.FullName}</Text>
          <Text style={style.email}>{student?.Email}</Text>
        </View>
      </View>
      <View style={style.box}>
        <Text style={style.boxTitle}>Accout</Text>
      </View>
      <View style={style.functionBox}>
        <View style={style.functionCard}>
        <Ionicons name="settings-outline" size={22} />
          <Text
            style={{marginLeft:5}}
            onPress={(e) => {
              navigation.navigate("Tài khoản");
            }}
          >
            Settings
          </Text>
        </View>
        <View style={style.functionCard}>
          <Ionicons name="exit-outline" size={22} />
          <Text
            style={{marginLeft:5}}
            onPress={async (e) => {
              await AsyncStorage.removeItem("UserEmail");
              await AsyncStorage.removeItem("UserLogin");
              navigation.navigate("Trang chủ");
            }}
          >
            Logout
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
const style = StyleSheet.create({
  conTactCard: {
    width: "100%",
    height: 100,
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  contact: {
    marginLeft: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 2,
  },
  email: {
    fontSize: 13,
    color: "gray",
  },

  box: {
    padding: 10,
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },

  functionBox: {
    backgroundColor: "#fff",
  },
  functionCard: {
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
