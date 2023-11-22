import { View } from 'react-native';
import { SceneMap } from 'react-native-tab-view';
import ScreenContainer from '../../components/ScreenContainer';
import MarketplaceIntroModal from './MarketplaceIntroModal';
import StyledTabView from '../../components/StyledTabView';
import ArborMarket from './ArborMarket';
import ImpactMarket from './ImpactMarket';

export default function MarketplaceScreen() {
  const routes = [
    { key: 'arborMarket', title: 'ARBOR MARKETPLACE' },
    { key: 'impactMarket', title: 'IMPACT MARKET' },
  ];
  const renderScene = SceneMap({
    arborMarket: ArborMarket,
    impactMarket: ImpactMarket,
  });
  return (
    <ScreenContainer>
      <MarketplaceIntroModal />
      <View className="h-80%">
        <StyledTabView renderScene={renderScene} routes={routes} defaultIndex={0} />
      </View>
    </ScreenContainer>
  );
}
