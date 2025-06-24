import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'
import { images } from '@/constants/images'
import  MaskedView  from '@react-native-masked-view/masked-view'

const TrendingCard = ({movie:{movie_id, title, poster_url}, index}: TrendingCardProps )=> {

  const router = useRouter();

  return (
   
        <TouchableOpacity 
        onPress={()=> router.push(`/Movies/${movie_id}`)}>
        <Image
          source={{ uri: poster_url }}
          className=" h-48 rounded-lg"
          resizeMode="cover"
        />

        <View className="absolute bottom-4 -left-3.5 px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className="font-bold text-white text-6xl">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        
        <View className='w-[100px]' >
        <Text className="text-white text-sm font-bold mt-1" numberOfLines={1}>
                    {title}
        </Text>
        </View>
        </TouchableOpacity>
    
  )
}

export default TrendingCard
