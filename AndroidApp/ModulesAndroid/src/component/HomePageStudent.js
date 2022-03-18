import React, {useEffect} from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import {useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Table, Row, Rows } from 'react-native-table-component';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getStudentsAccApiAsync } from "../Api/StudentsApi";
import { getSubjectScoreApiAsync } from "../Api/SubjectScoreApi";
export default function HomePageStudent() {
  // get data from redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStudentsAccApiAsync());
    dispatch(getSubjectScoreApiAsync());
  }, [dispatch]);
  const student = useSelector((state) => state?.StudentsAccount?.StudentsAccountApi.data[0]);
  const score = useSelector((state) => state.SubjectScore.SubjectScoreApi.data);
  var arr = ['STT','Tên MH','Mã MH','Tín Chỉ','Điểm QT','Điểm Thi','Điểm Tổng'];
  // get 10 subjects with the highest GPA
  function compare( a, b ) {
      if ( a.Final_Score > b.Final_Score ){
        return -1;
      }
      if ( a.Final_Score < b.Final_Score ){
        return 1;
      }
      return 0;
  };
  var ar = [];
  for(let i = 0;i<score.length;i++){
    ar.push(score[i]);
  }
  ar.sort(compare);
  var arrayTop10SubjectScore = [];
  for(let i = 0;i<ar.length;i++)
  {
      arrayTop10SubjectScore.push([
        i+1,
        ar[i]?.Subject_Name,
        ar[i]?.Subject_Id,
        ar[i]?.Number_Of_Credits,
        ar[i]?.Process_Score,
        ar[i]?.Final_Exam_Score,
        ar[i]?.Final_Score
      ]);
  };
  // get avg score
  var avgFinalScore = 0;
  var avgNumberofCredis = 0;
  score.map(item =>(
      avgNumberofCredis +=item.Number_Of_Credits
  ));
  score.map(item =>(
      avgFinalScore += item.Final_Score*item.Number_Of_Credits
  ));
  // get avgCredis earned
  var avgCredis = 0;
  score.map(item => ((item.Semester !== student?.Current_Semester) && (item.Final_Score>=5)) ? avgCredis += item.Number_Of_Credits : avgCredis += 0);
  // get % number of credis
  var PercentCredis = ((student?.Number_Of_Credits_Earned/avgCredis)-1)*100;
  var iconCredis;
  if(PercentCredis>=0)
  {
    iconCredis = <MaterialCommunityIcons name="arrow-up" color = "rgb(80, 250, 123)" size={22}/>
  }
  else{
    iconCredis = <MaterialCommunityIcons name="arrow-down" color= "rgb(190 11 53)" size={22}/>
  }
  // get % number of credis debt
  var PercentCredisDP = (1-(150-student?.Number_Of_Credits_Earned)/(150-avgCredis))*100;
  var iconCredisDP;
  if(PercentCredisDP>=0)
  {
    iconCredisDP = <MaterialCommunityIcons name="arrow-up" color = "rgb(80, 250, 123)" size={22}/>
  }
  else{
    iconCredisDP = <MaterialCommunityIcons name="arrow-down" color= "rgb(190 11 53)" size={22}/>
  }
  // get % avg score
  var avgScore = 0;
  score.map(item => (item.Semester !== student?.Current_Semester) ? avgScore += (item.Final_Score*item.Number_Of_Credits) : avgScore+=0);
  var avgN = 0;
  score.map(item => (item.Semester !== student?.Current_Semester) ? avgN += item.Number_Of_Credits : avgN += 0);
  var avgScoreSemester = avgScore/avgN;
  var avgScores = ((Math.round((avgFinalScore/avgNumberofCredis)*100)/100)/avgScoreSemester- 1)*100;
  var iconCredisSS;
  if(avgScores>=0)
  {
    iconCredisSS = <MaterialCommunityIcons name="arrow-up" color = "rgb(80, 250, 123)" size={22}/>
  }
  else{
    iconCredisSS = <MaterialCommunityIcons name="arrow-down" color= "rgb(190 11 53)" size={22}/>
  }
  return (
    <ScrollView style = {style.Suggest}>
        <View style = {style.title}>
                <Ionicons name="settings-outline" size={22} color = "#fff" style = {{marginTop : 8,marginLeft : 10}}/>
                <Text style = {{fontSize : 20, color : "#fff",marginTop : 5}}> Danh mục thống kê</Text>
        </View>
        <View style={style.conTactCard}>
            <Text style = {style.TextInfor}>Thông tin cá Nhân</Text>
            <View style  = {style.infor}>
                <View style={{ marginLeft: 15 }}>
                    <Image
                        style={style.image}
                        source={{
                    uri: student?.Image,
                    }}
                    ></Image>
                </View>
                <View style={style.user}>
                    <Text style={style.textuser}>Họ và tên : {student?.FullName}</Text>
                    <Text style={style.textuser}>Khoa : {student?.Khoa}</Text>
                </View>
            </View>
            <View style = {style.contactInfor}>
                <Text style = {style.contact}>Chi tiết liên hệ</Text>
                <View style = {style.userShowInfor}>
                    <MaterialCommunityIcons name="account" size={22} color = "rgb(189, 147, 249)"/>
                    <Text style = {style.userShowInForText}>Mã sinh viên : {student?.Student_Id}</Text>
                </View>
                <View style = {style.userShowInfor}>
                    <MaterialCommunityIcons name="email" size={22} color = "rgb(189, 147, 249)"/>
                    <Text style = {style.userShowInForText}>Email : {student?.Email}</Text>
                </View>
                <View style = {style.userShowInfor}>
                    <FontAwesome name="address-book" size={22} color = "rgb(189, 147, 249)"/>
                    <Text style = {style.userShowInForText}>Địa chỉ : {student?.Address}</Text>
                </View>
                <View style = {style.userShowInfor}>
                    <MaterialCommunityIcons name="phone" size={22} color = "rgb(189, 147, 249)"/>
                    <Text style = {style.userShowInForText}>Số điện thoại : {student?.Phone}</Text>
                </View>
                <View style = {style.userShowInfor}>
                    <MaterialCommunityIcons name="square-edit-outline" size={22} color = "rgb(189, 147, 249)"/>
                    <Text style = {style.userShowInForText}>Chương trình đào tạo : {student?.Education_Program}</Text>
                </View>
                <View style = {style.userShowInfor}>
                    <MaterialCommunityIcons name="google-classroom" size={22} color = "rgb(189, 147, 249)"/>
                    <Text style = {style.userShowInForText}>Lớp : {student?.Class}</Text>
                </View>
                <View style = {style.userShowInfor}>
                    <MaterialCommunityIcons name="format-list-numbered" size={22} color = "rgb(189, 147, 249)"/>
                    <Text style = {style.userShowInForText}>Niên khóa : {student?.Study_Year}</Text>
                </View>
            </View>
        </View>
        <View style = {style.Static}>
            <View style = {style.featuredItem}>
                <View style = {style.featuredTitle}>
                    <Text style = {style.featuredText}>Số môn đã học.</Text>
                </View>
                <View style = {style.featuredResult}>
                    <Text style = {style.featuredText}>{student?.Number_Of_Subjects_Studied}</Text>
                    <MaterialCommunityIcons name="view-list-outline" size={25} color = "rgb(189, 147, 249)" style = {{marginLeft : 5}}/>
                </View>
                <View style = {style.featuredTitle}>
                    <Text style = {style.featuredText}>Trên 59 môn học.</Text>
                </View>
            </View>
            <View style = {style.featuredItem}>
                <View style = {style.featuredTitle}>
                    <Text style = {style.featuredText}>Số tín chỉ đạt được.</Text>
                </View>
                <View style = {style.featuredResult}>
                    <Text style = {style.featuredText}>{student?.Number_Of_Credits_Earned}</Text>
                    <MaterialCommunityIcons name="credit-card-check-outline" size={25} color = "rgb(189, 147, 249)" style = {{marginLeft : 5}}/>
                    <Text style = {style.featuredText}>   {Math.abs(Math.round((PercentCredis*100))/100)}% {iconCredis}</Text>
                </View>
                <View style = {style.featuredTitle}>
                    <Text style = {style.featuredText}>So với học kỳ trước.</Text>
                </View>
            </View>
        </View>
        <View style = {style.Static}>
            <View style = {style.featuredItem}>
            <View style = {style.featuredTitle}>
                    <Text style = {style.featuredText}>Số tín chỉ còn thiếu.</Text>
                </View>
                <View style = {style.featuredResult}>
                    <Text style = {style.featuredText}>{ 150 - parseInt(student?.Number_Of_Credits_Earned)}</Text>
                    <MaterialCommunityIcons name="credit-card-check-outline" size={25} color = "rgb(189, 147, 249)" style = {{marginLeft : 5}}/>
                    <Text style = {style.featuredText}>   {Math.abs(Math.round((PercentCredisDP*100))/100)}% {iconCredisDP}</Text>
                </View>
                <View style = {style.featuredTitle}>
                    <Text style = {style.featuredText}>So với học kỳ trước.</Text>
                </View>
            </View>
            <View style = {style.featuredItem}>
                <View style = {style.featuredTitle}>
                    <Text style = {style.featuredText}>Điểm TB tích lũy.</Text>
                </View>
                <View style = {style.featuredResult}>
                    <Text style = {style.featuredText}>{student?.GPA}</Text>
                    <MaterialCommunityIcons name="format-list-numbered" size={25} color = "rgb(189, 147, 249)" style = {{marginLeft : 5}}/>
                    <Text style = {style.featuredText}>   {Math.abs(Math.round((avgScores*100))/100)}% {iconCredisSS}</Text>
                </View>
                <View style = {style.featuredTitle}>
                    <Text style = {style.featuredText}>So với học kỳ trước.</Text>
                </View>
            </View>
        </View>
        <View style = {style.StaticSubjectScore}>
            <Text style = {{marginLeft : 10, color : "rgb(255, 121, 198)", fontSize : 18, marginTop : 10}}>Top 10 môn học có điểm trung bình cao nhất</Text>
            <View style={style.container}>
                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        <Row data={arr} style={style.head} textStyle={style.textHeader}/>
                        <Row data="" style = {style.TextTitleSemester} textStyle = {style.TextTitleSemester}/>
                        <Rows data={arrayTop10SubjectScore.slice(0,10)} style = {style.data} textStyle={style.text}/>
                    </Table>
                </View>
        </View>
    </ScrollView>
  );
}
const style = StyleSheet.create({
  Suggest: {
    backgroundColor: "#414360",
  },
  conTactCard: {
    width: "96%",
    height: "auto",
    backgroundColor: "#1F2739",
    padding: 5,
    shadowColor: "black",
    shadowColor: '#FF99FF',
    shadowOffset: {width: -2, peak: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginLeft : 8,
    marginTop : 10,
    borderRadius : 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  user: {
    marginLeft: 20,
  },
  TextInfor: {
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 2,
    color : "#185875",
    marginLeft: 15,
  },
  textuser : {
    fontSize: 20,
    paddingBottom: 2,
    color : "#A7A1AE",
  },
  infor : {
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
  contactInfor: {
    marginTop: 20,
  },
  contact : {
    marginLeft: 15,
    fontSize: 20,
    color : "yellowgreen",
  },
  userShowInfor: {
    marginTop: 5,
    marginLeft: 10,
    flexDirection: "row",
  },
  userShowInForText : {
    marginLeft : 5,
    fontSize: 16,
    color : "#A7A1AE"
  },
  Static : { 
    flexDirection : "row",
  },
  featuredItem :{
    backgroundColor : "#1F2739",
    borderRadius : 10,
    marginTop : 10,
    width : "47%",
    height : "auto",
    marginLeft : 8,
  },
  featuredTitle : {
    marginLeft : 10,
  },
  featuredText : {
    color : "#A7A1AE",
    fontSize : 18,
  },
  featuredResult : {
    flexDirection : "row",
    marginLeft : 10,
  },
  StaticSubjectScore : {
    backgroundColor : "#1F2739",
    borderRadius : 10,
    marginTop : 10,
    width : "96%",
    height : "auto",
    marginLeft : 8,
  },
  head: { 
    height: 80,
    backgroundColor: '#1F2739', 
  },
  text: { 
    color : "#A7A1AE",
    margin: 6 ,
    textAlign : "center",
  },
  TextTitleSemester : {
    backgroundColor : "white",
    color : "#185875",
  },
  textHeader : {
    color : "rgb(80, 250, 123)",
    margin: 6 ,
    textAlign : "center",
  },
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 10, 
    backgroundColor: '#1F2739',
    marginBottom : 10
  },
  text: { 
    color : "#A7A1AE",
    margin: 6 ,
    textAlign : "center",
  },
  title : {
    backgroundColor : "#07689F", 
    width : "96%",
    height : 40, 
    marginTop : 10,
    marginLeft : 8,
    borderRadius : 10,
    flexDirection : "row"
  },
});
