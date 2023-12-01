import { useContext } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import LineBreak from '../../components/LineBreak';
import ButtonDisplay from '../../components/ButtonDisplay';
import Queries from '../../../lib/supabaseQueries';
import { UserContext } from '../../contexts/UserContext';

type Props = {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MarketplaceIntroModal({ isModalVisible, setIsModalVisible }: Props) {
  const { session } = useContext(UserContext);
  const firstTimeCards = [
    { title: 'Explanation of impact shares', description: 'Represents your contribution towards an impact project' },
    { title: 'How shares are redeemable', description: '10 impact shares = %10 discount on a product' },
    {
      title: 'Browse through awesome discounts',
      description: 'The more you donate, the more impact shares you get, the more discounts on products you receive',
    },
  ];
  function leaveModal() {
    setIsModalVisible(false);
    Queries.setSeenMarketplace(session?.user.id);
  }
  return (
    <Modal animationIn="fadeIn" animationOut="fadeOut" isVisible={isModalVisible} onBackdropPress={leaveModal}>
      <View className="flex items-center bg-white rounded-lg p-6">
        <Text className="font-medium mb-2 text-center">
          Here's how to make the most of your account and each amazing benefit.
        </Text>
        <LineBreak classNames="border-gray-400 w-3/4 mb-3" />
        {firstTimeCards.map((card) => (
          <View key={card.title} className="w-full rounded-xl bg-white shadow-sm shadow-slate-600 p-5 mb-3">
            <Text className="font-extrabold text-center mb-2">{card.title}</Text>
            <Text className="text-xs text-center mb-3">{card.description}</Text>
          </View>
        ))}
        <View className="flex flex-row w-1/2">
          <ButtonDisplay
            textClassNames="font-extrabold"
            classNames="shadow-lg rounded-3xl"
            text="→ LET'S GO"
            onPress={leaveModal}
          />
        </View>
      </View>
    </Modal>
  );
}
