import { View, Text } from "react-native";
import React from "react";
import { Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { FlatList } from "react-native";

import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { fetchMovies  } from "@/services/api";
import useFetch from "@/services/useFetch";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

const index = () => {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(() => getTrendingMovies());


  return (
    <View className="flex-1  bg-primary">
      <Image source={images.bg} className="w-full absolute z-0" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="mx-auto mt-7 w-16 h-10 mb-2" />
        
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
          }}
          className="mt-1"
        >
          Cinemate
        </Text>
        <SearchBar

          onPress={() => router.push("/search")}
          placeholder="Search For a Movie"
        />

           <View className="mt-5">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  //showsHorizontalScrollIndicator={false}
                  className="mb-4 mt-3"
                  data={trendingMovies}
                  contentContainerStyle={{
                    gap: 8,
                  }}
                  renderItem={({ item ,index }) => (
                     <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  // ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </View>

           <>
          <Text className="text-lg text-white font-bold mt-5 mb-3 ml-1">
            Latest Movies :
          </Text>

         
            



          <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 2,
                }}
                className="mt-4 pb-20"
                scrollEnabled={false}
              />
        </>
      </ScrollView>
    </View>
  );
};

export default index;
