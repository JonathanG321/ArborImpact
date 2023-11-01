import React, { useContext, useState } from 'react';
import { Alert, View } from 'react-native';
import { supabase } from '../../supabase/supabase';
import { Input } from 'react-native-elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../lib/types';
import { LoadingContext } from '../contexts/LoadingContext';
import ScreenContainer from '../components/ScreenContainer';
import AuthButton from '../components/AuthButton';

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
    <ScreenContainer>
      <View className="mt-5 py-1 self-stretch">
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={setEmail}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View className="py-1 self-stretch">
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <AuthButton text="Sign Up" onClick={signUpWithEmail} />
      <AuthButton text="Sign In Instead" onClick={() => replace('Sign In')} />
    </ScreenContainer>
  );
}
