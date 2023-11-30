import { useContext, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Badge, Text } from 'react-native-elements';
import LineBreak from '../../components/LineBreak';
import { ProductsContext } from '../../contexts/ProductsContext';
import Avatar from '../../components/Avatar';
import ButtonDisplay from '../../components/ButtonDisplay';
import BaseInput from '../../components/BaseInput';
import { SDGs } from '../../../lib/templates';

export default function ArborMarket() {
  const { products } = useContext(ProductsContext);
  const [search, setSearch] = useState('');
  const filteredProducts =
    products?.filter((product) => {
      const searchStr = search.toLowerCase();
      const productName = product.name.toLowerCase();
      const productDescription = product.description.toLowerCase();
      return productName.includes(searchStr) || productDescription.includes(searchStr);
    }) || [];
  return (
    <View className="flex-1">
      <Text className="text-center my-4 text-lg">Browse Your Rewards</Text>
      <LineBreak classNames="border-gray-300 mb-4" />
      <BaseInput field="Search" placeholder="Search..." onChange={setSearch} value={search} cancellable />
      {products ? (
        <ScrollView className="h-full">
          {filteredProducts.map((product) => (
            <View className="flex flex-row w-full h-36" key={product.name + product.description}>
              <View className="sflex-1 p-4">
                <Avatar image={product.image} accessibilityLabel="Product Image" classNames=" h-full" />
                <Badge
                  badgeStyle={{ backgroundColor: 'transparent' }}
                  value={<Avatar classNames="h-10 w-10" image={SDGs[product.sdg]} />}
                  containerStyle={{ position: 'absolute', bottom: 13, right: 3 }}
                />
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
