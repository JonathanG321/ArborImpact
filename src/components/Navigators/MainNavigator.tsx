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
import { useContext } from 'react';
import { LoadingContext } from '../../contexts/LoadingContext';
import { useNavigation } from '@react-navigation/native';
import Queries from '../../../lib/supabaseQueries';
import { UserContext } from '../../contexts/UserContext';
import MarketplaceScreen from '../../screens/MaketplaceScreen';

function DrawerContent(props: DrawerContentComponentProps) {
  const { setProfile } = useContext(UserContext);
  const { setIsLoading } = useContext(LoadingContext);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sign Out"
        onPress={async () => {
          setIsLoading(true);
          await Queries.supabaseSignOut();
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
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{ startTab: 0 }}
        options={{ headerTitle: '' }}
      />
      <Drawer.Screen name="Projects" component={ProjectsScreen} options={{ headerTitle: '' }} />
      <Drawer.Screen name="Marketplace" component={MarketplaceScreen} options={{ headerTitle: '' }} />
      <Drawer.Screen
        name="Project"
        component={ProjectScreen}
        options={{
          headerTitle: '',
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
