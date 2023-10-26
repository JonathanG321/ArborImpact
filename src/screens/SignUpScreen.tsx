import React, { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { supabase } from '../../supabase/supabase';
import { Input } from 'react-native-elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../lib/utils';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp', 'Main'>;

export default function SignUpScreen({}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    // const { data: userExists } = await supabase.auth.getUser.from('users').select(`email`).eq('email', email).single();
    // console.log({ userExists });
    // if (!!userExists?.email) {
    //   Alert.alert('A User Already Exists For That Email!');
    //   setLoading(false);
    //   return;
    // }
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    console.log(session);

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <View className="mt-10 p-3">
      <View className="mt-5 py-1 self-stretch">
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View className="py-1 self-stretch">
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View className="py-1 self-stretch">
        <Pressable
          className="flex items-center rounded bg-blue-500 active:bg-blue-600 px-2 py-1"
          onPress={() => signUpWithEmail()}
          disabled={loading}
        >
          <Text className="text-white text-lg">Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
}
