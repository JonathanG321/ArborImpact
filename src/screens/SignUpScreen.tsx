import React, { useContext, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { supabase } from '../../supabase/supabase';
import { Input } from 'react-native-elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../lib/types';
import { LoadingContext } from '../contexts/LoadingContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Sign Up', 'Main'>;

export default function SignUpScreen({ navigation: { replace } }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLoading } = useContext(LoadingContext);

  async function signUpWithEmail() {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      console.error(error);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
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
        >
          <Text className="text-white text-lg">Sign up</Text>
        </Pressable>
      </View>
      <View className="mt-5 py-1 self-stretch">
        <Pressable
          className="flex items-center rounded bg-blue-500 active:bg-blue-600 px-2 py-1"
          onPress={() => replace('Sign In')}
        >
          <Text className="text-white text-lg">Sign In Instead</Text>
        </Pressable>
      </View>
    </View>
  );
}
