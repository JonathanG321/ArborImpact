import { useContext } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import ButtonDisplay from '../../../components/ButtonDisplay';
import { ProjectsContext } from '../../../contexts/ProjectsContext';
import { UserContext } from '../../../contexts/UserContext';
import { RootDrawerParamList } from '../../../../lib/types';
import { useNavigation } from '@react-navigation/native';

type Props = {
  isModalVisible: boolean;
  projectName: string;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDonated: React.Dispatch<React.SetStateAction<boolean>>;
  setDonation: React.Dispatch<React.SetStateAction<number>>;
};

export default function DonationModalDonated({
  projectName,
  isModalVisible,
  setDonated,
  setIsModalVisible,
  setDonation,
}: Props) {
  const { navigate } = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const { getProjects } = useContext(ProjectsContext);
  const { getProfile, session } = useContext(UserContext);
  return (
    <Modal
      className="flex items-center"
      onBackdropPress={() => {
        setIsModalVisible(false);
        setDonated(false);
      }}
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={isModalVisible}
    >
      <View className="bg-white h-fit w-full rounded-2xl flex items-center p-10">
        <Text className="text-2xl font-extrabold mb-3 text-center">
          CONGRATULATIONS! YOU HAVE SUCCESSFULLY DONATED TO {projectName.toUpperCase()}
        </Text>
        <Text className="text-xl text-center text-gray-600 mb-5">
          Now that you have donated for your first project, Let's see the impact created on your portfolio.
        </Text>
        <View className="flex flex-row w-1/3">
          <ButtonDisplay
            classNames="w-fit"
            text="→ Let's Go"
            onPress={async () => {
              setIsModalVisible(false);
              setDonated(false);
              setDonation(0);
              await Promise.all([getProjects(), getProfile(session)]);
              navigate('Profile', { startTab: 1 });
            }}
          />
        </View>
      </View>
    </Modal>
  );
}
