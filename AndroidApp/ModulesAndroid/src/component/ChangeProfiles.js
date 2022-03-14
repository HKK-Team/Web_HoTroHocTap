// import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { useSelector } from "react-redux";
export default function ChangeProfiles() {
    const student = useSelector((state) => state?.StudentsAccount?.StudentsAccountApi.data[0]);
  if (!student) {
    return (
      <ActivityIndicator size="large" color="#00ff00" />
    );
  }
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 25, fontWeight: "bold", paddingBottom: 20 }}>
        ChangeProfiles
      </Text>
      <Input
        placeholder={student?.FullName}
        value={student?.FullName}
        // onChange={(e) => setMaKhoa(e.nativeEvent.text)}
      />
      <Input
        placeholder={student?.Email}
        value={student?.Email}
        // onChange={(e) => setMaVienChuc(e.nativeEvent.text)}
      />
      <Button
        title="Lưu"
        buttonStyle={{
          backgroundColor: "rgba(78, 116, 289, 1)",
          borderRadius: 3,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        // onPress={handleChangeProfiles}
      />
    </View>
  );
}
