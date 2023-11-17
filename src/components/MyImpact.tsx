import { View } from 'react-native';
import { SDGs } from '../../lib/templates';
import { Project, SDG } from '../../lib/types';
import Header from './Header';
import Avatar from './Avatar';

export default function MyImpact({ projects = [] }: { projects?: Project[] }) {
  const impactedSDGsList = projects.map((project) => project.sdg);
  const sortedImpactedSDGsList = (Object.keys(SDGs) as SDG[]).filter((key) => impactedSDGsList.includes(key));
  return (
    <View className="flex mt-3 items-center">
      <Header textClassNames="text-2xl mb-4" centered title="IMPACTED COMMUNITIES" />
      <View className="flex flex-row flex-wrap">
        {sortedImpactedSDGsList.map((sdg) => (
          <Avatar key={sdg} image={SDGs[sdg]} classNames="h-28 w-28 rounded-xl m-4" />
        ))}
      </View>
    </View>
  );
}
