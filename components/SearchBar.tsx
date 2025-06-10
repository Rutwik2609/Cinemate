import { View, Text, Image } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { icons } from '@/constants/icons'

interface Props {
  placeholder: string,
  onPress: () => void
}

const SearchBar = ({placeholder, onPress}:Props) => {
  return (
    <View className='text-lg bg-blue-950 rounded-full  mt-4 mx-4 flex-row items-center'  >
          <Image source={icons.search} className='size-5 ml-2' tintColor={'#ab8bff'} />
          <TextInput
              onPress={() => {onPress()}}
              placeholder={placeholder}
              value=""
              onChangeText={() => {}}
              className='flex-1 ml-2 text-white text-base'
              placeholderTextColor={'#ab8bff'}
          />
        </View>
  )
}

export default SearchBar