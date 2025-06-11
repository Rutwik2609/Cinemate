import { View, Text, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native";

import { icons } from "@/constants/icons";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} as Child>
      <TouchableOpacity className="w-[28%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1alala/ffffff.png",
          }}
          className="w-[99px] h-52 rounded-lg"
          resizeMode="cover"
        />
        <View className="w-[99px] text-white flex ">
          <Text className="text-white text-sm font-bold mt-1" numberOfLines={1}>
            {title}
          </Text>
          <View className="flex flex-row items-center" >
            <Image  source={icons.star} className="w-4 h-4 mt-1"/>
            <Text
              className="text-white text-sm font-bold mt-1 "
              numberOfLines={1}
            >
              {Math.round(vote_average) /2 }
            </Text>
            <Text className="text-white text-sm font-bold mt-1  ml-3" numberOfLines={1}>
            {release_date?.split("-")[0]}
          </Text>
          </View>
          
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
