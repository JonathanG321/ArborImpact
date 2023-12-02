import React, { useContext } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldErrors, useForm } from 'react-hook-form';
import { LoginForm, RootStackParamList } from '../../../lib/types';
import { LoadingContext } from '../../contexts/LoadingContext';
import ScreenContainer from '../../components/ScreenContainer';
import AuthButton from '../../components/AuthButton';
import LineBreak from '../../components/LineBreak';
import AuthInput from '../../components/AuthInput';
import Queries from '../../../lib/supabaseQueries';

type Props = NativeStackScreenProps<RootStackParamList, 'Sign In', 'Main'>;

const schema = z
  .object({
    email: z.string().min(2, 'Too Short!').default(''),
    password: z.string().min(6, 'Password must be at least 6 letters').default(''),
  })
  .required();

export default function SignInScreen({ navigation: { replace } }: Props) {
  const { setIsLoading } = useContext(LoadingContext);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors: formErrors },
  } = useForm<LoginForm>({ resolver: zodResolver(schema) });

  async function onSubmit(form: LoginForm) {
    setIsLoading(true);
    const { error } = await Queries.supabaseSignIn(form);

    if (error) {
      Alert.alert('Error Signing In', error.message);
    }
    setIsLoading(false);
  }

  function onError(errors: FieldErrors<LoginForm>) {
    Object.keys(errors).map((key) => {
      const LoginFormKey = key as keyof LoginForm;
      setError(LoginFormKey, errors[LoginFormKey] || {});
    });
    Alert.alert('Some Fields Contain Errors', 'Please fix them before moving on.');
  }

  return (
    <ScreenContainer scrollable>
      <Text className="text-2xl text-center mb-2">Sign in to your Arbor Account</Text>
      <View className="flex flex-row justify-center">
        <LineBreak classNames="w-1/2 border-gray-400" />
      </View>
      <AuthInput control={control} field="email" label="Email" error={formErrors.email} />
      <AuthInput control={control} field="password" label="Password" error={formErrors.password} secure />
      <AuthButton text="Sign In" icon="→" onPress={handleSubmit(onSubmit, onError)} />
      <View className="flex flex-row justify-center mt-5">
        <Text className="text-lg flex text-center mr-2">Don't Have an Account?</Text>
        <TouchableOpacity className="flex items-center" onPress={() => replace('Sign Up')}>
          <Text className="text-blue-400 text-lg">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
