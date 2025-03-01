import { View, Text, StyleSheet, Image, Dimensions, Animated } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import { carouselImages } from '../../data';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const autoPlay = true;
  const autoPlayInterval = 1500;

  useEffect(() => {
    let interval;
    
    if (autoPlay) {
      interval = setInterval(() => {
        if (currentIndex === carouselImages.length - 1) {
          flatListRef.current?.scrollToOffset({
            offset: 0,
            animated: true
          });
          setCurrentIndex(0);
        } else {
          flatListRef.current?.scrollToOffset({
            offset: (currentIndex + 1) * width,
            animated: true
          });
          setCurrentIndex(currentIndex + 1);
        }
      }, autoPlayInterval);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentIndex, autoPlay, autoPlayInterval]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(newIndex);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.carouselItem}>
        <Image
          source={{ uri: item }}
          style={styles.carouselImage}
          resizeMode="cover"
        />
      </View>
    );
  };

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {carouselImages.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width
          ];
          
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: 'clamp'
          });
          
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp'
          });
          
          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                { width: dotWidth, opacity }
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>CityGuide</Text>
        <Text style={styles.tagline}>Descubra o melhor da cidade</Text>
      </View>
      
      <View style={styles.carouselContainer}>
        <Animated.FlatList
          ref={flatListRef}
          data={carouselImages}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          scrollEventThrottle={16}
        />
        {renderDots()}
      </View>
      
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>...</Text>
        <Text style={styles.welcomeText}>
          ...
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 25,
  },
  logoContainer: {
    marginTop: 50,
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: 'white',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0891b2',
  },
  tagline: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  carouselContainer: {
    height: 220,
    marginTop: 16,
  },
  carouselItem: {
    width,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: width - 32,
    height: 200,
    borderRadius: 12,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#0891b2',
    marginHorizontal: 4,
  },
  welcomeContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24,
  },
});