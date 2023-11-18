import { View } from 'react-native';
import { Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ProjectWithDonations, RootDrawerParamList } from '../../lib/types';
import ButtonDisplay from './ButtonDisplay';
import LineBreak from './LineBreak';
import FormattedInput, { FormattedInputProps } from './FormattedInput';
import { useContext } from 'react';
import { ProjectsContext } from '../contexts/ProjectsContext';
import { UserContext } from '../contexts/UserContext';

interface DonationModalProps extends FormattedInputProps {
  donated: boolean;
  setDonated: React.Dispatch<React.SetStateAction<boolean>>;
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleDonation: () => Promise<void>;
  navigation: DrawerNavigationProp<RootDrawerParamList, 'Project', undefined>;
  project: ProjectWithDonations;
}

export default function DonationModal({
  donation,
  donated,
  setDonated,
  isModalVisible,
  setDonation,
  setIsModalVisible,
  handleDonation,
  navigation,
  project,
}: DonationModalProps) {
  const { getProjects } = useContext(ProjectsContext);
  const { getProfile, session } = useContext(UserContext);

  if (donated) {
    return (
      <Modal
        className="flex items-center"
        onBackdropPress={() => {
          setIsModalVisible(false);
          setDonated(false);
        }}
        animationOut="fadeOut"
        isVisible={isModalVisible}
      >
        <View className="bg-white h-fit w-full rounded-2xl flex items-center p-10">
          <Text className="text-2xl font-extrabold mb-3 text-center">
            CONGRATULATIONS! YOU HAVE SUCCESSFULLY DONATED TO {project.name.toUpperCase()}
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
                navigation.jumpTo('Profile', { startTab: 1 });
              }}
            />
          </View>
        </View>
      </Modal>
    );
  }
  return (
    <Modal
      className="flex items-center"
      onBackdropPress={() => {
        setIsModalVisible(false);
        setDonated(false);
      }}
      isVisible={isModalVisible}
    >
      <View className="bg-arbor-bg h-4/6 w-11/12 rounded-2xl flex justify-between items-center p-6">
        <View className="flex items-center w-full">
          <Text className="text-2xl font-extrabold mb-3">{project.name.toUpperCase()}</Text>
          <LineBreak classNames="border-gray-400 mb-16" />
          <View className="shadow py-5 px-7 w-full bg-white flex flex-row flex-wrap justify-center">
            <Text className="font-bold text-lg text-center">I would like to donate</Text>
            <FormattedInput
              donation={donation}
              setDonation={(newValue) => {
                const totalDonated = project.donations.reduce((total, donation) => total + donation.donation, 0);
                const remainingFunding = project.fundingGoal - totalDonated;
                const newDonation = parseFloat(newValue.toString()) > remainingFunding ? remainingFunding : newValue;
                setDonation(newDonation);
              }}
            />
            <Text className="font-bold text-lg text-center">
              {project.donationCurrency} to {project.name}. Contributing{' '}
              {((donation / project.fundingGoal) * 100).toFixed(0)}% of the funding goal of $
              {project.fundingGoal.toLocaleString()} {project.donationCurrency}, receiving ### impact shares.
            </Text>
          </View>
        </View>
        <View className="flex flex-row mb-6">
          <ButtonDisplay
            textClassNames="text-xl text-white font-bold"
            classNames="bg-arbor-blue"
            text="COMPLETE TRANSACTION"
            onPress={async () => await handleDonation()}
          />
        </View>
      </View>
    </Modal>
  );
}
