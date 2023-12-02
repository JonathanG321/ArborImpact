import React, { useContext } from 'react';
import { Alert, TextStyle, TouchableOpacity, View } from 'react-native';
import { CheckBox, Text } from 'react-native-elements';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { z } from 'zod';
import { useTailwind } from 'nativewind';
import { RootStackParamList } from '../../../lib/types';
import { LoadingContext } from '../../contexts/LoadingContext';
import ScreenContainer from '../../components/ScreenContainer';
import AuthButton from '../../components/AuthButton';
import { cn } from '../../../lib/utils';
import LineBreak from '../../components/LineBreak';
import Header from '../../components/Header';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthInput from '../../components/AuthInput';
import Queries from '../../../lib/supabaseQueries';

type Props = NativeStackScreenProps<RootStackParamList, 'Sign Up', 'Main'>;

type LoginForm = {
  email: string;
  password: string;
  passwordConfirm: string;
  disclaimer: boolean;
};

const schema = z
  .object({
    email: z.string().min(2, 'Too Short!').default(''),
    password: z.string().min(6, 'Password must be at least 6 letters').default(''),
    passwordConfirm: z.string().min(6, 'Password must be at least 6 letters').default(''),
    disclaimer: z.boolean().default(false),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
      });
    }
  });

export default function SignUpScreen({ navigation: { replace } }: Props) {
  const { setIsLoading } = useContext(LoadingContext);

  const {
    control,
    setValue,
    handleSubmit,
    setError,
    formState: { errors: formErrors },
  } = useForm<LoginForm>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<LoginForm> = async (form) => {
    if (!form.disclaimer) {
      Alert.alert('You must accept the disclaimer before creating your account');
      return;
    }
    setIsLoading(true);
    const { passwordConfirm: _, ...login } = form;
    const { error } = await Queries.supabaseSignUp(login);

    if (error) {
      Alert.alert('Error Signing Up', error.message);
    }
    setIsLoading(false);
  };

  const onError: SubmitErrorHandler<LoginForm> = async (errors) => {
    Object.keys(errors).map((key) => {
      const LoginFormKey = key as keyof LoginForm;
      setError(LoginFormKey, errors[LoginFormKey] || {});
    });
    Alert.alert('Some Fields Contain Errors', 'Please fix them before moving on.');
  };

  return (
    <ScreenContainer scrollable>
      <Header textClassNames="text-3xl" title="LET'S FUND THE AGE OF ACTION, YOU'RE ONE STEP CLOSER." />
      <Text className="text-xl text-gray-600 text-center mb-2">We're so excited to get started with you.</Text>
      <LineBreak classNames="w-fit border-gray-400 mb-4" />
      <Text className="text-2xl text-center mb-2">Create your Arbor Account</Text>
      <View className="flex flex-row justify-center">
        <LineBreak classNames="w-1/2 border-gray-400" />
      </View>
      <AuthInput control={control} field="email" label="Email" error={formErrors.email} />
      <AuthInput control={control} field="password" label="Password" error={formErrors.password} secure />
      <AuthInput
        control={control}
        field="passwordConfirm"
        label="Confirm Password"
        placeholder="password"
        secure
        error={formErrors.passwordConfirm}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { value } }) => (
          <View className="mb-5">
            <CheckBox
              iconType="ionicon"
              checkedIcon="checkbox"
              uncheckedIcon="square-outline"
              checkedColor="black"
              uncheckedColor="black"
              title="Disclaimer email jargon and more consent stuff, lots of text ask to see the terms and conditions etc."
              textStyle={useTailwind({ className: cn('flex-1 font-normal mr-0') }) as TextStyle}
              size={30}
              checked={value}
              onPress={() => setValue('disclaimer', !value)}
            />
          </View>
        )}
        name="disclaimer"
      />
      <AuthButton text="Create Account" icon="→" onPress={handleSubmit(onSubmit, onError)} />
      <View className="flex flex-row justify-center mt-5 mb-10">
        <Text className="text-lg flex text-center mr-2">Already Have an Account?</Text>
        <TouchableOpacity className="flex items-center" onPress={() => replace('Sign In')}>
          <Text className="text-blue-400 text-lg">Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
