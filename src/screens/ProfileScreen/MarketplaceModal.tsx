import { View } from 'react-native';
import Modal from 'react-native-modal';
import Header from '../../components/Header';
import { Text } from 'react-native-elements';
import ButtonDisplay from '../../components/ButtonDisplay';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../../../lib/types';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

type Props = {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MarketplaceModal({ isModalVisible, setIsModalVisible }: Props) {
  const { navigate } = useNavigation<DrawerNavigationProp<RootDrawerParamList, 'Profile'>>();
  const [pressedNavigate, setPressedNavigate] = useState(false);
  return (
    <Modal
      className="flex items-center"
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={() => setIsModalVisible(false)}
      animationOutTiming={pressedNavigate ? 0.1 : undefined}
      onModalHide={() => {
        if (pressedNavigate) {
          navigate('Marketplace');
        }
      }}
      isVisible={isModalVisible}
    >
      {!pressedNavigate && (
        <View className="bg-arbor-bg h-2/5 w-11/12 rounded-2xl flex justify-between items-center p-6">
          <Header textClassNames="text-2xl" title="REDEEM YOUR IMPACT SHARES FOR DISCOUNTS" centered />
          <Text className="text-xl text-center text-gray-600 mb-5">
            Now that you have an impact in your portfolio, Let's redeem your shares!
          </Text>
          <View className="flex flex-row w-2/3 shadow-sm shadow-gray-600">
            <ButtonDisplay
              onPress={() => {
                setPressedNavigate(true);
                setIsModalVisible(false);
              }}
              textClassNames="font-extrabold text-xl"
              text="→ LET'S GO"
            />
          </View>
        </View>
      )}
    </Modal>
  );
}
