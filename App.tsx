import 'react-native-url-polyfill/auto';
import { NavigationContainer } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
import { LoadingContextProvider } from './src/contexts/LoadingContext';
import { SessionContextProvider } from './src/contexts/SessionContext';
import { ProfileContextProvider } from './src/contexts/ProfileContext';
import SessionNavigator from './src/components/Navigators/SessionNavigator';
import { ProfileSetupContextProvider } from './src/contexts/ProfileSetupContext';
import { ProjectsContextProvider } from './src/contexts/ProjectsContext';

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
        <SessionContextProvider>
          <ProfileContextProvider>
            <ProfileSetupContextProvider>
              <ProjectsContextProvider>
                <SessionNavigator />
              </ProjectsContextProvider>
            </ProfileSetupContextProvider>
          </ProfileContextProvider>
        </SessionContextProvider>
      </LoadingContextProvider>
    </NavigationContainer>
  );
}
