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
    // set width of table auto scroll
    const width = [40,200,80,80,90,90,80,80]
    // get data from redux
    const subject = useSelector((state) => state.SubjectScore.SubjectScoreApi.data);
    const subjects = useSelector((state) => state.Subjects.SubjectsApi.data);
    // declare data for table
    var arr = ['STT','Tên Môn học','Mã MH','Tín Chỉ','Ngày BĐ','Ngày KT','Lý Thuyết','Thực Hành'];
    var SubgestSubjectDebt = ['  Gợi ý môn học lại.'];
    var SubgestSubjectLevel = ['  Gợi ý môn học theo cấp độ.'];
    // get data for table
    const data = subject.filter(item => item.Final_Score < 5);
    var arraySubject = [];
    // get subject debt
    for(let i = 0;i<subjects.length;i++)
    {
      for(let j = 0 ;j < data.length;j++)
      {
        if(subjects[i].Subject_Id === data[j].Subject_Id){
            arraySubject.push(subjects[i]);
        }
      }
    };
    var arraySubjectDebt = [];
    for(let i = 0;i<arraySubject.length;i++)
    {
        arraySubjectDebt.push([
            i+1,
            arraySubject[i].Subject_Name,
            arraySubject[i].Subject_Id,
            arraySubject[i].Number_Of_Credits,
            arraySubject[i].Start_Time.slice(0,10),
            arraySubject[i].End_Time.slice(0,10),
            arraySubject[i].Theory,
            arraySubject[i].Practice
        ]);
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
        <ScrollView style = {{backgroundColor : "#414360"}}>
            <View style = {{backgroundColor : "#414360"}}>
                <View style = {styles.title}>
                    <Ionicons name="settings-outline" size={22} color = "#fff" style = {{marginTop : 8,marginLeft : 10}}/>
                    <Text style = {{fontSize : 20, color : "#fff",marginTop : 5}}> Gợi ý môn học</Text>
                </View>
                <View style = {{backgroundColor : "#1F2739",width : "96%", marginTop : 10, marginLeft : 8,borderRadius : 10}}>
                <Text style = {{fontSize : 18, textAlign : "center", marginTop : 20, color : "rgb(255, 121, 198)"}}>Gợi ý môn học lại và môn học theo cấp độ.</Text>
                    <View style={styles.container}>
                        <ScrollView horizontal>
                            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                <Row data={arr} style={styles.head} textStyle={styles.textHeader} widthArr = {width}/>
                                <Row data={SubgestSubjectDebt} style = {styles.TextTitleSemester} textStyle = {styles.TextTitleSemester}/>
                                <Rows data={arraySubjectDebt} style = {styles.data} textStyle={styles.text} widthArr = {width}/>
                                <Row data={SubgestSubjectLevel} style = {styles.TextTitleSemester} textStyle = {styles.TextTitleSemester}/>
                                <Rows data={arraySubjectLevel} style = {styles.data} textStyle={styles.text} widthArr = {width}/>
                            </Table>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    title : {
        backgroundColor : "#07689F", 
        width : "96%",
        marginLeft : 8,
        height : 40, 
        flexDirection : "row",
        borderRadius : 10,
        marginTop : 10
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
        borderRadius : 10
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
        backgroundColor : "#1F2739",
        color : "rgb(189, 147, 249)",
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