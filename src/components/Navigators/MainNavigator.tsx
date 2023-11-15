import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerNavigationProp,
  DrawerToggleButton,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { HeaderBackButton } from '@react-navigation/elements';
import ProfileScreen from '../../screens/ProfileScreen';
import ProjectsScreen from '../../screens/ProjectsScreen';
import ProjectScreen from '../../screens/ProjectScreen';
import { RootDrawerParamList } from '../../../lib/types';
import { supabase } from '../../../supabase/supabase';
import { useContext } from 'react';
import { LoadingContext } from '../../contexts/LoadingContext';
import { ProfileContext } from '../../contexts/ProfileContext';
import { useNavigation } from '@react-navigation/native';

function DrawerContent(props: DrawerContentComponentProps) {
  const { setProfile } = useContext(ProfileContext);
  const { setIsLoading } = useContext(LoadingContext);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sign Out"
        onPress={async () => {
          setIsLoading(true);
          await supabase.auth.signOut();
          setProfile(null);
          setIsLoading(false);
        }}
      />
    </DrawerContentScrollView>
  );
}

export default function MainNavigator() {
  const Drawer = createDrawerNavigator<RootDrawerParamList>();
  return (
    <Drawer.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerLeft: () => null, headerRight: () => <DrawerToggleButton />, drawerPosition: 'right' }}
      drawerContent={DrawerContent}
    >
      <Drawer.Screen name="Profile" component={ProfileScreen} initialParams={{ startTab: 0 }} />
      <Drawer.Screen name="Projects" component={ProjectsScreen} />
      <Drawer.Screen
        name="Project"
        component={ProjectScreen}
        options={{
          drawerItemStyle: { display: 'none' },
          headerLeft: () => {
            const { navigate } = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
            return <HeaderBackButton onPress={() => navigate('Projects')} />;
          },
        }}
      />
    </Drawer.Navigator>
  );
}
