import { Linking, View } from 'react-native';
import { Text } from 'react-native-elements';
import ButtonDisplay from '../../components/ButtonDisplay';

export default function ImpactMarket() {
  return (
    <View className="flex items-center flex-1">
      <Text className="text-3xl font-bold text-center mt-20 mb-6">COMING SOON</Text>
      <View className="flex flex-row w-1/2">
        <ButtonDisplay
          text="Learn More"
          onPress={() => {
            Linking.openURL('https://www.arborimpact.io');
          }}
        />
      </View>
    </View>
  );
}
