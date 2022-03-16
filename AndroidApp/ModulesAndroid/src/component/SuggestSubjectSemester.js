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
export default function SuggestSubjectSemester() {
    // get data from redux
    const user = useSelector((state) => state?.StudentsAccount?.StudentsAccountApi.data[0]);
    const subjects = useSelector((state) => state.Subjects.SubjectsApi.data);
    // declare data for table
    var arr = ['STT','Tên MH','Mã MH','Tín Chỉ','Ngày BĐ','Ngày KT','Lý Thuyết','Thực Hành'];
    var SubgestSubjectSemester = ['Gợi ý môn học cho học kỳ tới.'];
    // get data for table
    let Semester = user?.Current_Semester.slice(0,2) + (parseInt(user?.Current_Semester.slice(2,3)) + 1);
    const data = subjects.filter(item => item.Semester=== Semester);
    var arraySubject = [];
    // get subject debt
    for(let i = 0;i<data.length;i++)
    {
        arraySubject.push([
            i+1,
            data[i].Subject_Name,
            data[i].Subject_Id,
            data[i].Number_Of_Credits,
            data[i].Start_Time.slice(0,10),
            data[i].End_Time.slice(0,10),
            data[i].Theory,
            data[i].Practice
        ]);
    };
    return (
        <ScrollView>
            <View style = {styles.title}>
                <Ionicons name="settings-outline" size={22} color = "#fff" style = {{marginTop : 8,marginLeft : 10}}/>
                <Text style = {{fontSize : 20, color : "#fff",marginTop : 5}}> Gợi ý môn học cho học kỳ tới</Text>
            </View>
            <View style = {{backgroundColor : "#1F2739",width : "99%", marginTop : 5, marginLeft : 2}}>
                <View style={styles.container}>
                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        <Row data={arr} style={styles.head} textStyle={styles.textHeader}/>
                        <Row data={SubgestSubjectSemester} style = {styles.TextTitleSemester} textStyle = {styles.TextTitleSemester}/>
                        <Rows data={arraySubject} style = {styles.data} textStyle={styles.text}/>
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