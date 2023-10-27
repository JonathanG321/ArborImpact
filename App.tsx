import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { supabase } from './supabase/supabase';
import { Session } from '@supabase/supabase-js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import { RootStackParamList } from './lib/utils';
import ProfileSetup1Screen from './src/screens/ProfileSetup1Screen';
import ProfileSetup2Screen from './src/screens/ProfileSetup2Screen';
import LoadingScreen from './src/screens/LoadingScreen';

const profileSetup2InitParams = {
  birthDate: new Date(),
  firstName: '',
  lastName: '',
  location: '',
  wantDifferenceWorld: false,
  wantDiversifyPortfolio: false,
  wantSpecificCause: false,
  wantTaxIncentives: false,
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList>('Home');

  async function getProfile(session: Session | null) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');
      const { error, status, data } = await supabase.from('profiles').select(`*`).eq('id', session?.user.id).single();
      if (error && status !== 406) throw error;
      if (error) setInitialRoute('Profile Setup 1');
      console.log(data);
    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      getProfile(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const Stack = createNativeStackNavigator<RootStackParamList>();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} id="Main">
        {session ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} initialParams={{ session }} />
            <Stack.Screen name="Profile Setup 1" component={ProfileSetup1Screen} />
            <Stack.Screen
              name="Profile Setup 2"
              component={ProfileSetup2Screen}
              initialParams={profileSetup2InitParams}
            />
            {/* <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} /> */}
          </>
        ) : (
          <>
            <Stack.Screen name="Sign In" component={SignInScreen} />
            <Stack.Screen name="Sign Up" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
