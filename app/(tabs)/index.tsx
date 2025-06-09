import { Link } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { images } from "@/constants/images";

export default function Index() {
  return (
    <View className="flex-1  w-full h-full bg-primary ">
      <Image source={images.bg} className="w-full h-full z-0 "/>
      <ScrollView></ScrollView>
    </View>
  );
}
