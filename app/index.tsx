import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  useEffect(() => {
    setTimeout(() => {
      router.replace("/home");
      // ทำสิ่งที่ต้องการหลังจากหน่วงเวลา
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      {/* แสดงรูปกาแฟ */}
      <Image
        source={require("@/assets/images/coffeeshop.png")}
        style={styles.imgSty}
      />

      {/* ชื่อแอป */}
      <Text style={styles.txtSty1}>TOP BKK COFFEE</Text>

      {/* ข้อความทั่วไป */}
      <Text style={styles.txtSty2}>ที่สุดของร้านกาแฟในกรุงเทพฯ</Text>

      <ActivityIndicator
        size="large"
        color="#4f1c02"
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  txtSty2: {
    fontFamily: "Kanit_400Regular",
    color: "#747474",
  },
  txtSty1: {
    fontFamily: "Kanit_700Bold",
    fontSize: 30,
    marginTop: 20,
    color: "#4f1c02",
  },
  imgSty: {
    width: 150,
    height: 150,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
