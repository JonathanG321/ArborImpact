import { useContext, useEffect } from 'react';
import 'react-native-url-polyfill/auto';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import { RootStackParamList } from '../../lib/types';
import ProfileSetup1Screen from '../screens/ProfileSetup1Screen';
import ProfileSetup2Screen from '../screens/ProfileSetup2Screen';
import ProfileSetup3Screen from '../screens/ProfileSetup3Screen';
import { SessionContext } from '../contexts/SessionContext';
import { ProfileContext } from '../contexts/ProfileContext';
import { LoadingContext } from '../contexts/LoadingContext';
import ProfileScreen from '../screens/ProfileScreen';

export default function MainNavigator() {
  const { session } = useContext(SessionContext);
  const { profile, getProfile } = useContext(ProfileContext);
  const { isLoading } = useContext(LoadingContext);

  useEffect(() => {
    getProfile(session);
  }, [session]);

  if (isLoading) {
    return null;
  }

  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator id="Main">
      {session ? (
        <>
          {profile ? (
            <>
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
            </>
          ) : (
            <>
              <Stack.Screen
                options={{ title: 'Profile Setup 1/3' }}
                name="Profile Setup 1"
                component={ProfileSetup1Screen}
              />
              <Stack.Screen
                options={{ title: 'Profile Setup 2/3', headerBackTitle: 'Back' }}
                name="Profile Setup 2"
                component={ProfileSetup2Screen}
              />
              <Stack.Screen
                options={{ title: 'Profile Setup 3/3', headerBackTitle: 'Back' }}
                name="Profile Setup 3"
                component={ProfileSetup3Screen}
              />
              {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
            </>
          )}
        </>
      ) : (
        <>
          <Stack.Screen name="Sign In" component={SignInScreen} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
