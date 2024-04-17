import { StyleSheet, Text, View,ScrollView,Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants";
import FormField from '../../components/formField';
import CustomButton from '../../components/customButton';
import { Link,router } from 'expo-router';
import { createUser } from '../../lib/appWrite';
import { useGlobalContext } from "../../context/GlobalProvider";



const signUp= () => {

  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

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

          <Text className='text-2xl  text-white font-psemibold text-semibold mt-10'>Sign In To Aora</Text>

          <FormField
          
          title = 'username'
          value = {form.username}
          handleChangeText = {(e)=>setForm({...form,username: e})}

          otherStyle = 'mt-10'
         
          
          />

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
          
          title="sign-Up"
          handlePress={submit}
          containerStyles="mt-7"
          
          />

          <View className='justify-center pt-5 flex-row gap-2'>

           <Text className='text-lg text-gray-100 font-pregular'>

            Have An Account Already? 
           </Text>

           <Link href='/sign-in' className='text-lg font-psemibold text-secondary'>Sign In</Link>
          </View>
      </View>


     </ScrollView>

    </SafeAreaView>
  )
}

export default signUp

const styles = StyleSheet.create({})