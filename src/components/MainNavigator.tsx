import 'react-native-url-polyfill/auto';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import { RootStackParamList } from '../../lib/utils';
import ProfileSetup1Screen from '../screens/ProfileSetup1Screen';
import ProfileSetup2Screen from '../screens/ProfileSetup2Screen';
import { useContext } from 'react';
import { SessionContext } from '../contexts/SessionContext';

export default function MainNavigator() {
  const { session } = useContext(SessionContext);

  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator id="Main">
      {session ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} initialParams={{ session }} />
          <Stack.Group>
            <Stack.Screen
              options={{ title: 'Profile Setup 1/2' }}
              name="Profile Setup 1"
              component={ProfileSetup1Screen}
            />
            <Stack.Screen
              options={{ title: 'Profile Setup 2/2' }}
              name="Profile Setup 2"
              component={ProfileSetup2Screen}
            />
          </Stack.Group>
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
