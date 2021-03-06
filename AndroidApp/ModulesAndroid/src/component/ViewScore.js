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
export default function ViewScore() {
    // set width of table auto scroll
    const width = [40,200,80,80,80,80,80,80]
    // get data from redux
    const user = useSelector((state) => state?.StudentsAccount?.StudentsAccountApi.data[0]);
    const subject = useSelector((state) => state.SubjectScore.SubjectScoreApi.data);
    // declare data for table
    var tableData = [`    - Thông kê ĐTBTL của sinh viên ${user?.FullName}.
    - Điểm trung bình tích lũy : ${user?.GPA}
    - Số tín chỉ đã học : ${user?.Number_Of_Credits_Earned} chỉ.
    - Số tín chỉ còn thiếu : ${150 - parseInt(user?.Number_Of_Credits_Earned)} chỉ.`];
    var arr = ['STT','Tên Môn học','Mã MH','Tín Chỉ','Điểm QT','Điểm Thi','Điểm Tổng','Kết Quả'];
    var HK1 = [`  Bảng điểm HKI năm học ${user?.Study_Year.slice(0,4)} - ${parseInt(user?.Study_Year.slice(0,4))+1}`];
    var HK2 = [`  Bảng điểm HKII năm học ${user?.Study_Year.slice(0,4)} - ${parseInt(user?.Study_Year.slice(0,4))+1}`];
    var HK3 = [`  Bảng điểm HKIII năm học ${parseInt(user?.Study_Year.slice(0,4))+1} - ${parseInt(user?.Study_Year.slice(0,4))+2}`];
    var HK4 = [`  Bảng điểm HKIV năm học ${parseInt(user?.Study_Year.slice(0,4))+1} - ${parseInt(user?.Study_Year.slice(0,4))+2}`];
    var HK5 = [`  Bảng điểm HKV năm học ${parseInt(user?.Study_Year.slice(0,4))+1} - ${parseInt(user?.Study_Year.slice(0,4))+2}`];
    var HK6 = [`  Bảng điểm HKVI năm học ${parseInt(user?.Study_Year.slice(0,4))+2} - ${parseInt(user?.Study_Year.slice(0,4))+3}`];
    var HK7 = [`  Bảng điểm HKVII năm học ${parseInt(user?.Study_Year.slice(0,4))+2} - ${parseInt(user?.Study_Year.slice(0,4))+3}`];
    var HK8 = [`  Bảng điểm HKVIII năm học ${parseInt(user?.Study_Year.slice(0,4))+2} - ${parseInt(user?.Study_Year.slice(0,4))+3}`];
    var HK9 = [`  Bảng điểm HKIX năm học ${parseInt(user?.Study_Year.slice(0,4))+3} - ${parseInt(user?.Study_Year.slice(0,4))+4}`];
    var HK10 = [`  Bảng điểm HKX năm học ${parseInt(user?.Study_Year.slice(0,4))+3} - ${parseInt(user?.Study_Year.slice(0,4))+4}`];
    // get data for table Hoc ky
    const data = subject.filter(item => item.Semester === "HK1");
    var arraySubject = [];
    for(let i = 0; i < data.length; i++){
        arraySubject.push([
            i+1,
            data[i].Subject_Name,
            data[i].Subject_Id,
            data[i].Number_Of_Credits,
            data[i].Process_Score,
            data[i].Final_Exam_Score,
            data[i].Final_Score,
            data[i].Final_Score >= 5 ? 'Đạt' : 'Rớt'
        ]);
    };
    const dataHK2 = subject.filter(item => item.Semester === "HK2");
    var arraySubjectHK2 = [];
    for(let i = 0; i < dataHK2.length; i++){
        arraySubjectHK2.push([
            i+1,
            dataHK2[i].Subject_Name,
            dataHK2[i].Subject_Id,
            dataHK2[i].Number_Of_Credits,
            dataHK2[i].Process_Score,
            dataHK2[i].Final_Exam_Score,
            dataHK2[i].Final_Score,
            dataHK2[i].Final_Score >= 5 ? 'Đạt' : 'Rớt'
        ]);
    };
    const dataHK3 = subject.filter(item => item.Semester === "HK3");
    var arraySubjectHK3 = [];
    for(let i = 0; i < dataHK3.length; i++){
        arraySubjectHK3.push([
            i+1,
            dataHK3[i].Subject_Name,
            dataHK3[i].Subject_Id,
            dataHK3[i].Number_Of_Credits,
            dataHK3[i].Process_Score,
            dataHK3[i].Final_Exam_Score,
            dataHK3[i].Final_Score,
            dataHK3[i].Final_Score >= 5 ? 'Đạt' : 'Rớt'
        ]);
    };
    const dataHK4 = subject.filter(item => item.Semester === "HK4");
    var arraySubjectHK4 = [];
    for(let i = 0; i < dataHK4.length; i++){
        arraySubjectHK4.push([
            i+1,
            dataHK4[i].Subject_Name,
            dataHK4[i].Subject_Id,
            dataHK4[i].Number_Of_Credits,
            dataHK4[i].Process_Score,
            dataHK4[i].Final_Exam_Score,
            dataHK4[i].Final_Score,
            dataHK4[i].Final_Score >= 5 ? 'Đạt' : 'Rớt'
        ]);
    };
    const dataHK5 = subject.filter(item => item.Semester === "HK5");
    var arraySubjectHK5 = [];
    for(let i = 0; i < dataHK5.length; i++){
        arraySubjectHK5.push([
            i+1,
            dataHK5[i].Subject_Name,
            dataHK5[i].Subject_Id,
            dataHK5[i].Number_Of_Credits,
            dataHK5[i].Process_Score,
            dataHK5[i].Final_Exam_Score,
            dataHK5[i].Final_Score,
            dataHK5[i].Final_Score >= 5 ? 'Đạt' : 'Rớt'
        ]);
    };
    const dataHK6 = subject.filter(item => item.Semester === "HK6");
    var arraySubjectHK6 = [];
    for(let i = 0; i < dataHK6.length; i++){
        arraySubjectHK6.push([
            i+1,
            dataHK6[i].Subject_Name,
            dataHK6[i].Subject_Id,
            dataHK6[i].Number_Of_Credits,
            dataHK6[i].Process_Score,
            dataHK6[i].Final_Exam_Score,
            dataHK6[i].Final_Score,
            dataHK6[i].Final_Score >= 5 ? 'Đạt' : 'Rớt'
        ]);
    };
    const dataHK7 = subject.filter(item => item.Semester === "HK7");
    var arraySubjectHK7 = [];
    for(let i = 0; i < dataHK7.length; i++){
        arraySubjectHK7.push([
            i+1,
            dataHK7[i].Subject_Name,
            dataHK7[i].Subject_Id,
            dataHK7[i].Number_Of_Credits,
            dataHK7[i].Process_Score,
            dataHK7[i].Final_Exam_Score,
            dataHK7[i].Final_Score,
            dataHK7[i].Final_Score >= 5 ? 'Đạt' : 'Rớt'
        ]);
    };
    const dataHK8 = subject.filter(item => item.Semester === "HK8");
    var arraySubjectHK8 = [];
    for(let i = 0; i < dataHK8.length; i++){
        arraySubjectHK8.push([
            i+1,
            dataHK8[i].Subject_Name,
            dataHK8[i].Subject_Id,
            dataHK8[i].Number_Of_Credits,
            dataHK8[i].Process_Score,
            dataHK8[i].Final_Exam_Score,
            dataHK8[i].Final_Score,
            dataHK8[i].Final_Score >= 5 ? 'Đạt' : 'Rớt'
        ]);
    };
    const dataHK9 = subject.filter(item => item.Semester === "HK9");
    var arraySubjectHK9 = [];
    for(let i = 0; i < dataHK9.length; i++){
        arraySubjectHK9.push([
            i+1,
            dataHK9[i].Subject_Name,
            dataHK9[i].Subject_Id,
            dataHK9[i].Number_Of_Credits,
            dataHK9[i].Process_Score,
            dataHK9[i].Final_Exam_Score,
            dataHK9[i].Final_Score,
            dataHK9[i].Final_Score >= 5 ? 'Đạt' : 'Rớt'
        ]);
    };
    const dataHK10 = subject.filter(item => item.Semester === "HK10");
    var arraySubjectHK10 = [];
    for(let i = 0; i < dataHK10.length; i++){
        arraySubjectHK10.push([
            i+1,
            dataHK10[i].Subject_Name,
            dataHK10[i].Subject_Id,
            dataHK10[i].Number_Of_Credits,
            dataHK10[i].Process_Score,
            dataHK10[i].Final_Exam_Score,
            dataHK10[i].Final_Score,
            dataHK10[i].Final_Score >= 5 ? 'Đạt' : 'Rớt'
        ]);
    };
    return (
        <ScrollView>
            <View style = {{backgroundColor : "#414360"}}>
                <View style = {styles.title}>
                    <Ionicons name="settings-outline" size={22} color = "#fff" style = {{marginTop : 8,marginLeft : 10}}/>
                    <Text style = {{fontSize : 20, color : "#fff",marginTop : 5}}> Xem Điểm</Text>
                </View>
                <View style = {{backgroundColor : "#1F2739",width : "96%", marginTop : 10, marginLeft : 8,borderRadius : 10}}>
                    <Text style = {{fontSize : 18, textAlign : "center", marginTop : 20, color : "rgb(255, 121, 198)"}}>Bảng điểm môn học tính tới thời điểm hiện tại.</Text>
                    <View style={styles.container}>
                        <ScrollView horizontal>
                            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                <Row data={arr} style={styles.head} textStyle={styles.textHeader} widthArr = {width}/>
                                <Row data={HK1} style = {styles.TextTitleSemester} textStyle = {styles.TextTitleSemester}/>
                                <Rows data={arraySubject} style = {styles.data} textStyle={styles.text} widthArr = {width}/>
                                <Row data={HK2} style = {styles.TextTitleSemester} textStyle = {styles.TextTitleSemester} />
                                <Rows data={arraySubjectHK2} style = {styles.data} textStyle={styles.text} widthArr = {width}/>
                                <Row data={HK3} style = {styles.TextTitleSemester} textStyle = {styles.TextTitleSemester} />
                                <Rows data={arraySubjectHK3} style = {styles.data} textStyle={styles.text} widthArr = {width}/>
                                <Row data={HK4} style = {styles.TextTitleSemester} textStyle = {styles.TextTitleSemester} />
                                <Rows data={arraySubjectHK4} style = {styles.data} textStyle={styles.text} widthArr = {width}/>
                                <Row data={HK5} style = {styles.TextTitleSemester} textStyle = {styles.TextTitleSemester} />
                                <Rows data={arraySubjectHK5} style = {styles.data} textStyle={styles.text} widthArr = {width}/>
                                <Row data={HK6} style = {styles.TextTitleSemester} textStyle = {styles.TextTitleSemester} />
                                <Rows data={arraySubjectHK6} style = {styles.data} textStyle={styles.text} widthArr = {width}/>
                                <Row data={HK7} style = {styles.TextTitleSemester} textStyle = {styles.TextTitleSemester} />
                                <Rows data={arraySubjectHK7} style = {styles.data} textStyle={styles.text} widthArr = {width}/>
                                <Row data={HK8} style = {styles.TextTitleSemester} textStyle = {styles.TextTitleSemester} />
                                <Rows data={arraySubjectHK8} style = {styles.data} textStyle={styles.text} widthArr = {width}/>
                                <Row data={HK9} style = {styles.TextTitleSemester} textStyle = {styles.TextTitleSemester} />
                                <Rows data={arraySubjectHK9} style = {styles.data} textStyle={styles.text} widthArr = {width}/>
                                <Row data={HK10} style = {styles.TextTitleSemester} textStyle = {styles.TextTitleSemester} />
                                <Rows data={arraySubjectHK10} style = {styles.data} textStyle={styles.text} widthArr = {width}/>
                                <Row data = {tableData} style = {styles.TextTitleSemester} textStyle = {styles.TextTitleSemester} />
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