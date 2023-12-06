import { useContext, useEffect, useState } from 'react';
import { SceneMap } from 'react-native-tab-view';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../../../lib/types';
import ScreenContainer from '../../components/ScreenContainer';
import NoProjectsPlaceholder from './NoProjectsPlaceholder';
import MyImpact from './MyImpact';
import MyProjects from './MyProjects';
import { UserContext } from '../../contexts/UserContext';
import StyledTabView from '../../components/StyledTabView';
import MarketplaceModal from './MarketplaceModal';
import { View } from 'react-native';
import ProfileInfo from '../../components/ProfileInfo';

type Props = DrawerScreenProps<RootDrawerParamList, 'Profile', 'Main'>;

export default function ProfileScreen({
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

  const renderScene = SceneMap(
    profile?.projects?.length
      ? {
          projects: () => <MyProjects projects={profile.projects} />,
          impact: () => <MyImpact projects={profile.projects} />,
        }
      : {
          projects: () => <NoProjectsPlaceholder />,
          impact: () => <NoProjectsPlaceholder />,
        }
  );

  useEffect(() => {
    if (profile?.madeFirstDonation && !profile.seenMarketplace) {
      setTimeout(() => setIsModalVisible(true), 100);
    }
  }, [profile]);

  return (
    <ScreenContainer scrollable>
      <MarketplaceModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
      <ProfileInfo />
      <View className="h-96">
        <StyledTabView renderScene={renderScene} routes={routes} defaultIndex={startTab} />
      </View>
    </ScreenContainer>
  );
}
