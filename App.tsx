import 'react-native-url-polyfill/auto';
import { NavigationContainer } from '@react-navigation/native';
import { LoadingContextProvider } from './src/contexts/LoadingContext';
import { SessionContextProvider } from './src/contexts/SessionContext';
import { ProfileContextProvider } from './src/contexts/ProfileContext';
import MainNavigator from './src/components/MainNavigator';
import { ProfileSetupContextProvider } from './src/contexts/ProfileSetupContext';

export default function App() {
  return (
    <NavigationContainer>
      <LoadingContextProvider>
        <SessionContextProvider>
          <ProfileContextProvider>
            <ProfileSetupContextProvider>
              <MainNavigator />
            </ProfileSetupContextProvider>
          </ProfileContextProvider>
        </SessionContextProvider>
      </LoadingContextProvider>
    </NavigationContainer>
  );
}
