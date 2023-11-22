import { useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import LineBreak from '../../components/LineBreak';
import { ProductsContext } from '../../contexts/ProductsContext';

export default function ArborMarket() {
  const { products } = useContext(ProductsContext);
  return (
    <View className="flex-1">
      <Text className="text-center my-4 text-lg">Browse Your Rewards</Text>
      <LineBreak classNames="border-gray-300 mb-4" />
      {products ? (
        <ScrollView className="h-full bg-red-500">
          {products.map((product) => (
            <View>
              <Text>{product.name}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View>
          <Text className="text-center">Could not retrieve Products. Please try again</Text>
        </View>
      )}
    </View>
  );
}
