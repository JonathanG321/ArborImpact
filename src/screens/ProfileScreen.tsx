import { useState, useContext, useEffect } from 'react';
import { View } from 'react-native';
import { TabView, SceneMap, TabBar, TabBarItem, TabBarIndicator } from 'react-native-tab-view';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { DonationWithProject, RootDrawerParamList, WantsItemProps } from '../../lib/types';
import { ProfileContext } from '../contexts/ProfileContext';
import ScreenContainer from '../components/ScreenContainer';
import Avatar from '../components/Avatar';
import Header from '../components/Header';
import WantsItem from '../components/WantsItem';
import LineBreak from '../components/LineBreak';
import ButtonDisplay from '../components/ButtonDisplay';
import NoProjectsPlaceholder from '../components/NoProjectsPlaceholder';
import MyImpact from '../components/MyImpact';
import MyProjects from '../components/MyProjects';

type Props = DrawerScreenProps<RootDrawerParamList, 'Profile', 'Main'>;

export default function ProfileScreen({
  navigation: { navigate },
  route: {
    params: { startTab },
  },
}: Props) {
  const { profile } = useContext(ProfileContext);
  const [index, setIndex] = useState<number>(startTab);
  const routes = [
    { key: 'first', title: 'MY PROJECTS' },
    { key: 'second', title: 'MY IMPACT' },
  ];

  const renderScene = SceneMap({
    first: () =>
      !profile?.projects ? <NoProjectsPlaceholder navigate={navigate} /> : <MyProjects projects={profile?.projects} />,
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
  profile?.donations.forEach((donation) => {
    if (!donationsByProject[donation.projectId]) {
      donationsByProject[donation.projectId] = [];
    }
    donationsByProject[donation.projectId].push(donation);
  });

  const shares = Object.keys(donationsByProject)
    .map((projectKey) => {
      const totalDonation = donationsByProject[projectKey].reduce((total, donation) => total + donation.donation, 0);
      return (totalDonation / donationsByProject[projectKey][0].project.fundingGoal) * 100;
    })
    .reduce((total, currentShares) => total + currentShares, 0);

  useEffect(() => {
    setIndex(startTab);
  }, []);

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
        <ButtonDisplay text={`Balance: USD $${profile?.balance.toFixed(2)}`} classNames="ml-4 mr-2" />
        <ButtonDisplay
          text={`Shares: ${Math.floor(shares)}`}
          classNames="bg-arbor-blue ml-2 mr-4"
          textClassNames="text-white"
        />
      </View>
      <LineBreak />
      <View className="h-full px-4">
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={(newI) => {
            if (!!profile?.projects) {
              setIndex(newI);
            } else {
              setIndex(0);
            }
          }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={{ backgroundColor: 'transparent' }}
              renderIndicator={(props) => (
                <View style={{ height: props.layout.height, width: props.layout.width }}>
                  <TabBarIndicator {...props} style={{ backgroundColor: 'black', height: 3, marginBottom: 10 }} />
                </View>
              )}
              renderTabBarItem={(props) => (
                <TabBarItem {...props} labelStyle={{ color: 'black', fontWeight: '800', fontSize: 20 }} />
              )}
            />
          )}
        />
      </View>
    </ScreenContainer>
  );
}
