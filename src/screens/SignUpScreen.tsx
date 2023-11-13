import React, { useContext, useState } from 'react';
import { Alert, TextStyle, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../supabase/supabase';
import { Input, Text } from 'react-native-elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../lib/types';
import { LoadingContext } from '../contexts/LoadingContext';
import ScreenContainer from '../components/ScreenContainer';
import AuthButton from '../components/AuthButton';
import { useTailwind } from 'nativewind';
import { cn } from '../../lib/utils';
import LineBreak from '../components/LineBreak';

type Props = NativeStackScreenProps<RootStackParamList, 'Sign Up', 'Main'>;

export default function SignUpScreen({ navigation: { replace } }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [disclaimer, setDisclaimer] = useState(false);
  const [passError, setPassError] = useState<string | null>(null);
  const { setIsLoading } = useContext(LoadingContext);

  async function signUpWithEmail() {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      setIsLoading(false);
    }
  }

  return (
    <ScreenContainer>
      <Text className="text-2xl text-center mb-2">Create your Arbor Account</Text>
      <View className="flex flex-row justify-center">
        <LineBreak classNames="w-1/2 border-gray-400" />
      </View>
      <View className="mt-5 py-1 self-stretch">
        <Input
          label="Email"
          className="border pl-3"
          labelStyle={useTailwind({ className: 'font-normal text-black text-xl mb-2' }) as TextStyle}
          onChangeText={setEmail}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View className="py-1 self-stretch">
        <Input
          label="Password"
          className={cn('border pl-3', { 'border-red-600': !!passError })}
          labelStyle={useTailwind({ className: 'font-normal text-black text-xl mb-2' }) as TextStyle}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          placeholder="password"
          autoCapitalize={'none'}
        />
      </View>
      <View className="py-1 self-stretch">
        <Input
          label="Confirm Password"
          className={cn('border pl-3', { 'border-red-600': !!passError })}
          labelStyle={useTailwind({ className: 'font-normal text-black text-xl mb-2' }) as TextStyle}
          onChangeText={setPasswordConfirm}
          value={passwordConfirm}
          secureTextEntry={true}
          placeholder="password"
          autoCapitalize={'none'}
        />
      </View>
      <AuthButton text="Create Account" onClick={signUpWithEmail} />
      <View className="flex flex-row justify-center">
        <Text className="text-lg flex text-center mr-2">Already Have an Account?</Text>
        <TouchableOpacity className="flex items-center" onPress={() => replace('Sign In')}>
          <Text className="text-blue-400 text-lg">Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
