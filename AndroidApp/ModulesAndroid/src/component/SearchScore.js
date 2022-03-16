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

export default function SearchSubjectScore({ route }) {
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
                  Điểm Quá Trình : {item?.Process_Score}
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
    color : "#a697ce",
    fontSize : 25,
    textAlign : "center",
  },
  titleBox: {
    backgroundColor: "#20232a",
    width: "100%",
    padding: 10,
  },
  keyword: {
    color: "#a697ce",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  ListDataBox: {
    backgroundColor: "#20232a",
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
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,

    shadowColor: '#FF99FF',
    shadowOffset: {width: -2, peak: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    backgroundColor : "#1F2739",
    elevation: 12,
  },
  fieldText: {
    color : "#A7A1AE",
    paddingBottom: 5,
    fontWeight: "bold",
  },
});
