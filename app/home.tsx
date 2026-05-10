import { supabase } from "@/services/supabase";
import { CoffeeShop } from "@/types";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Home() {
  //สร้าง State เพื่อเก็บข้อมูลที่ดึงมาจาก Supabase
  //และนำไปใช้กับ Component ที่จะเอาข้อมูลไปแสดงบนหน้าจอ
  const [shops, setShops] = useState<CoffeeShop[]>([]);

  //พอหน้าจอ Render แล้ว ให้ดึงข้อมูลจาก Supabase
  useEffect(() => {
    //ดึงข้อมูลจาก Supabase และนําไปเก็บใน State -> shops
    //สร้างเป็นฟังก์ชันดึง
    const fetchShops = async () => {
      //ดึงจาก supabase
      const { data, error } = await supabase
        .from("coffee_shop_tb")
        .select("*")
        .order("name", { ascending: true });

      //หลังจากดึง ตรวจสอบว่ามี error ไหม
      if (error) {
        Alert.alert("คำเตือน", "พบปัญหาในการดึงข้อมูล กรุณาลองใหม่อีกครั้ง");
        return;
      }

      //ถ้าไม่มี error ให้นําข้อมูลที่ดึงไปเก็บใน State -> shops
      setShops(data as CoffeeShop[]);
    };

    //เรียกฟังก์ชันดึงให้ทำงาน
    fetchShops();
  }, []);

  //ฟังก์ชันที่สร้างหน้าตาของแต่ละรายการสำหรับ FlatList
  const showListShops = ({ item }: { item: CoffeeShop }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/detail",
          params: {
            name: item.name,
            district: item.district,
            description: item.description,
            image_url: item.image_url,
            phone: item.phone,
            latitude: item.latitude,
            longitude: item.longitude,
          },
        })
      }
      style={styles.cardSty}
    >
      <Image
        source={{ uri: item.image_url }}
        style={{ width: 100, height: 100, borderRadius: 10 }}
      />

      <View style={{ marginLeft: 10 }}>
        <Text style={styles.txtSty1}>{item.name}</Text>
        <Text style={styles.txtSty2}>📍{item.district}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={shops}
        keyExtractor={(item) => item.id}
        renderItem={showListShops}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  txtSty1: {
    fontFamily: "Kanit_700Bold",
    fontSize: 15,
  },
  txtSty2: {
    fontFamily: "Kanit_400Regular",
    color: "#747474",
  },
  cardSty: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "#E6F4FE",
  },
});
