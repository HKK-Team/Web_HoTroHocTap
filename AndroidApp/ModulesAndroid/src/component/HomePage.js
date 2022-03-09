import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as Google from "expo-google-app-auth";
import React, {useEffect, Fragment, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
const style = StyleSheet.create({
  ViewBox: {
    backgroundColor: "#2dfbff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  TextBox: {
    paddingBottom: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#808080",
    textAlign: "center",
  },
  InputBox: {
    marginBottom: 10,
  },
  input: {
    width: 265,
    height: 40,
    padding: 10,
    borderBottomWidth: 2,
    marginBottom: 3,
  },
  button: {
    width: 265,
    borderRadius: 25,
    padding: 5,
  },
  buttonLogin: {
    width: 245,
    borderRadius: 25,
  },
});

export default function HomePage() {
  const navigation = useNavigation();
  const [keyWord, SetKeyWord] = useState(null);
  const [loginClick, SetLoginClick] = useState(false);

  const handleGoogleLogin = () => {
    SetLoginClick(true);
    const config = {
      androidClientId: `430133284141-aripstm3g93ktpocm2mv473sgiaj34c0.apps.googleusercontent.com`,
      scopes: [`profile`, `email`],
    };

    Google.logInAsync(config)
      .then((result) => {
        const { type, user, accessToken, idToken } = result;
        const users = {
          email: user.email,
          fullName: user.name,
          firstName: user.familyName,
          lastName: user.givenName,
          ID: user.id,
          image: user.photoUrl,
          accessToken: accessToken,
          token_ID: idToken,
          Api: "Google",
        };
        let reg = /^([0-9]{13})+@student.tdmu.edu.vn$/i;
        if (type === "success" && reg.test(users.email)) {
          axios
            .post("http://10.0.2.2:5000/lecturer/login", {
              ...users,
            })
            .then((res) => {
              async function saveDataUser() {
                try {
                  await AsyncStorage.setItem("UserLogin", `${true}`);
                  await AsyncStorage.setItem("UserEmail", `${users.email}`);
                } catch (error) {
                  Alert.alert(error);
                  SetLoginClick(false);
                }
              }
              saveDataUser();
              navigation.navigate("Menu");
            });
        } else {
          Alert.alert("Vui lòng sử dụng Email của bạn trong trường TDMU");
          SetLoginClick(false);
        }
      })
      .catch((err) => {
        Alert.alert(err);
        SetLoginClick(false);
      });
  };
  useEffect (() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
      webClientId: '990906598560-db6e2i5h2q4odjj10hjtqliuc81vap7g.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      //hostedDomain: '', // specifies a hosted domain restriction
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      //accountName: '', // [Android] specifies an account name on the device that should be used
      //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
  },[]);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // this.setState({ userInfo });
      console.log(userInfo);
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  return (
    <Fragment>
      <View style={style.ViewBox}>
        <View style={style.TextBox}>
          <Text style={style.title}>Hệ Thống Tra cứu Điểm Thi.</Text>
          <Text style={style.title}>Đại học Thủ Dầu Một</Text>
        </View>
        <View style={style.InputBox}>
          <TextInput
            style={style.input}
            value={keyWord}
            onChange={(e) => SetKeyWord(e.nativeEvent.text)}
            placeholder="Mã sinh viên hoặc email..."
          />
          <Button
            title="Tìm"
            style={style.button}
            onPress={() => {
              if (keyWord !== null) {
                navigation.navigate("Xem Điểm Thi", {
                  keyWord: keyWord
                });
              } else {
                Alert.alert("Thông báo", "Bạn chưa nhập từ khóa");
              }
            }}
          />
        </View>
        <Text>OR</Text>
        <Text>
          <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
          />;
          </Text>
      </View>
    </Fragment>
  );
}