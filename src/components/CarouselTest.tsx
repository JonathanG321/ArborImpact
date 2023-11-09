import * as React from 'react';
import { Dimensions, ScaledSize, StyleProp, View } from 'react-native';
import type { ViewStyle, ViewProps } from 'react-native';
import { Text } from 'react-native-elements';
import Animated from 'react-native-reanimated';
import type { AnimateProps } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useHeaderHeight } from '@react-navigation/elements';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

const window: ScaledSize = Dimensions.get('window');

const PAGE_WIDTH = window.width;
const PAGE_HEIGHT = window.height;

function CarouselTest() {
  const ref = React.useRef<ICarouselInstance>(null);
  const headerHeight = useHeaderHeight();
  const data = [...new Array(4).keys()];

  return (
    <View className="h-full">
      <Carousel
        height={PAGE_HEIGHT - headerHeight}
        width={PAGE_WIDTH}
        style={{ height: '100%', width: '100%' }}
        loop={false}
        vertical
        ref={ref}
        testID={'xxx'}
        autoPlay={false}
        autoPlayInterval={2000}
        data={data}
        mode="parallax"
        pagingEnabled={true}
        renderItem={({ index }) => <SBItem key={index} index={index} />}
      />
    </View>
  );
}

export default CarouselTest;

export interface ISButtonProps {
  visible?: boolean;
  onPress?: () => void;
}

interface Props extends AnimateProps<ViewProps> {
  style?: StyleProp<ViewStyle>;
  index?: number;
  pretty?: boolean;
}

export const SBItem: React.FC<Props> = (props) => {
  const { style, index, pretty, testID, ...animatedViewProps } = props;
  const enablePretty = Constants?.expoConfig?.extra?.enablePretty || false;
  const [isPretty, setIsPretty] = React.useState(pretty || enablePretty);
  return (
    <LongPressGestureHandler
      onActivated={() => {
        setIsPretty(!isPretty);
      }}
    >
      <Animated.View testID={testID} style={{ flex: 1 }} {...animatedViewProps}>
        {isPretty ? (
          <SBImageItem style={style} index={index} showIndex={typeof index === 'number'} />
        ) : (
          <SBTextItem style={style} index={index} />
        )}
      </Animated.View>
    </LongPressGestureHandler>
  );
};

import type { ImageURISource } from 'react-native';
import { StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useWindowDimensions } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  index?: number;
  showIndex?: boolean;
}

const SBImageItem: React.FC<Props> = ({ style, index: _index, showIndex = true }) => {
  const index = (_index || 0) + 1;
  const source = React.useRef<ImageURISource>({
    uri: `https://picsum.photos/id/${index}/400/300`,
  }).current;

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="small" />
      <Image key={index} style={styles.image} source={source} />
      <Text
        style={{
          position: 'absolute',
          color: 'white',
          fontSize: 40,
          backgroundColor: '#333333',
          borderRadius: 5,
          overflow: 'hidden',
          paddingHorizontal: 10,
          paddingTop: 2,
        }}
      >
        {showIndex ? index : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

interface Props {
  style?: StyleProp<ViewStyle>;
  index?: number;
}

export const SBTextItem: React.FC<Props> = ({ style, index }) => {
  return (
    <View style={[stylesTextItem.container, style]}>
      {typeof index === 'number' && <Text style={{ fontSize: 30, color: 'black' }}>{index}</Text>}
    </View>
  );
};

const stylesTextItem = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'red',
  },
});
