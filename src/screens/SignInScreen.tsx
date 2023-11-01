import React, { useContext, useState } from 'react';
import { Alert, View } from 'react-native';
import { supabase } from '../../supabase/supabase';
import { Input } from 'react-native-elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../lib/types';
import { LoadingContext } from '../contexts/LoadingContext';
import ScreenContainer from '../components/ScreenContainer';
import AuthButton from '../components/AuthButton';
import { signal } from '@preact/signals-core';

type Props = NativeStackScreenProps<RootStackParamList, 'Sign In', 'Main'>;

export default function SignInScreen({ navigation: { replace } }: Props) {
  const email = signal('');
  const password = signal('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const { setIsLoading } = useContext(LoadingContext);

  async function signInWithEmail() {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) Alert.alert(error.message);
    setIsLoading(false);
  }

  return (
    <ScreenContainer>
      <View className="mt-5 py-1 self-stretch">
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(newEmail) => (email.value = newEmail)}
          value={email.value}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View className="py-1 self-stretch">
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(newPassword) => (password.value = newPassword)}
          value={password.value}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <AuthButton text="Sign in" onClick={signInWithEmail} />
      <AuthButton text="Sign Up Instead" onClick={() => replace('Sign Up')} />
    </ScreenContainer>
  );
}
