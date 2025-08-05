import SvgIcon from '@/assets/icon/icon2.svg';
import { useThemeColor } from '@/components/useThemeColors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

const pages = [
  { image: require('@/assets/images/scren1.png'), text: 'Enjoy the experience' },
  { image: require('@/assets/images/screen2.png'), text: 'Collaborate easily' },
  { image: require('@/assets/images/scren3.png'), text: 'Purchase easily' },
  { image: require('@/assets/images/scren4.png'), text: 'Chat On The Platform' },
];

const MyScreen: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { colors } = useThemeColor();
  const DOT_SIZE = width * 0.04;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const goToNextSlide = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < pages.length) {
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setCurrentIndex(nextIndex);
    }
  };

  const goToPage3 = () => {
    router.push('/(navigation)/(apps)');
  };

  // ⏱️ Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < pages.length - 1) {
        scrollRef.current?.scrollTo({ x: (currentIndex + 1) * width, animated: true });
        setCurrentIndex((prev) => prev + 1);
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={[styles.container, { width, height, backgroundColor: colors.background }]}>
      <SvgIcon width={width} height={height} preserveAspectRatio="none" />

      <View style={styles.headerTextContainer}>
        <Text style={[styles.headerText, { fontSize: width * 0.08, color: colors.whiteText }]}>
          Welcome to
        </Text>
        <Text
          style={[
            styles.headerText,
            { fontSize: width * 0.1, fontWeight: 'bold', color: colors.whiteText },
          ]}
        >
          TEEKA.SA
        </Text>
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
              <Text
                style={[styles.imageText, { fontSize: width * 0.05, color: colors.text }]}
              >
                {page.text}
              </Text>
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
              currentIndex === index
                ? {
                    backgroundColor: colors.primary,
                    borderColor: colors.primary,
                    borderWidth: 2,
                  }
                : {
                    backgroundColor: colors.background,
                    borderColor: colors.primary,
                    borderWidth: 1,
                  },
            ]}
          />
        ))}
      </View>

      {currentIndex === pages.length - 1 && (
        <TouchableOpacity
          style={[styles.continueButton, { backgroundColor: colors.primary }]}
          onPress={goToPage3}
        >
          <Text style={[styles.continueButtonText, { color: colors.whiteText }]}>Start</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  imageWrapper: {
    alignItems: 'center',
    marginTop: 60,
  },
  imageText: {
    marginTop: 10,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '5%',
    width: '100%',
  },
  headerTextContainer: {
    position: 'absolute',
    top: '5%',
    width: '100%',
    alignItems: 'flex-start',
    paddingLeft: 40,
  },
  headerText: {
    textAlign: 'left',
  },
  continueButton: {
    position: 'absolute',
    bottom: '18%',
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MyScreen;
