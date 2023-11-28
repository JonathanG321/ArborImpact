import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { ProjectWithDonationsAndSpendingReport } from '../../../lib/types';
import ButtonDisplay from '../../components/ButtonDisplay';
import { useState } from 'react';

type Props = {
  project: ProjectWithDonationsAndSpendingReport;
};

export default function SpendingReport({ project }: Props) {
  const [showSpendingReport, setShowSpendingReport] = useState(false);

  return (
    <>
      <View className="w-full flex flex-row my-6">
        <ButtonDisplay
          text={showSpendingReport ? 'HIDE SPENDING REPORT' : 'VIEW SPENDING REPORT'}
          classNames="mx-4"
          textClassNames="font-bold"
          onPress={() => setShowSpendingReport(!showSpendingReport)}
        />
      </View>
      {showSpendingReport && (
        <View className="w-full px-4 mb-5">
          <Text className="text-arbor-grey text-lg">
            {project.donationCurrency} ${project.fundingGoal.toLocaleString('en')} Goal
          </Text>
          <View className="w-full p-4 bg-white shadow-sm rounded-lg shadow-gray-400">
            <View className="flex flex-row justify-between border-b-4">
              <Text className="font-bold text-xl">Item</Text>
              <Text className="font-bold text-xl">Cost</Text>
            </View>
            {project.spendingReport.map((reportItem) => (
              <View key={reportItem.id + reportItem.item} className="flex flex-row justify-between border-b">
                <Text className="text-lg">{reportItem.item}</Text>
                <Text className="text-lg">${reportItem.cost.toLocaleString('en')}</Text>
              </View>
            ))}
            <View className="flex flex-row justify-between border-t-2">
              <Text className="text-lg font-bold">TOTAL</Text>
              <Text className="text-lg font-bold">
                ${project.spendingReport.reduce((total, current) => total + current.cost, 0).toLocaleString('en')}
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
}
