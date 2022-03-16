// import { useNavigation } from "@react-navigation/native";
import React,{useState} from "react";
import { ActivityIndicator, Alert, View ,TextInput,StyleSheet,ScrollView ,Image} from "react-native";
import { Button, Text } from "react-native-elements";
import { useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import  Axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
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
    <ScrollView style = {{backgroundColor : "#414360"}}>
      <View style={styles.box}>
        <Text style={styles.boxTitle}>Thông tin cá nhân</Text>
      </View>
      <View style={styles.functionBox}>
        <View style={styles.functionCard}>
          <View style = {{flexDirection : "row"}}>
            <MaterialCommunityIcons name="account" size={22} style = {{marginLeft : 25,marginRight : 5}} color = "rgb(189, 147, 249)"/>
            <Text style={{fontSize: 18, marginRight: 271, color : "rgb(255, 121, 198)"}}>Họ và tên.</Text>
          </View>
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
          <View style = {{flexDirection : "row"}}>
            <MaterialCommunityIcons name="email" size={22} style = {{marginLeft : 25,marginRight : 5}} color = "rgb(189, 147, 249)"/>
            <Text style={{fontSize: 18, marginRight: 303, color : "rgb(255, 121, 198)"}}>Email.</Text>
          </View>
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
          <View style = {{flexDirection : "row"}}>
            <MaterialCommunityIcons name="phone" size={22} style = {{marginLeft : 25,marginRight : 5}} color = "rgb(189, 147, 249)"/>
            <Text style={{fontSize: 18, marginRight: 241, color : "rgb(255, 121, 198)"}}>Số điện thoại.</Text>
          </View>
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
          <View style = {{flexDirection : "row"}}>
            <FontAwesome name="address-book" size={22} style = {{marginLeft : 25,marginRight : 5}} color = "rgb(189, 147, 249)"/>
            <Text style={{fontSize: 18, marginRight: 293, color : "rgb(255, 121, 198)"}}>Địa chỉ.</Text>
          </View>
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
          <View style = {{flexDirection : "row"}}>
            <MaterialCommunityIcons name="account-box" size={22} style = {{marginLeft : 25,marginRight : 5}} color = "rgb(189, 147, 249)"/>
            <Text style={{fontSize: 18, marginRight: 246, color : "rgb(255, 121, 198)"}}>Mã sinh viên.</Text>
          </View>
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
          <View style = {{flexDirection : "row"}}>
            <MaterialCommunityIcons name="sim-outline" size={22} style = {{marginLeft : 25,marginRight : 5}} color = "rgb(189, 147, 249)"/>
            <Text style={{fontSize: 18, marginRight: 306, color : "rgb(255, 121, 198)"}}>Khoa.</Text>
          </View>
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
          <View style = {{flexDirection : "row"}}>
            <MaterialCommunityIcons name="square-edit-outline" size={22} style = {{marginLeft : 25,marginRight : 5}} color = "rgb(189, 147, 249)"/>
            <Text style={{fontSize: 18, marginRight: 176, color : "rgb(255, 121, 198)"}}>Chương trình đào tạo.</Text>
          </View>
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
          <View style = {{flexDirection : "row"}}>
            <MaterialCommunityIcons name="google-classroom" size={22} style = {{marginLeft : 25,marginRight : 5}} color = "rgb(189, 147, 249)"/>
            <Text style={{fontSize: 18, marginRight: 317, color : "rgb(255, 121, 198)"}}>Lớp.</Text>
          </View>
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
          <View style = {{flexDirection : "row"}}>
            <MaterialCommunityIcons name="send-lock-outline" size={22} style = {{marginLeft : 25,marginRight : 5}} color = "rgb(189, 147, 249)"/>
            <Text style={{fontSize: 18, marginRight: 291, color : "rgb(255, 121, 198)"}}>Học Kỳ.</Text>
          </View>
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
          <View style = {{flexDirection : "row"}}>
            <MaterialCommunityIcons name="format-list-numbered" size={22} style = {{marginLeft : 25,marginRight : 5}} color = "rgb(189, 147, 249)"/>
            <Text style={{fontSize: 18, marginRight: 264, color : "rgb(255, 121, 198)"}}>Niên Khóa.</Text>
          </View>
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
          borderColor : "rgb(189, 147, 249)"
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
    color: "rgb(80, 250, 123)",
  },
  input: {
    height: 40,
    margin: 12,
    width : "100%",
    borderWidth: 1,
    padding: 10,
    borderRadius : 5,
    borderColor : "yellowgreen",
    color : "rgb(248, 248, 242)",
  },
  functionBox: {
    backgroundColor: "#1F2739",
  },
  functionCard: {
    width: "100%",
    alignItems: 'center',
    padding: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
})
