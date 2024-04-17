import { StyleSheet, Text, View,ScrollView,Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants";
import FormField from '../../components/formField';
import CustomButton from '../../components/customButton';
import { Link, router } from 'expo-router';
import {getCurrentUser,SignIn} from "../../lib/appWrite"
import { useGlobalContext } from "../../context/GlobalProvider";


const signIn= () => {

  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      await SignIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <SafeAreaView className = 'bg-primary h-full'>

     <ScrollView>

      <View className = 'w-full justify-center min-h-[87vh]'>


          <Image source  = {images.logo} resizeMode = 'contain' className = 'w-[115px] h-[35px]'/>

          <Text className='text-2xl  text-white font-psemibold text-semibold mt-10'>Log In To Aora</Text>

          <FormField
          
          title = 'email'
          value = {form.email}
          handleChangeText = {(e)=>setForm({...form,email: e})}

          otherStyle = 'mt-7'
          keyboardType = 'email-address'
          
          />

<FormField
          
          title = 'password'
          value = {form.password}
          handleChangeText = {(e)=>setForm({...form,password:e})}

          otherStyle = 'mt-7'
         
          
          />

          <CustomButton
          
          title="sign-in"
          handlePress={submit}
          containerStyles="mt-7"
          
          />

          <View className='justify-center pt-5 flex-row gap-2'>

           <Text className='text-lg text-gray-100 font-pregular'>

            Don't Have Account?
           </Text>

           <Link href='/sign-up' className='text-lg font-psemibold text-secondary'>Sign Up</Link>
          </View>
      </View>


     </ScrollView>

    </SafeAreaView>
  )
}

export default signIn

const styles = StyleSheet.create({})