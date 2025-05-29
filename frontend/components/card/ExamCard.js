// components/ExamCard.js
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AppText from '../AppText';
import colors from '../../constants/colors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

// Thêm ảnh mặc định nếu không có imageUrl
// const defaultImage = '../../assets/images/default-image.jpg';

const ExamCard = ({ exam, onPress }) => {
  // Kiểm tra nếu exam là undefined hoặc null
  if (!exam) {
    return null;
  }
  
  const { imageUrl, name, participantsCount, attemptLimit, userAttemptCount } = exam;
  
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image 
        source={imageUrl ? { uri: imageUrl } : require('../../assets/images/default-image.jpg')}
        style={styles.image}
      />
      <View style={styles.body}>
        <AppText
          style={styles.className}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {name || 'Không có tên'}
        </AppText>
        <View style={styles.repsContainer}>
          <FontAwesomeIcon name="user" size={12} color={colors.sky.dark} />
          <AppText style={styles.repsText}>{`${participantsCount || 0} lượt làm`}</AppText>
        </View>
        {attemptLimit > 0 && (
          <View style={styles.attemptsContainer}>
            <FontAwesomeIcon name="refresh" size={12} color={colors.sky.dark} />
            <AppText style={styles.attemptsText}>
              {`${userAttemptCount || 0}/${attemptLimit} lượt của bạn`}
            </AppText>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ExamCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.sky.white,
    width: 168,
    borderRadius: 12,
    padding: 10,
    gap: 8,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    backgroundColor: colors.sky.lighter, // Thêm màu nền cho ảnh
  },
  body: {
    padding: 4,
  },
  className: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: colors.ink.darkest,
    marginBottom: 4,
  },
  repsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  repsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: colors.sky.dark,
  },
  attemptsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  attemptsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: colors.sky.dark,
  }
});
