import { View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import MarketplaceIntroModal from '../components/MarketplaceIntroModal';
import { SceneMap } from 'react-native-tab-view';
import StyledTabView from '../components/StyledTabView';

export default function MarketplaceScreen() {
  const routes = [
    { key: 'first', title: 'ARBOR MARKETPLACE' },
    { key: 'second', title: 'IMPACT MARKET' },
  ];
  const renderScene = SceneMap({
    first: () => <View></View>,
    second: () => <View></View>,
  });
  return (
    <ScreenContainer scrollable>
      <MarketplaceIntroModal />
      <StyledTabView renderScene={renderScene} routes={routes} />
    </ScreenContainer>
  );
}
