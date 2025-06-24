import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView, Image } from "react-native";
import React from "react";
import { images } from "@/constants/images";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams, useRouter } from "expo-router";
import { icons } from "@/constants/icons";
const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  
const router = useRouter();

  const {
    data: movie,
    loading: movieLoading,
    error: DetailsError,
  } = useFetch(() => fetchMovieDetails(id as string));

  interface MovieInfoProps {
    label: string;
    value?: string | number | null;
  }

  const MovieInfo = ({ label, value }: MovieInfoProps) => (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-light-200 font-normal text-sm">{label}</Text>
      <Text className="text-light-100 font-bold text-sm mt-2">
        {value || "N/A"}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-primary ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 80 }}
      >
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-screen h-[450px]  "
            resizeMode="stretch"
          />
          
          <View>
            <Text
              style={{ fontSize: 20, fontWeight: "bold" }}
              className="mt-2 text-white p-1 text-center "
            >
              {movie?.title}
            </Text>
            <View className="flex flex-row bg-gray-900 w-[120px] h-[25px] rounded-full mx-auto justify-center mt-2">
              <Image source={icons.star} className="w-5 h-5" />
              <Text className="text-white text-sm font-bold mt-1 ml-1">
                {movie?.vote_average?.toFixed(1)}/10
              </Text>
              <Text className="text-gray-700 text-sm font-bold mt-1 ml-2">
                {movie?.vote_count}
              </Text>
            </View>
            <View className="flex flex-row justify-center items-center gap-2 p-1">
              <Text className="text-violet-400 font-semibold mt-1 ">
                {movie?.release_date.split("-")[0]}
              </Text>
              <Text className="text-violet-400 font-semibold mt-1 ">
                {movie?.runtime}min
              </Text>
            </View>
            <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
          />

          <View className="flex flex-row justify-between w-1/2 gap-10">
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(
                (movie?.revenue ?? 0) / 1_000_000
              )} million`}
            />
            
          </View>
          <View>
            <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies?.map((c) => c.name).join(" • ") ||
              "N/A"
            }
          />
          </View>
          </View>
        </View>
        <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-1 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
      </ScrollView>
      
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
