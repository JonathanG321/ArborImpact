import 'react-native-url-polyfill/auto';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import { RootStackParamList } from '../../lib/types';
import ProfileSetup1Screen from '../screens/ProfileSetup1Screen';
import ProfileSetup2Screen from '../screens/ProfileSetup2Screen';
import { useContext } from 'react';
import { SessionContext } from '../contexts/SessionContext';
import { ProfileContext } from '../contexts/ProfileContext';

export default function MainNavigator() {
  const { session } = useContext(SessionContext);
  const { profile } = useContext(ProfileContext);

  const Stack = createNativeStackNavigator<RootStackParamList>();

  const initialRoute = !!profile ? 'Home' : 'Profile Setup 1';

  return (
    <Stack.Navigator initialRouteName={initialRoute} id="Main">
      {session ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} initialParams={{ session }} />
          <Stack.Screen
            options={{ title: 'Profile Setup 1/2' }}
            name="Profile Setup 1"
            component={ProfileSetup1Screen}
          />
          <Stack.Screen
            options={{ title: 'Profile Setup 2/2', headerBackTitle: 'Back' }}
            name="Profile Setup 2"
            component={ProfileSetup2Screen}
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
  );
}
