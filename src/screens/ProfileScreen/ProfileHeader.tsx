import { View } from 'react-native';
import { WantsItemProps } from '../../../lib/types';
import Avatar from '../../components/Avatar';
import Header from '../../components/Header';
import WantsItem from '../../components/WantsItem';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

export default function ProfileHeader() {
  const { profile } = useContext(UserContext);

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
    <View className="flex flex-row mb-2 mx-4">
      <Avatar classNames="w-16 h-16" image={profile?.avatarImage} />
      <View className="ml-3">
        <Header textClassNames="text-2xl mb-0" centered={false} title={`${profile?.firstName} ${profile?.lastName}`} />
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
  );
}
