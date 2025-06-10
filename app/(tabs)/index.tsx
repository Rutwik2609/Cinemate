import { View, Text } from "react-native";
import React from "react";
import { Image, ScrollView } from "react-native";
import { TextInput } from "react-native";
import { useRouter } from "expo-router";

import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import search from "./search";

const index = () => {

  const router = useRouter();

  return (
    <View className="flex-1  bg-primary">
      <Image source={images.bg} className="w-full absolute z-0" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="mx-auto mt-14 w-12 h-10 mb-2" />
        <Text
          style={{
            color: "white",
            fontSize: 10,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Cinemate
        </Text>
        <SearchBar
          onPress={() => router.push("/search")}
          placeholder="Search For a Movie"
        />
      </ScrollView>
    </View>
  );
};

export default index;
