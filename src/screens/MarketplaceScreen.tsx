import { View } from 'react-native';
import { Text } from 'react-native-elements';
import ScreenContainer from '../components/ScreenContainer';
import MarketplaceIntroModal from '../components/MarketplaceIntroModal';

export default function MarketplaceScreen() {
  return (
    <ScreenContainer scrollable>
      <View className="flex items-center h-full w-full">
        <Text className="text-3xl font-bold mb-5">Arbor Marketplace</Text>
        <MarketplaceIntroModal />
      </View>
    </ScreenContainer>
  );
}
