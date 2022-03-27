import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
  } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Table, Row, Rows } from 'react-native-table-component';
import {useSelector} from "react-redux"
export default function SuggestSubjectSemester() {
    // set width of table auto scroll
    const width = [40,200,80,80,90,90,80,80]
    // get data from redux
    const user = useSelector((state) => state?.StudentsAccount?.StudentsAccountApi.data[0]);
    const subjects = useSelector((state) => state.Subjects.SubjectsApi.data);
    // declare data for table
    var arr = ['STT','Tên MH','Mã MH','Tín Chỉ','Ngày BĐ','Ngày KT','Lý Thuyết','Thực Hành'];
    var SubgestSubjectSemester = ['  Gợi ý môn học cho học kỳ tới.'];
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
        <ScrollView style = {{backgroundColor : "#414360"}} >
            <View style = {{backgroundColor : "#414360"}}>
                <View style = {styles.title}>
                    <Ionicons name="settings-outline" size={22} color = "#fff" style = {{marginTop : 8,marginLeft : 10}}/>
                    <Text style = {{fontSize : 20, color : "#fff",marginTop : 5}}> Gợi ý môn học cho học kỳ tới</Text>
                </View>
                <View style = {{backgroundColor : "#1F2739",width : "96%", marginTop : 10, marginLeft : 8,borderRadius : 10}}>
                <Text style = {{fontSize : 18, textAlign : "center", marginTop : 20, color : "rgb(255, 121, 198)"}}>Gợi ý môn học cho học kỳ tới.</Text>
                    <View style={styles.container}>
                        <ScrollView horizontal>
                            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                <Row data={arr} style={styles.head} textStyle={styles.textHeader} widthArr = {width}/>
                                <Row data={SubgestSubjectSemester} style = {styles.TextTitleSemester} textStyle = {styles.TextTitleSemester}/>
                                <Rows data={arraySubject} style = {styles.data} textStyle={styles.text} widthArr = {width}/>
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
        borderRadius: 10,
        marginBottom : 10
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
        backgroundColor : "#20232a",
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