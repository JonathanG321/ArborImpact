import { useState, useContext } from 'react';
import { supabase } from '../../supabase/supabase';
import { Text, View, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, WantsItemProps } from '../../lib/types';
import { LoadingContext } from '../contexts/LoadingContext';
import { ProfileContext } from '../contexts/ProfileContext';
import ScreenContainer from '../components/ScreenContainer';
import Avatar from '../components/Avatar';
import Header from '../components/Header';
import WantsItem from '../components/WantsItem';
import LineBreak from '../components/LineBreak';
import TwinDisplay from '../components/TwinDisplay';
import { TabView, SceneMap, TabBar, TabBarItem, TabBarIndicator } from 'react-native-tab-view';

const FirstRoute = () => (
  <View className="flex mt-3 items-center">
    <Header textClassNames="text-2xl" centered title="UH-OH!" />
    <Text className="text-2xl mb-6 text-[#5a5a5b] text-center">You don't have any projects yet!</Text>
    <Text className="text-2xl mb-6 text-[#5a5a5b] text-center">Click below to start browsing projects!</Text>
    <View className="bg-yellow-300 rounded-lg py-3 px-4">
      <Text className="text-[#5a5a5b] text-lg">Let's Go</Text>
    </View>
  </View>
);

const SecondRoute = () => <View style={{ flex: 1, backgroundColor: '#673ab7' }} />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

type Props = NativeStackScreenProps<RootStackParamList, 'Profile', 'Main'>;

export default function ProfileScreen({ navigation: { replace } }: Props) {
  const { setIsLoading } = useContext(LoadingContext);
  const { setProfile, profile } = useContext(ProfileContext);
  const [index, setIndex] = useState(0);
  const routes = [
    { key: 'first', title: 'MY PROJECTS' },
    { key: 'second', title: 'MY IMPACT' },
  ];

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
      <View className="py-1 self-stretch absolute top-[-35] right-1">
        <Pressable
          className="flex items-center rounded bg-blue-500 active:bg-blue-600 px-2 py-1"
          onPress={async () => {
            setIsLoading(true);
            await supabase.auth.signOut();
            setProfile(null);
            setIsLoading(false);
          }}
        >
          <Text className="text-white text-lg">Sign Out</Text>
        </Pressable>
      </View>
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
        <TwinDisplay text="Balance: USD 1.00" classNames="bg-yellow-300 rounded-lg" />
        <TwinDisplay text="Shares: 0" classNames="bg-blue-800 rounded-lg" textClassNames="text-white" />
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
                <View className="" style={{ height: props.layout.height, width: props.layout.width }}>
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
