import { useState, useContext } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootDrawerParamList, SDG, WantsItemProps } from '../../lib/types';
import { ProfileContext } from '../contexts/ProfileContext';
import ScreenContainer from '../components/ScreenContainer';
import Avatar from '../components/Avatar';
import Header from '../components/Header';
import WantsItem from '../components/WantsItem';
import LineBreak from '../components/LineBreak';
import ButtonDisplay from '../components/ButtonDisplay';
import { TabView, SceneMap, TabBar, TabBarItem, TabBarIndicator } from 'react-native-tab-view';
import { SDGs } from '../../lib/templates';
import { Image } from 'react-native-elements';

type Props = NativeStackScreenProps<RootDrawerParamList, 'Profile', 'Main'>;

export default function ProfileScreen({
  navigation: {},
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
    first: () => (
      <View className="flex mt-3 items-center">
        <Header textClassNames="text-2xl" centered title="UH-OH!" />
        <Text className="text-2xl mb-6 text-[#5a5a5b] text-center">You don't have any projects yet!</Text>
        <Text className="text-2xl mb-6 text-[#5a5a5b] text-center">Click below to start browsing projects!</Text>
        <View className="bg-arbor-yellow rounded-lg py-3 px-4">
          <Text className="text-[#5a5a5b] text-lg">Let's Go</Text>
        </View>
      </View>
    ),
    second: () => {
      const impactedSDGsList = profile?.projects.map((project) => project.sdg) || [];
      const sortedImpactedSDGsList = (Object.keys(SDGs) as SDG[]).filter((key) => impactedSDGsList.includes(key));
      return (
        <View className="flex mt-3 items-center">
          <Header textClassNames="text-2xl mb-4" centered title="IMPACTED COMMUNITIES" />
          {sortedImpactedSDGsList.map((sdg) => (
            <Image
              key={sdg}
              source={SDGs[sdg]}
              className="h-28 w-28 rounded-xl m-4"
              PlaceholderContent={<ActivityIndicator />}
            />
          ))}
        </View>
      );
    },
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
        <ButtonDisplay text="Balance: USD 1.00" classNames="ml-4 mr-2" />
        <ButtonDisplay text="Shares: 0" classNames="bg-arbor-blue ml-2 mr-4" textClassNames="text-white" />
      </View>
      <LineBreak />
      <View className="h-full px-4">
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
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
