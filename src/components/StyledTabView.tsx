import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Route, SceneRendererProps, TabBar, TabBarIndicator, TabBarItem, TabView } from 'react-native-tab-view';

type Props = {
  defaultIndex?: number;
  routes: Route[];
  renderScene: (
    props: SceneRendererProps & {
      route: Route;
    }
  ) => React.ReactNode;
};

export default function StyledTabView({ renderScene, routes, defaultIndex = 0 }: Props) {
  const [index, setIndex] = useState(defaultIndex);

  useEffect(() => {
    if (defaultIndex === 1) {
      setTimeout(() => setIndex(1), 10);
    }
  }, [defaultIndex]);
  return (
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
              <TabBarItem
                {...props}
                labelStyle={{ color: 'black', fontWeight: '800', fontSize: 20, textAlign: 'center' }}
              />
            )}
          />
        )}
      />
    </View>
  );
}
