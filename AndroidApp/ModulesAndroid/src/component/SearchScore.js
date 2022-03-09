import React, {useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectScoreClassApiAsync } from "../Api/SubjectScoreClassApi";

export default function SearchSchudele({ route }) {
  const { keyWord } = route.params;
  const { loading } = useSelector((state) => state.SubjectScoreClass.SubjectScoreClassApi.loading);
  const data = useSelector((state) => state.SubjectScoreClass.SubjectScoreClassApi.data.filter(item => item.Email === keyWord || item.Email.slice(0,13) === keyWord));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubjectScoreClassApiAsync());
  }, [dispatch]);
  if (loading) {
    return (
      <ActivityIndicator size="large" color="#00ff00" style={style.loading} />
    );
  } 
  else
  return (
      <ScrollView>
        <View style={style.titleBox}>
          <Text style={style.title}>Hệ Thống Tra Cứu Điểm Thi.</Text>
          <Text style={style.keyword}>Từ Khóa: {keyWord}</Text>
        </View>
        <View style={style.ListDataBox}>
          {data.map((item, index) => {
            return (
              <View style={style.DataBox} key={index}>
                <Text style={style.fieldText}>Mã Môn Học : {item?.Subject_Id}</Text>
                <Text style={style.fieldText}>Mã Lớp Học : {item?.Class_Subject_Id}</Text>
                <Text style={style.fieldText}>
                  Tên Môn Học : {item?.Subject_Name}
                </Text>
                <Text style={style.fieldText}>
                Chương Trình Đào Tạo : {item?.Education_Program}
                </Text>
                <Text style={style.fieldText}>
                  Tín Chỉ : {item?.Number_Of_Credits}
                </Text>
                <Text style={style.fieldText}>Học Kỳ : {item?.Semester}</Text>
                <Text style={style.fieldText}>
                  Điểm Qúa Trình : {item?.Process_Score}
                </Text>
                <Text style={style.fieldText}>
                  Điểm Thi : {item?.Final_Exam_Score}
                </Text>
                <Text style={style.fieldText}>
                  Điểm Tổng : {item?.Final_Score}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
}
const style = StyleSheet.create({
  title : {
    color : "blue",
    fontSize : 25,
    textAlign : "center",
  },
  titleBox: {
    backgroundColor: "#3c96ff",
    width: "100%",
    padding: 10,
  },
  keyword: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  ListDataBox: {
    backgroundColor: "#3c96ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "scroll",
  },
  DataBox: {
    borderColor: "gray",
    borderWidth: 1,
    shadowColor: "black",
    width: 350,
    height: 250,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    backgroundColor : "#2dfbff",
    elevation: 12,
  },
  fieldText: {
    paddingBottom: 5,
    fontWeight: "bold",
  },
});
