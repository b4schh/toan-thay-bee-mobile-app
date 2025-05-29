import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, AppText } from '@components/index';
import colors from '../constants/colors';

const { width, height } = Dimensions.get('window');

export default function Welcome() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(255,255,255,0.9)', 'rgba(230,247,255,0.95)']}
        style={styles.gradient}
      >
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Image
            source={require('../assets/images/icon.png')} // Đường dẫn đến ảnh logo
            style={styles.logo}
            resizeMode="contain"
          />
          <AppText style={styles.brandName}>Toán Thầy Bee</AppText>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <AppText style={styles.welcomeAppText}>Chào mừng đến với</AppText>
          <AppText style={styles.mainTitle}>
            Ứng dụng học Toán thông minh
          </AppText>
          <AppText style={styles.subtitle}>
            Nơi kiến thức toán học trở nên dễ dàng và thú vị
          </AppText>
        </View>

        {/* Button Section */}
        <View style={styles.buttonSection}>
          <Button
            text="Bắt đầu"
            style={styles.button}
            textStyle={styles.buttonText}
            onPress={() => router.push('(auth)/login')}
          />
        </View>
      </LinearGradient>
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: height * 0.1,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 160,
    height: 160,
  },
  brandName: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: colors.primary,
    marginTop: 12,
    AppTextAlign: 'center',
  },
  contentSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeAppText: {
    fontSize: 18,
    color: '#64748B',
    marginBottom: 8,
    textAlign: 'center',
  },
  mainTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 32,
    textAlign: 'center',
    color: '#1E293B',
    marginBottom: 12,
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#64748B',
    lineHeight: 24,
    maxWidth: '80%',
  },
  buttonSection: {
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 28,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    fontSize: 20,
  },
});
