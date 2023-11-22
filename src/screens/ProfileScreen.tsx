import { useState, useContext, useEffect } from 'react';
import { Alert, View } from 'react-native';
import { TabView, SceneMap, TabBar, TabBarItem, TabBarIndicator } from 'react-native-tab-view';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { DonationWithProject, RootDrawerParamList, WantsItemProps } from '../../lib/types';
import ScreenContainer from '../components/ScreenContainer';
import Avatar from '../components/Avatar';
import Header from '../components/Header';
import WantsItem from '../components/WantsItem';
import LineBreak from '../components/LineBreak';
import ButtonDisplay from '../components/ButtonDisplay';
import NoProjectsPlaceholder from '../components/NoProjectsPlaceholder';
import MyImpact from '../components/MyImpact';
import MyProjects from '../components/MyProjects';
import { UserContext } from '../contexts/UserContext';
import Queries from '../../lib/supabaseQueries';
import { cn } from '../../lib/utils';
import StyledTabView from '../components/StyledTabView';

type Props = DrawerScreenProps<RootDrawerParamList, 'Profile', 'Main'>;

export default function ProfileScreen({
  navigation: { navigate },
  route: {
    params: { startTab },
  },
}: Props) {
  const { profile, session, setProfile } = useContext(UserContext);
  // const [index, setIndex] = useState<number>(startTab);
  const routes = [
    { key: 'first', title: 'MY PROJECTS' },
    { key: 'second', title: 'MY IMPACT' },
  ];

  const renderScene = SceneMap({
    first: () =>
      profile?.projects?.length ? (
        <MyProjects projects={profile?.projects} />
      ) : (
        <NoProjectsPlaceholder navigate={navigate} />
      ),
    second: () => <MyImpact projects={profile?.projects} />,
  });

  const wantsItemProps: WantsItemProps[] = [
    ...(profile?.wantDifferenceWorld
      ? [{ description: 'I WANT TO MAKE A DIFFERENCE IN THE WORLD', icon: 'globe-outline' }]
      : []),
    ...(profile?.wantDiversifyPortfolio
      ? [{ description: 'I WANT TO DIVERSIFY MY PORTFOLIO', icon: 'briefcase', type: 'font-awesome' }]
      : []),
    ...(profile?.wantTaxIncentives ? [{ description: 'I AM INTERESTED IN TAX INCENTIVES', icon: 'cash-outline' }] : []),
    ...(profile?.wantSpecificCause ? [{ description: 'I AM PASSIONATE ABOUT A SPECIFIC CAUSE', icon: 'heart' }] : []),
  ];

  const donationsByProject: { [key: string]: DonationWithProject[] } = {};
  if (profile && profile.donations && profile.donations.length) {
    profile.donations.forEach((donation) => {
      if (!donationsByProject[donation.projectId]) {
        donationsByProject[donation.projectId] = [];
      }
      donationsByProject[donation.projectId].push(donation);
    });
  }

  const shares = Object.keys(donationsByProject)
    .map((projectKey) => {
      const totalDonation = donationsByProject[projectKey].reduce((total, donation) => total + donation.donation, 0);
      return (totalDonation / donationsByProject[projectKey][0].project.fundingGoal) * 100;
    })
    .reduce((total, currentShares) => total + currentShares, 0);

  return (
    <ScreenContainer>
      <View className="flex flex-row mb-2 mx-4">
        <Avatar classNames="w-16 h-16" image={profile?.avatarImage} />
        <View className="ml-3">
          <Header
            textClassNames="text-2xl mb-0"
            centered={false}
            title={`${profile?.firstName} ${profile?.lastName}`}
          />
          {wantsItemProps.map((props) => (
            <View key={props.description} className="flex flex-row items-center mb-2 w-11/12">
              <WantsItem
                key={props.description}
                {...props}
                descriptionClassName="font-normal text-xs"
                iconSize={19}
                iconColor="#5a5a5b"
              />
            </View>
          ))}
        </View>
      </View>
      <LineBreak />
      <View className="my-2 flex flex-row justify-around mb-4">
        {profile && profile.balance > 0 ? (
          <ButtonDisplay text={`Balance: USD $${profile?.balance.toFixed(2)}`} classNames="ml-4 mr-2" />
        ) : (
          <ButtonDisplay
            onPress={
              profile?.requestingFunds
                ? undefined
                : async () => {
                    const res = await Queries.requestFunds(session?.user.id);
                    if (res && res.error) {
                      Alert.alert(res.error.message);
                      return;
                    } else if (!profile) {
                      Alert.alert('No Profile Found');
                      return;
                    }
                    setProfile({ ...profile, requestingFunds: true });
                  }
            }
            text={profile?.requestingFunds ? 'Refill Requested' : 'Request refill'}
            classNames={cn('ml-4 mr-2', {
              'bg-green-500': profile?.requestingFunds,
              'bg-red-500': !profile?.requestingFunds,
            })}
          />
        )}
        <ButtonDisplay
          text={`Shares: ${Math.floor(shares)}`}
          classNames="bg-arbor-blue ml-2 mr-4"
          textClassNames="text-white"
        />
      </View>
      <LineBreak />
      <StyledTabView renderScene={renderScene} routes={routes} defaultIndex={startTab} />
    </ScreenContainer>
  );
}
