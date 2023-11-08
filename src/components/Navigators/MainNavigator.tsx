import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import ProfileScreen from '../../screens/ProfileScreen';
import HomeScreen from '../../screens/HomeScreen';
import ProjectScreen from '../../screens/ProjectsScreen';
import { RootDrawerParamList } from '../../../lib/types';
import { supabase } from '../../../supabase/supabase';
import { useContext } from 'react';
import { LoadingContext } from '../../contexts/LoadingContext';
import { ProfileContext } from '../../contexts/ProfileContext';

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
    <Drawer.Navigator initialRouteName="Profile" drawerContent={DrawerContent}>
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Projects" component={ProjectScreen} />
    </Drawer.Navigator>
  );
}
