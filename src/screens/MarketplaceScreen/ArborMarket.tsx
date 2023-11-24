import { useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import LineBreak from '../../components/LineBreak';
import { ProductsContext } from '../../contexts/ProductsContext';
import Avatar from '../../components/Avatar';
import ButtonDisplay from '../../components/ButtonDisplay';

export default function ArborMarket() {
  const { products } = useContext(ProductsContext);
  return (
    <View className="flex-1">
      <Text className="text-center my-4 text-lg">Browse Your Rewards</Text>
      <LineBreak classNames="border-gray-300 mb-4" />
      {products ? (
        <ScrollView className="h-full">
          {products.map((product) => (
            <View className="flex flex-row w-full h-36" key={product.name + product.description}>
              <View className="flex-1 p-4">
                <Avatar image={product.image} accessibilityLabel="Product Image" classNames=" h-full" />
              </View>
              <View className="flex-1 px-4 overflow-hidden">
                <Text className="font-extrabold text-3xl">{product.discount}% OFF</Text>
                <Text className="text-arbor-grey text-xs h-2/4">{product.description}</Text>
                <ButtonDisplay
                  text="Redeem Rewards    →"
                  classNames="bg-transparent p-0 flex-none items-start rounded"
                  textClassNames="font-bold"
                />
              </View>
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
