import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View, NativeSyntheticEvent, NativeScrollEvent, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';  
import SvgIcon from '@/assets/icon/icon2.svg';

const pages = [
  { image: require('@/assets/images/scren1.png'), text: 'Chat on the platform' },
  { image: require('@/assets/images/screen2.png'), text: 'Collaborate easily' },
  { image: require('@/assets/images/scren3.png'), text: 'Enjoy the experience' },
  { image: require('@/assets/images/scren4.png'), text: 'Discover new features' },
];

const MyScreen: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const DOT_SIZE = width * 0.04;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const goToNextSlide = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < pages.length) {
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
    }
  };

  const goToPage3 = () => {
    router.push('/page3');
  };

  return (
    <View style={[styles.container, { width, height }]}>
      <SvgIcon width={width} height={height} preserveAspectRatio="none" />

      <View style={styles.headerTextContainer}>
        <Text style={[styles.headerText, { fontSize: width * 0.08 }]}>Welcome to</Text>
        <Text style={[styles.headerText, { fontSize: width * 0.1, fontWeight: 'bold' }]}>TEEKA.SA</Text>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {pages.map((page, index) => (
          <View key={index} style={[styles.slide, { width, height }]}>
            <View style={styles.imageWrapper}>
              <Image
                source={page.image}
                style={{
                  width: width * 0.8,
                  height: height * 0.4,
                }}
                resizeMode="contain"
              />
              <Text style={[styles.imageText, { fontSize: width * 0.05 }]}>{page.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.dotsContainer}>
        {pages.map((_, index) => (
          <View
            key={index}
            style={[
              {
                width: DOT_SIZE,
                height: DOT_SIZE,
                borderRadius: DOT_SIZE / 2,
                marginHorizontal: DOT_SIZE * 0.3,
              },
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      {currentIndex < pages.length - 1 && (
        <TouchableOpacity style={styles.nextButton} onPress={goToNextSlide}>
          <Ionicons name="arrow-forward-circle" size={50} color="#33218F" />
        </TouchableOpacity>
      )}

      {currentIndex === pages.length - 1 && (
        <TouchableOpacity style={styles.continueButton} onPress={goToPage3}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  scrollView: { 
    position: 'absolute', 
    top: 0, 
    left: 0 },
  slide: { justifyContent: 'center',
     alignItems: 'center', 
     paddingHorizontal: '5%' },
  imageWrapper: { 
    alignItems: 'center',
     marginTop: 60 
    },
  imageText: {
     marginTop: 10,
      color: '#000' 
    },
  dotsContainer: { flexDirection: 'row',
     justifyContent: 'center',
      position: 'absolute', 
      bottom: '5%',
       width: '100%' },
  activeDot: { 
    backgroundColor: '#33218F', 
    borderColor: '#33218F', 
    borderWidth: 2 },
  inactiveDot: { backgroundColor: 
    '#fff', borderColor: '#33218F', 
    borderWidth: 1 
  },
  headerTextContainer: { position: 'absolute',
     top: '5%', 
     width: '100%', 
     alignItems: 'flex-start', 
     paddingLeft: 40 
    },
  headerText: {
     color: '#fff',
     textAlign: 'left' },
     nextButton: {
     position: 'absolute',
     bottom: '10%', 
     right: 20, 
     zIndex: 10 
    },
  continueButton: {
    position: 'absolute',
    bottom: '18%',
    alignSelf: 'center',
    backgroundColor: '#33218F',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
   
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MyScreen;
