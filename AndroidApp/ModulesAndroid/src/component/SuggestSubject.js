import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    ScrollView,
  } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Table, Row, Rows } from 'react-native-table-component';
import {useSelector} from "react-redux"
export default function SuggestSubject() {
    // get data from redux
    const subject = useSelector((state) => state.SubjectScore.SubjectScoreApi.data);
    const subjects = useSelector((state) => state.Subjects.SubjectsApi.data);
    // declare data for table
    var arr = ['STT','Tên MH','Mã MH','Tín Chỉ','Ngày BĐ','Ngày KT','Lý Thuyết','Thực Hành'];
    var SubgestSubjectDebt = ['Gợi ý môn học lại.'];
    var SubgestSubjectLevel = ['Gợi ý môn học theo cấp độ.'];
    // get data for table
    const data = subject.filter(item => item.Final_Score < 5);
    var arraySubject = [];
    // get subject debt
    for(let i = 0;i<subjects.length;i++)
    {
      for(let j = 0 ;j < data.length;j++)
      {
        if(subjects[i].Subject_Id === data[j].Subject_Id){
            arraySubject.push([
                i+1,
                subjects[i].Subject_Name,
                subjects[i].Subject_Id,
                subjects[i].Number_Of_Credits,
                subjects[i].Start_Time.slice(0,10),
                subjects[i].End_Time.slice(0,10),
                subjects[i].Theory,
                subjects[i].Practice
            ]);
        }
      }
    };
    // Suggest subject with level
    var SubjectsPass = subject.filter(item => item.Final_Score>5);
    var SuggestSP = [];
    for(let i = 0;i<subjects.length;i++)
    {
      for(let j = 0;j<SubjectsPass.length;j++)
      {
        if(subjects[i].Subject_Id === SubjectsPass[j].Id_Next_Subject)
        {
          SuggestSP.push(subjects[i]);
        }
      }
    };
    // tìm ra môn học theo cấp độ với điều kiện môn học đã đạt được và môn học đã qua môn
    var arraySubjectSp = SuggestSP.filter(item => !SubjectsPass.map(sj => sj.Subject_Id).includes(item.Subject_Id));
    var arSubjectSP = arraySubjectSp.filter(item => !data.map(sj => sj.Subject_Id).includes(item.Subject_Id));
    var arraySubjectLevel = [];
    for(let i = 0;i<arSubjectSP.length;i++){
        arraySubjectLevel.push([
            i+1,
            arSubjectSP[i].Subject_Name,
            arSubjectSP[i].Subject_Id,
            arSubjectSP[i].Number_Of_Credits,
            arSubjectSP[i].Start_Time.slice(0,10),
            arSubjectSP[i].End_Time.slice(0,10),
            arSubjectSP[i].Theory,
            arSubjectSP[i].Practice
        ])
    }
    return (
        <ScrollView>
            <View style = {styles.title}>
                <Ionicons name="settings-outline" size={22} color = "#fff" style = {{marginTop : 8,marginLeft : 10}}/>
                <Text style = {{fontSize : 20, color : "#fff",marginTop : 5}}> Gợi ý môn học</Text>
            </View>
            <View style = {{backgroundColor : "#1F2739",width : "99%", marginTop : 5, marginLeft : 2}}>
                <View style={styles.container}>
                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        <Row data={arr} style={styles.head} textStyle={styles.textHeader}/>
                        <Row data={SubgestSubjectDebt} style = {styles.TextTitleSemester} textStyle = {styles.TextTitleSemester}/>
                        <Rows data={arraySubject} style = {styles.data} textStyle={styles.text}/>
                        <Row data={SubgestSubjectLevel} style = {styles.TextTitleSemester} textStyle = {styles.TextTitleSemester}/>
                        <Rows data={arraySubjectLevel} style = {styles.data} textStyle={styles.text}/>
                    </Table>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    title : {
        backgroundColor : "#07689F", 
        width : "99%",
        height : 40, 
        marginLeft : 2,
        flexDirection : "row"
    },
    textHeader : {
        color : "white",
        margin: 6 ,
        textAlign : "center",
    },
    container: { 
        flex: 1, 
        padding: 16, 
        paddingTop: 30, 
        backgroundColor: '#1F2739'
    },
    head: { 
        height: 80,
        backgroundColor: '#20232a', 
    },
    text: { 
        color : "#A7A1AE",
        margin: 6 ,
        textAlign : "center",
    },
    TextTitleSemester : {
        backgroundColor : "#20232a",
        color : "white",
    },
    titleSemester: { 
        color : "#A7A1AE",
        textAlign : "left",
        fontSize : 15
    },
    row: {
        backgroundColor : "#20232a",
    },
});