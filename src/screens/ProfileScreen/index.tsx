import { useContext, useEffect, useState } from 'react';
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
import MarketplaceModal from './MarketplaceModal';

type Props = DrawerScreenProps<RootDrawerParamList, 'Profile', 'Main'>;

export default function ProfileScreen({
  navigation: { navigate },
  route: {
    params: { startTab },
  },
}: Props) {
  const { profile } = useContext(UserContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  useEffect(() => {
    if (profile?.madeFirstDonation && !profile.seenMarketplace) {
      setTimeout(() => setIsModalVisible(true), 100);
    }
  }, []);

  return (
    <ScreenContainer>
      <MarketplaceModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
      <ProfileHeader />
      <LineBreak />
      <ProfileBalances />
      <LineBreak />
      <StyledTabView renderScene={renderScene} routes={routes} defaultIndex={startTab} />
    </ScreenContainer>
  );
}
