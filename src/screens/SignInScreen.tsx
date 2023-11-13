import React, { useContext, useState } from 'react';
import { Alert, TextStyle, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../supabase/supabase';
import { CheckBox, Input, Text } from 'react-native-elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../lib/types';
import { LoadingContext } from '../contexts/LoadingContext';
import ScreenContainer from '../components/ScreenContainer';
import AuthButton from '../components/AuthButton';
import LineBreak from '../components/LineBreak';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import Header from '../components/Header';
import AuthInput from '../components/AuthInput';

type Props = NativeStackScreenProps<RootStackParamList, 'Sign In', 'Main'>;

type LoginForm = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().min(2, 'Too Short!').default(''),
  password: z.string().min(6, 'Password must be at least 6 letters').default(''),
});

export default function SignInScreen({ navigation: { replace } }: Props) {
  const { setIsLoading } = useContext(LoadingContext);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors: formErrors },
  } = useForm<LoginForm>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<LoginForm> = async (form) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp(form);

    if (error) {
      Alert.alert(error.message);
      setIsLoading(false);
    }
  };

  const onError: SubmitErrorHandler<LoginForm> = async (errors) => {
    Object.keys(errors).map((key) => {
      const LoginFormKey = key as keyof LoginForm;
      setError(LoginFormKey, errors[LoginFormKey] || {});
    });
    Alert.alert('Some fields contain Errors. Please fix them before moving on.');
  };

  return (
    <ScreenContainer>
      <Text className="text-2xl text-center mb-2">Sign in to your Arbor Account</Text>
      <View className="flex flex-row justify-center">
        <LineBreak classNames="w-1/2 border-gray-400" />
      </View>
      <AuthInput control={control} field="email" label="Email" error={formErrors.email} />
      <AuthInput control={control} field="password" label="Password" error={formErrors.password} />
      <AuthButton text="Sign In" icon="→" onClick={() => handleSubmit(onSubmit, onError)} />
      <View className="flex flex-row justify-center mt-5">
        <Text className="text-lg flex text-center mr-2">Don't Have an Account?</Text>
        <TouchableOpacity className="flex items-center" onPress={() => replace('Sign Up')}>
          <Text className="text-blue-400 text-lg">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
