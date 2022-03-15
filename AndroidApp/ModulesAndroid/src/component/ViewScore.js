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
export default function ViewScore() {
    var arr = ['Tên MH','Mã MH','Tín Chỉ','Điểm QT','Điểm Thi','Điểm Tổng'];
    var ar = ['Bảng điểm học kỳ 1.'];
    return (
        <ScrollView>
            <View style = {styles.title}>
                <Ionicons name="settings-outline" size={22} color = "#fff" style = {{marginTop : 8,marginLeft : 10}}/>
                <Text style = {{fontSize : 20, color : "#fff",marginTop : 5}}> Xem Điểm</Text>
            </View>
            <View style = {{backgroundColor : "#1F2739",width : "99%", marginTop : 5, marginLeft : 2}}>
                <Text style = {{fontSize : 18, marginLeft: 2, marginTop : 5, color : "yellowgreen"}}>Bảng điểm môn học tính tới thời điểm hiện tại.</Text>
                <View style={styles.container}>
                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        <Row data={arr} style={styles.head} textStyle={styles.text}/>
                        <Row data={ar} style = {{backgroundColor : "#2C3446"}} textStyle = {{color : "#4292b8"}}/>
                        <Rows data="" textStyle={styles.text}/>
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
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#1F2739' },
    head: { height: 60, backgroundColor: '#f1f8ff',color : "white" },
    text: { margin: 6 }
});