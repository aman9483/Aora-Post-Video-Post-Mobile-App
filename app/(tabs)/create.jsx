import { StyleSheet, Text, View , ScrollView,TouchableOpacity,Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import FormFiled from '../../components/formField'
import { icons } from '../../constants'
import CustomButton from '../../components/customButton'
import * as ImagePicker from 'expo-image-picker';
import { ResizeMode, Video } from "expo-av";
import { router } from "expo-router";
import { createVideoPost } from "../../lib/appWrite";
import { useGlobalContext } from "../../context/GlobalProvider";



const create = () => {

  const { user } = useGlobalContext();

  const [uloading, setUploading] = useState(false)

  const [form , setForm] = useState({

     title:"",
     video:null,
     thumnail:null,
     prompt: "",
  })

  const openPicker =async (selectType)=>{

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:selectType === 'image'?  ImagePicker.MediaTypeOptions.Images: ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    })

    if(!result.canceled){

      if(selectType==='image'){
        setForm({...form, thumnail: result.assets[0]})
      }

      
      if(selectType==='video'){
        setForm({...form, video: result.assets[0]})
      }
    }else{

      setTimeout(()=>{

        Alert.alert('Document picked ', JSON.stringify(result, null, 2))


      },100)
    }

  }

  const submit = async () => {
    if (
      (form.prompt === "") |
      (form.title === "") |
      !form.thumnail |
      !form.video
    ) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await createVideoPost({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  };
  return (
    <SafeAreaProvider className = 'bg-primary h-full '>

      <ScrollView className='px-4 my-6'>
      <Text className='text-2xl text-white font-psemibold'>Upload Video</Text>

      <FormFiled
      
      title="video title"
      value = {form.title}
      placeholder="Give Your Video A Catch Title..."
      handleChangeText={(e)=>setForm({...form , title: e})}
      otherStyle = 'mt-10'
      
      />

      <View className = 'mt-7 space-y-2'>

        <Text className='text-base text-gray-100 font-pmedium'>Upload Video</Text>

          <TouchableOpacity onPress={()=>openPicker('video')}>
          {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                
                resizeMode={ResizeMode.COVER}
                
              />

          ):(

            <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>

              <View className='w-14 h-14 border-dashed border-secondary-100 justify-center items-center'>

                <Image
                
                source={icons.upload}
                resizeMode='contain'
                className='w-1/2'
                
                />


              </View>


            </View>
          )}
          </TouchableOpacity>
      </View>

      <View className='mt-7 space-y-2'>

      <Text className='text-2xl text-white font-psemibold'>Thumbnail</Text>

      <TouchableOpacity onPress={()=>openPicker('image')}>
          {form.thumnail ? (
            <Image
            
            source={{uri: form.thumnail.uri}}
            resizeMode='cover'
            className='w-full h-64 rounded-2xl'
            
            />

          ):(

            <View className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200'>

             

                <Image
                
                source={icons.upload}
                resizeMode='contain'
                className='w-5 h-5'
                
                />

                <Text className='text-sm text-gray-100 font-pmedium'>Choose A file</Text>


              </View>


           
          )}
          </TouchableOpacity>

      </View>

      <FormFiled
      
      title="Ai Prompt"
      value = {form.prompt}
      placeholder="The Prompt You Use To Create The Video..."
      handleChangeText={(e)=>setForm({...form , prompt: e})}
      otherStyle = 'mt-7'
      
      />

<CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          // isLoading={uploading}
        />

      </ScrollView>
    </SafeAreaProvider>
  )
}

export default create

const styles = StyleSheet.create({})