import 'react-native-url-polyfill/auto';
import { NavigationContainer } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
import { LoadingContextProvider } from './src/contexts/LoadingContext';
import SessionNavigator from './src/components/Navigators/SessionNavigator';
import { ProfileSetupContextProvider } from './src/contexts/ProfileSetupContext';
import { ProjectsContextProvider } from './src/contexts/ProjectsContext';
import { UserContextProvider } from './src/contexts/UserContext';

export default function App() {
  // const [loaded] = useFonts({
  //   BebasNeue: require('./assets/fonts/BebasNeueRegular.ttf'),
  // });

  // if (!loaded) {
  //   return null;
  // }

  return (
    <NavigationContainer>
      <LoadingContextProvider>
        <UserContextProvider>
          <ProfileSetupContextProvider>
            <ProjectsContextProvider>
              <SessionNavigator />
            </ProjectsContextProvider>
          </ProfileSetupContextProvider>
        </UserContextProvider>
      </LoadingContextProvider>
    </NavigationContainer>
  );
}
