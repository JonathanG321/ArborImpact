import { useContext, useEffect } from 'react';
import 'react-native-url-polyfill/auto';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../../screens/SignInScreen';
import SignUpScreen from '../../screens/SignUpScreen';
import ProfileSetup1Screen from '../../screens/ProfileSetup1Screen';
import ProfileSetup2Screen from '../../screens/ProfileSetup2Screen';
import ProfileSetup3Screen from '../../screens/ProfileSetup3Screen';
import { LoadingContext } from '../../contexts/LoadingContext';
import { ProjectsContext } from '../../contexts/ProjectsContext';
import MainNavigator from './MainNavigator';
import { RootStackParamList } from '../../../lib/types';
import { UserContext } from '../../contexts/UserContext';
import LoadingScreen from '../../screens/LoadingScreen';
import { ProductsContext } from '../../contexts/ProductsContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function SessionNavigator() {
  const { session, profile, userSetup, isFirstLoad, setIsFirstLoad } = useContext(UserContext);
  const { getProjects } = useContext(ProjectsContext);
  const { getProducts } = useContext(ProductsContext);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    async function Setup() {
      setIsLoading(true);
      await getProjects();
      await getProducts();
      await userSetup();
      setIsLoading(false);
      setIsFirstLoad(false);
    }
    Setup();
  }, []);

  if (isFirstLoad) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator id="Main">
      {session ? (
        profile ? (
          <Stack.Screen options={{ headerShown: false }} name="Main" component={MainNavigator} />
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
          </>
        )
      ) : (
        <>
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
          <Stack.Screen name="Sign In" component={SignInScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
