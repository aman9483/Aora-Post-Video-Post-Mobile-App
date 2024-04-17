import { StyleSheet, Text, View, TextInput,Image  } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { icons } from '../constants'

const FormField = ({title, value, placeholder,handleChangeText, otherStyle, ...props}) => {

    const [showPassword, setShowPassword] = useState(false)
  return (
    <View className = {`space-y-2 ${otherStyle}`}>
      <Text className = 'text-base text-gray-100 font-pmedium'>
        {title}
      </Text>

      <View className="w-full h-14 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">

       <TextInput 
       
       className = 'flex-1 text-white font-psemibold  text-base'

       value = {value}

       placeholder = {placeholder}

       placeholderTextColor = '#7b7b8b'

       onChangeText = {handleChangeText}

       secureTextEntry = {title==="password"  && !showPassword}
       {...props}
       
       />
 
 {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField

const styles = StyleSheet.create({})