import * as Linking from "expo-linking";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Detail() {
  const params = useLocalSearchParams();
  const { name, district, description, image_url, phone, latitude, longitude } =
    params;

  //  ฟังก์ชั่น โทรศัพท์
  const handleCall = () => {
    Linking.openURL(`tel:${phone}`);
  };

  //   ฟังก์ชันเปิดแผนที่
  <MapView
    style={{ height: 300, marginVertical: 20, marginHorizontal: 20 }}
    initialRegion={{
      longitude: parseFloat(longitude as string),
      latitude: parseFloat(latitude as string),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }}
  >
    <Marker
      coordinate={{
        latitude: parseFloat(latitude as string),
        longitude: parseFloat(longitude as string),
      }}
    />
  </MapView>;

  return (
    <ScrollView>
      <Image source={{ uri: image_url as string }} style={styles.coverImage} />
      <Text style={styles.nameSty}>{name}</Text>
      <Text style={styles.districtSty}>{district}</Text>
      <Text style={styles.descriptionSty}>{description}</Text>

      <TouchableOpacity style={styles.btnphoneSty} onPress={handleCall}>
        <Text style={styles.phoneSty}>📞{phone}</Text>
      </TouchableOpacity>

      <Text style={[styles.nameSty, { fontSize: 15 }]}>แผนที่ร้าน</Text>
      <MapView
        style={{ marginVertical: 20, height: 300, marginHorizontal: 20 }}
        initialRegion={{
          latitude: parseFloat(latitude as string),
          longitude: parseFloat(longitude as string),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(latitude as string),
            longitude: parseFloat(longitude as string),
          }}
          title={name as string}
        />
      </MapView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  coverImage: { width: "100%", height: 250 },
  nameSty: {
    fontFamily: "Kanit_700Bold",
    fontSize: 20,
    marginTop: 10,
    marginLeft: 20,
  },
  districtSty: {
    fontFamily: "Kanit_400Regular",
    color: "#747474",
    marginLeft: 20,
  },
  descriptionSty: {
    fontFamily: "Kanit_400Regular",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  btnphoneSty: {
    width: "90%",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    backgroundColor: "#49e234",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  phoneSty: {
    fontFamily: "Kanit_400Regular",
    color: "#fff",
    fontSize: 18,
  },
});
