import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { ScrollView } from "react-native";

import { images } from "@/constants/images";

import React, { useEffect , useState} from "react";

import SearchBar from "@/components/SearchBar";
import { updateSearchCount } from "@/services/appwrite";

import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { ActivityIndicator } from "react-native";

const search = () => {

  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }),false);

 // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();

        // Call updateSearchCount only if there are results
        if (movies?.length! > 0 && movies?.[0]) {
          await updateSearchCount(searchQuery, movies[0]);
        }
      } else {
        reset();
      }
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);
  


  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="w-full z-0 flex-1 absolute"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 20,
        }}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search for a movie"
                value={searchQuery}
                onChangeText={(text:string) => setSearchQuery(text) }
              />
            </View>

            {loading && 
            <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
            />
            }  

            {error && 
              <Text className="text-red-600 p-5" >Error fetching movies: {error.message}</Text>
            }      

            {!loading && !error && searchQuery.trim() && movies?.length! > 0 &&(
                <Text className="text-white  font-semibold text-lg mb-2 ml-2" >Search Results for "<Text className="text-[#AB8BFF]" >{searchQuery}</Text>":</Text>
            )}
            


          </>
        }
        ListEmptyComponent={
          !loading && !error ?(
            <Text className="text-[#AB8BFF] text-lg font-semibold text-center mt-10">
              {searchQuery.trim() ? 'No movies found.' : 'Search for a movie.'}
            </Text>
          ):null
        }
      />
    </View>
  );
};

export default search;

const styles = StyleSheet.create({});
