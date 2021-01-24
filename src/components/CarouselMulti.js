import React, {useState, useEffect, memo} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {Title} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import {useRotation} from '../hooks/useRotation';
import {BASE_PATH_IMG} from '../utils/constants';

const {width} = Dimensions.get('window');
const ITEM_WITH = Math.round(width * 0.3);

const CarouselMulti = (props) => {
  const {data, navigation} = props;

  const orientation = useRotation();

  const [widthDinamic, setWidthDinamic] = useState(width);
  const [sliderWidth, setSliderWidth] = useState(width);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const {width} = Dimensions.get('window');
      setSliderWidth(width);
      const ITEM_WIDTH = Math.round(width * 0.3);
      setWidthDinamic(ITEM_WIDTH);
    }

    return () => (mounted = false);
  }, [orientation]);

  return (
    <Carousel
      layout={'default'}
      data={data}
      renderItem={(item) => <RenderItem data={item} navigation={navigation} />}
      sliderWidth={sliderWidth}
      itemWidth={!widthDinamic ? ITEM_WIDTH : widthDinamic}
      firstItem={1}
      inactiveSlideScale={1}
      inactiveSlideOpacity={1}
    />
  );
};

function RenderItem({data, navigation}) {
  const {id, title, poster_path} = data.item;
  const imageUrl = `${BASE_PATH_IMG}/w500${poster_path}`;

  const onNavigation = () => {
    navigation.navigate('movie', {id});
  };
  return (
    <TouchableWithoutFeedback onPress={onNavigation}>
      <View style={Styles.card}>
        <Image style={Styles.image} source={{uri: imageUrl}} />
        <Title numberOfLines={1} style={Styles.title}>
          {title}
        </Title>
      </View>
    </TouchableWithoutFeedback>
  );
}

const Styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },

  image: {
    width: '85%',
    height: 170,
    borderRadius: 20,
  },
  title: {
    marginHorizontal: 10,
    marginTop: 10,
    fontSize: 16,
  },
});

export default memo(CarouselMulti);
