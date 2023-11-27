import { View } from 'react-native';
import { SceneMap } from 'react-native-tab-view';
import ScreenContainer from '../../components/ScreenContainer';
import MarketplaceIntroModal from './MarketplaceIntroModal';
import StyledTabView from '../../components/StyledTabView';
import ArborMarket from './ArborMarket';
import ImpactMarket from './ImpactMarket';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';

export default function MarketplaceScreen() {
  const { profile } = useContext(UserContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const routes = [
    { key: 'arborMarket', title: 'ARBOR MARKETPLACE' },
    { key: 'impactMarket', title: 'IMPACT MARKET' },
  ];
  const renderScene = SceneMap({
    arborMarket: ArborMarket,
    impactMarket: ImpactMarket,
  });
  useEffect(() => {
    if (!profile?.seenMarketplace) {
      setIsModalVisible(true);
    }
  }, []);
  return (
    <ScreenContainer>
      {!profile?.seenMarketplace && (
        <MarketplaceIntroModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
      )}
      <View className="h-80%">
        <StyledTabView renderScene={renderScene} routes={routes} defaultIndex={0} />
      </View>
    </ScreenContainer>
  );
}
