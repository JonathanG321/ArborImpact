import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';
import Account from './components/Account';
import { View } from 'react-native';
import { Session } from '@supabase/supabase-js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" children={() => Home({ session })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Home({ session }: { session: Session | null }) {
  return <View>{session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}</View>;
}
