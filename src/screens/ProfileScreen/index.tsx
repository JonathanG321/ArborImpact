import { useContext } from 'react';
import { SceneMap } from 'react-native-tab-view';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../../../lib/types';
import ScreenContainer from '../../components/ScreenContainer';
import LineBreak from '../../components/LineBreak';
import NoProjectsPlaceholder from './NoProjectsPlaceholder';
import MyImpact from './MyImpact';
import MyProjects from './MyProjects';
import { UserContext } from '../../contexts/UserContext';
import StyledTabView from '../../components/StyledTabView';
import ProfileBalances from './ProfileBalances';
import ProfileHeader from './ProfileHeader';

type Props = DrawerScreenProps<RootDrawerParamList, 'Profile', 'Main'>;

export default function ProfileScreen({
  navigation: { navigate },
  route: {
    params: { startTab },
  },
}: Props) {
  const { profile } = useContext(UserContext);

  const routes = [
    { key: 'projects', title: 'MY PROJECTS' },
    { key: 'impact', title: 'MY IMPACT' },
  ];

  const renderScene = SceneMap({
    projects: () =>
      profile?.projects?.length ? (
        <MyProjects projects={profile?.projects} />
      ) : (
        <NoProjectsPlaceholder navigate={navigate} />
      ),
    impact: () => <MyImpact projects={profile?.projects} />,
  });

  return (
    <ScreenContainer>
      <ProfileHeader />
      <LineBreak />
      <ProfileBalances />
      <LineBreak />
      <StyledTabView renderScene={renderScene} routes={routes} defaultIndex={startTab} />
    </ScreenContainer>
  );
}
