

import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { icons } from "@/constants/icons";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="w-[28%]"
      onPress={() => router.push(`/Movies/${id}`)}
    >
      <Image
        source={{
          uri: poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "https://placehold.co/600x400/1alala/ffffff.png",
        }}
        style={{ width: 99, height: 180, borderRadius: 8 }}
        resizeMode="cover"
      />
      <View style={{ width: 99 }}>
        <Text className="text-white text-sm font-bold mt-1" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex flex-row items-center">
          <Image
            source={icons.star}
            style={{ width: 16, height: 16, marginTop: 4 }}
          />
          <Text className="text-white text-sm font-bold mt-1 ml-1">
            {(vote_average ? vote_average / 2 : 0).toFixed(1)}
          </Text>
          <Text className="text-white text-sm font-bold mt-1 ml-3" numberOfLines={1}>
            {release_date?.split("-")[0] || "N/A"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;
