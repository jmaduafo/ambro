import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../constant/default";
import PopularCategories from "../components/Home/PopularCategories";
import TopDisplay from "../components/Home/TopDisplay";
import NewRecipes from "../components/Home/NewRecipes";
import SearchEngine from "../components/SearchEngine";
import ForYou from "../components/Home/ForYou";
import { greeting } from "../utils/greeting";
import { StatusBar } from "expo-status-bar";
import { auth, db } from "../firebase/config";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const [date, setDate] = useState("");
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation()
  const time = new Date();

  function getUser() {
    setLoading(true);
    const userRef = query(collection(db, "users"), where("id", "==", auth?.currentUser?.uid));

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

  useEffect(
    function () {
      setDate(greeting());
    },
    [time.getHours()]
  );

  useEffect(function () {
    getUser();
  }, []);

  return (
    <View style={styles.background}>
      <SafeAreaView>
        <StatusBar style="auto" />
        <View style={styles.intro}>
          {loading ? (
            <ActivityIndicator color={COLORS.backgroundFull} />
          ) : (
            userInfo?.map(user => {
              return (
              <View key={user.id}>
                <Text
                  style={[
                    styles.openingText,
                    { marginTop: 20, marginBottom: -10 },
                  ]}
                >
                  Good {date},
                </Text>
                <Text style={styles.openingText}>{user.name}</Text>
              </View>
              )
            })
          )}
          <TouchableOpacity
            style={styles.profileContainer}
            onPress={() => navigation.navigate("Profile")}
          >
            <View style={styles.profile}></View>
          </TouchableOpacity>
        </View>
        <SearchEngine
          marginTop={20}
          marginBottom={0}
          placeholderText={"What would you like to cook today?"}
        />
      </SafeAreaView>
      <View style={styles.mainSection}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        >
          <PopularCategories />
          <TopDisplay />
          <ForYou navigate={navigate}/>
          <NewRecipes navigate={navigate}/>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.textColorFull,
    flex: 1,
  },
  intro: {
    display: "flex",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    gap: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profile: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    backgroundColor: "#fff",
  },
  openingText: {
    fontFamily: "Boska-Medium",
    fontSize: 36,
    color: COLORS.backgroundFull,
  },
  mainSection: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: COLORS.backgroundFull,
    marginTop: 20,
    // paddingLeft: 30,
    paddingRight: 0,
    flex: 1,
  },
});
