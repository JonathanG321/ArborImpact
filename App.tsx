import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
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

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const Stack = createNativeStackNavigator<RootStackParamList>();
  const profileSetup2InitParams = {
    birth_date: new Date(),
    first_name: '',
    last_name: '',
    location: '',
    want_difference_world: false,
    want_diversify_portfolio: false,
    want_specific_cause: false,
    want_tax_incentives: false,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator id="Main">
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
