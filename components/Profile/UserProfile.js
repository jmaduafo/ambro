import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import UserPage from "../UserPage";
import { auth, db } from "../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { COLORS } from "../../constant/default";
import { useNavigation } from "@react-navigation/native";
import generalStyles from "../../constant/generalStyles";

const UserProfile = () => {
  const { navigate } = useNavigation()

  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(false);

  function getUser() {
    setLoading(true);
    const userRef = query(
      collection(db, "users"),
      where("id", "==", auth?.currentUser?.uid)
    );

    async function username() {
      const userSnap = await getDocs(userRef);

      let user = [];
      userSnap.forEach((doc) => {
        user.push(doc.data());
      });
      setUserInfo(user);
    }

    username();
    setLoading(false);
  }

  useEffect(function () {
    getUser();
  }, [auth]);
  
  return (
    <>
      {!loading && userInfo ? userInfo?.map((profile) => {
        return (
        <View key={profile.id} style={{ flex: 1 }}>
            <UserPage
              user={profile}
              type={'user'}
              navigate={navigate}
            />
        </View>
        );
      })
      :
      <View style={generalStyles.default}>
        <ActivityIndicator color={COLORS.textColorFull}/>
      </View>
        }
    </>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
