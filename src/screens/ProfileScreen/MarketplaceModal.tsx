import { View } from 'react-native';
import Modal from 'react-native-modal';
import Header from '../../components/Header';
import { Text } from 'react-native-elements';
import ButtonDisplay from '../../components/ButtonDisplay';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../../../lib/types';

type Props = {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: DrawerNavigationProp<RootDrawerParamList, 'Profile', undefined>['navigate'];
};

export default function MarketplaceModal({ isModalVisible, setIsModalVisible, navigate }: Props) {
  return (
    <Modal className="flex items-center" onBackdropPress={() => setIsModalVisible(false)} isVisible={isModalVisible}>
      <View className="bg-arbor-bg h-2/5 w-11/12 rounded-2xl flex justify-between items-center p-6">
        <Header textClassNames="text-2xl" title="REDEEM YOUR IMPACT SHARES FOR DISCOUNTS" centered />
        <Text className="text-xl text-center text-gray-600 mb-5">
          Now that you have an impact in your portfolio, Let's redeem your shares!
        </Text>
        <View className="flex flex-row w-2/3 shadow-sm shadow-gray-600">
          <ButtonDisplay
            onPress={() => {
              setIsModalVisible(false);
              navigate('Marketplace');
            }}
            textClassNames="font-extrabold text-xl"
            text="→ LET'S GO"
          />
        </View>
      </View>
    </Modal>
  );
}
