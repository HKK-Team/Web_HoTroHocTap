// import { useNavigation } from "@react-navigation/native";
import React,{useState} from "react";
import { ActivityIndicator, Alert, View ,TextInput,StyleSheet,ScrollView ,Image} from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { useSelector } from "react-redux";
import  Axios from "axios";
export default function ChangeProfiles() {
  const student = useSelector((state) => state?.StudentsAccount?.StudentsAccountApi.data[0]);
  const [profile, setProfile] = useState({
    _id: student?._id,
    Email: student?.Email,
    FullName: student?.FullName,
    Phone: student?.Phone,
    Student_Id : student?.Student_Id,
    Khoa: student?.Khoa,
    Class: student?.Class,
    Address : student?.Address,
    Education_Program : student?.Education_Program,
    Current_Semester: student?.Current_Semester,
    Study_Year: student?.Study_Year,
  });
  const handleSubmitEditProfile = async (e) => {
    e.preventDefault();
    try{
      await Axios.post("http://10.0.2.2:5000/student/edituser", profile);
      Alert.alert("Thông báo!","Bạn đã cập nhật thông tin cá nhân thành công!");
    }
    catch(err){
      alert(err);
    }
  }
  if (!student) {
    return (
      <ActivityIndicator size="large" color="#00ff00" />
    );
  }
  return (
    <ScrollView >
      {/* <View style = {{marginBottom : 10}}>
        <Image
          style={{
            width: 80,
            height: 80,
            borderRadius: 50,
            marginLeft: "40%"
          }}
          source={{
            uri: student?.Image,
          }}
        >
        </Image>
        <Text style = {{textAlign : "center", fontSize : 20, fontStyle : "normal"}}>{student.FullName}</Text>
        <Text style = {{textAlign : "center", fontSize : 15, fontStyle : "normal"}}>{student.Email}</Text>
      </View> */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>Thông tin cá nhân</Text>
      </View>
      <View style={styles.functionBox}>
        <View style={styles.functionCard}>
          <Text style={{fontSize: 18, marginRight: 271}}>Họ và tên.</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => { setProfile({...profile,FullName:text})}}
            value={profile?.FullName}
            placeholder={profile?.FullName}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.functionBox}>
        <View style={styles.functionCard}>
          <Text style={{fontSize: 18, marginRight: 303}}>Email.</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => { setProfile({...profile,Email:text})}}
            value={profile?.Email}
            placeholder={profile?.Email}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.functionBox}>
        <View style={styles.functionCard}>
          <Text style={{fontSize: 18, marginRight: 241}}>Số điện thoại.</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => { setProfile({...profile,Phone:text})}}
            value={profile?.Phone}
            placeholder={profile?.Phone}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.functionBox}>
        <View style={styles.functionCard}>
          <Text style={{fontSize: 18, marginRight: 293}}>Địa chỉ.</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => { setProfile({...profile,Address:text})}}
            value={profile?.Address}
            placeholder={profile?.Address}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxTitle}>Thông tin chương trình</Text>
      </View>
      <View style={styles.functionBox}>
        <View style={styles.functionCard}>
          <Text style={{fontSize: 18, marginRight: 246}}>Mã sinh viên.</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => { setProfile({...profile,Student_Id:text})}}
            value={profile?.Student_Id}
            placeholder={profile?.Student_Id}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.functionBox}>
        <View style={styles.functionCard}>
          <Text style={{fontSize: 18, marginRight: 306}}>Khoa.</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => { setProfile({...profile,Khoa:text})}}
            value={profile?.Khoa}
            placeholder={profile?.Khoa}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.functionBox}>
        <View style={styles.functionCard}>
          <Text style={{fontSize: 18, marginRight: 176}}>Chương trình đào tạo.</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => { setProfile({...profile,Education_Program:text})}}
            value={profile?.Education_Program}
            placeholder={profile?.Education_Program}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.functionBox}>
        <View style={styles.functionCard}>
          <Text style={{fontSize: 18, marginRight: 317}}>Lớp.</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => { setProfile({...profile,Class:text})}}
            value={profile?.Class}
            placeholder={profile?.Class}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxTitle}>Thông tin học vụ</Text>
      </View>
      <View style={styles.functionBox}>
        <View style={styles.functionCard}>
          <Text style={{fontSize: 18, marginRight: 291}}>Học Kỳ.</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => { setProfile({...profile,Current_Semester:text})}}
            value={profile?.Current_Semester}
            placeholder={profile?.Current_Semester}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.functionBox}>
        <View style={styles.functionCard}>
          <Text style={{fontSize: 18, marginRight: 264}}>Niên Khóa.</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => { setProfile({...profile,Study_Year:text})}}
            value={profile?.Study_Year}
            placeholder={profile?.Study_Year}
            keyboardType="numeric"
          />
        </View>
      </View>
      <Button
        title="Cập nhật"
        buttonStyle={{
          backgroundColor: "rgba(78, 116, 289, 1)",
          borderRadius: 10,
          marginBottom: 10,
        }}
        containerStyle={{
          marginLeft : 175,
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={handleSubmitEditProfile}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  conTactCard: {
    width: "100%",
    height: 100,
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    padding: 10,
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
  input: {
    height: 40,
    margin: 12,
    width : "100%",
    borderWidth: 1,
    padding: 10,
    borderRadius : 5
  },
  functionBox: {
    backgroundColor: "#fff",
  },
  functionCard: {
    width: "100%",
    alignItems: 'center',
    padding: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
})
