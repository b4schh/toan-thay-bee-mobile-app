import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../../constants/colors';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import AppText from '../AppText';
import Button from '../button/Button';
import Dialog from '../dialog/Dialog';
import { useRouter } from 'expo-router';

export default function ExamOverviewOverlay({
  sections,
  answers,
  currentSectionIndex,
  currentQuestionIndex,
  onSelectQuestion,
  onClose,
  visible,
  remainingTime,
  handleSubmit,
  saveQuestion,
  errorQuestion,
  markedQuestions,
  isSubmitting = false,
}) {
  const [isCancelModalVisible, setCancelModalVisible] = useState(false);
  const [isSubmitModalVisible, setSubmitModalVisible] = useState(false);
  const router = useRouter();
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get('window').width),
  ).current;

  useEffect(() => {
    if (visible) {
      // Slide in from right
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      // Slide out to right
      Animated.spring(slideAnim, {
        toValue: Dimensions.get('window').width,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    }
  }, [visible]);

  const handleLeave = () => {
    router.replace('practice/'); // Thay 'Home' bằng tên màn hình bạn muốn chuyển đến
  };

  const screenWidth = Dimensions.get('window').width;
  const numColumns = 6;
  const boxSize = (screenWidth - (numColumns - 1) * 8 - 60) / numColumns; // Trừ đi margin và padding tổng

  // Hàm kiểm tra trạng thái "đã làm" thực tế của câu hỏi
  const isQuestionDone = (q) => {
    if (saveQuestion.has(q.id)) {
      return true; // Đã làm
    }
    return false;
  };

  // Hàm xác định màu sắc hiển thị của ô câu hỏi
  const getQuestionStatusColor = (q, sectionIndex, questionIndex) => {
    const isCurrentQuestion =
      sectionIndex === currentSectionIndex &&
      questionIndex === currentQuestionIndex;
    if (isCurrentQuestion) return colors.warning; // Câu đang làm

    const isDone = isQuestionDone(q);
    return isDone ? colors.success : colors.sky.white; // Đã làm hoặc Chưa làm
  };

  // Tính toán số liệu thống kê
  const stats = sections.reduce(
    (acc, section, sIndex) => {
      section.questions.forEach((q, qIndex) => {
        const isDone = isQuestionDone(q);
        const isCurrent =
          sIndex === currentSectionIndex && qIndex === currentQuestionIndex;

        if (isDone) acc.done += 1; // Đã làm (dựa trên trạng thái thực tế)
        if (isCurrent) acc.inProgress += 1; // Đang làm
        if (!isDone) acc.notDone += 1; // Chưa làm
        // Chưa lưu giữ nguyên 0 vì chưa có logic cụ thể
      });
      return acc;
    },
    { done: 0, inProgress: 0, notDone: 0, notSaved: 0 },
  );

  // Hàm tính số thứ tự câu hỏi
  const getQuestionNumber = (sectionIndex, questionIndex) => {
    let count = 0;
    for (let i = 0; i < sectionIndex; i++) {
      count += sections[i].questions.length;
    }
    return count + questionIndex + 1;
  };

  const getUnansweredQuestions = () => {
    const unanswered = [];
    sections.forEach((section, sIndex) => {
      section.questions.forEach((q, qIndex) => {
        if (!isQuestionDone(q)) {
          const questionNumber = getQuestionNumber(sIndex, qIndex);
          unanswered.push(questionNumber);
        }
      });
    });
    return unanswered;
  };

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      {/* Fixed Header */}
      <View style={styles.headerContainer}>
        <AppText style={styles.title}>TIẾN ĐỘ LÀM BÀI</AppText>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Feather name="x" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.timeContainer}>
        <AppText style={{ fontFamily: 'Inter-Bold', fontSize: 18 }}>
          Thời gian còn lại
        </AppText>
        <AppText style={styles.timer}>⏳ {remainingTime}</AppText>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        {sections.map((section, sIndex) => (
          <View key={section.type} style={styles.sectionContainer}>
            <AppText style={styles.sectionTitle}>{section.title}:</AppText>
            <View style={styles.questionsRow}>
              {section.questions.map((q, qIndex) => {
                const bgColor = getQuestionStatusColor(q, sIndex, qIndex);
                const questionNumber = getQuestionNumber(sIndex, qIndex);
                return (
                  <TouchableOpacity
                    key={q.id}
                    style={[
                      styles.questionBox,
                      {
                        width: boxSize,
                        height: boxSize,
                        backgroundColor: bgColor,
                      },
                    ]}
                    onPress={() => onSelectQuestion(sIndex, qIndex)}
                  >
                    <AppText style={{ fontFamily: 'Inter-Medium' }}>
                      {questionNumber}
                    </AppText>
                    {/* Hiển thị icon cờ nếu câu hỏi được đánh dấu */}
                    {markedQuestions.has(q.id) && (
                      <View style={styles.flagContainer}>
                        <Ionicons
                          name="flag"
                          size={20}
                          color={colors.danger}
                          style={styles.flagIcon}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* Chú thích màu sắc với số liệu */}
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: colors.success }]}
            >
              <AppText style={styles.legendNumber}>{stats.done}</AppText>
            </View>
            <AppText style={{ fontFamily: 'Inter-Medium' }}>Đã làm</AppText>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: colors.warning }]}
            >
              <AppText style={styles.legendNumber}>{stats.inProgress}</AppText>
            </View>
            <AppText style={{ fontFamily: 'Inter-Medium' }}>
              Câu hiện tại
            </AppText>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendColor,
                { backgroundColor: colors.sky.white },
              ]}
            >
              <AppText style={styles.legendNumber}>{stats.notDone}</AppText>
            </View>
            <AppText style={{ fontFamily: 'Inter-Medium' }}>Chưa làm</AppText>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor]}>
              <Ionicons name="flag" size={24} color={colors.danger} />
            </View>
            <AppText style={{ fontFamily: 'Inter-Medium' }}>
              Được đánh dấu ({Array.from(markedQuestions).length})
            </AppText>
          </View>
        </View>

        {/* Fixed Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <Button
            text="Rời khỏi"
            style={[styles.button, { backgroundColor: colors.danger }]}
            onPress={() => setCancelModalVisible(true)}
          />
          <Button
            text={isSubmitting ? 'Đang nộp...' : 'Nộp bài'}
            style={[styles.button, isSubmitting && { opacity: 0.7 }]}
            onPress={() => setSubmitModalVisible(true)}
            disabled={isSubmitting}
          />
        </View>
      </ScrollView>

      {/* Modal xác nhận */}
      <Dialog
        visible={isCancelModalVisible}
        title="Bạn muốn thoát?"
        type="custom"
        onClose={() => setCancelModalVisible(false)}
        actions={[
          {
            text: 'Hủy bỏ',
            onPress: () => setCancelModalVisible(false),
            style: {
              backgroundColor: colors.sky.base,
              flex: 1,
            },
            textStyle: {
              color: colors.sky.white,
            },
          },
          {
            text: 'Chắc chắn',
            onPress: handleLeave,
            style: {
              backgroundColor: colors.danger,
              flex: 1,
            },
            textStyle: {
              color: colors.sky.white,
            },
          },
        ]}
      >
        <AppText style={styles.modalMessage}>
          Quá trình làm bài của bạn sẽ bị hủy bỏ
        </AppText>
      </Dialog>

      {/* Thêm Dialog xác nhận nộp bài */}
      <Dialog
        visible={isSubmitModalVisible}
        title="Xác nhận nộp bài"
        type="custom"
        onClose={() => setSubmitModalVisible(false)}
        actions={[
          {
            text: 'Hủy',
            onPress: () => setSubmitModalVisible(false),
            style: {
              backgroundColor: colors.sky.base,
              flex: 1,
            },
            textStyle: {
              color: colors.sky.white,
            },
          },
          {
            text: isSubmitting ? 'Đang nộp...' : 'Nộp bài',
            onPress: () => {
              isSubmitting ? null : handleSubmit();
              setSubmitModalVisible(false);
            },
            disabled: isSubmitting,
            style: {
              backgroundColor: isSubmitting ? colors.sky.base : colors.success,
              flex: 1,
              opacity: isSubmitting ? 0.7 : 1,
            },
            textStyle: {
              color: colors.sky.white,
            },
          },
        ]}
      >
        <AppText style={styles.modalMessage}>
          {(() => {
            const unanswered = getUnansweredQuestions();
            if (unanswered.length > 0) {
              return `Bạn còn các câu ${unanswered.join(', ')} chưa làm, bạn có chắc chắn muốn nộp bài?`;
            }
            return 'Bạn có chắc chắn muốn nộp bài?';
          })()}
        </AppText>
      </Dialog>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    zIndex: 1000,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: colors.sky.lighter,
  },
  timeContainer: {
    alignItems: 'center',
    padding: 8,
    gap: 4,
  },
  timer: {
    fontSize: 20,
    color: colors.danger,
    fontFamily: 'Inter-Bold',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  scrollContent: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 20,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  questionsRow: { flexDirection: 'row', flexWrap: 'wrap' },
  questionBox: {
    marginRight: 10,
    marginBottom: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1, // Thêm viền để ô trắng dễ nhìn hơn
    borderColor: '#ccc',
    position: 'relative', // Để định vị icon cờ
  },
  flagContainer: {
    position: 'absolute',
    top: -8,
    right: -8, // Đặt icon cờ ở góc trên bên phải
    backgroundColor: colors.sky.white,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    elevation: 2,
  },
  flagIcon: {},
  legendContainer: {
    flexWrap: 'wrap',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 8,
  },
  legendColor: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 4,
    borderWidth: 1, // Thêm viền cho ô trắng
    borderColor: '#ccc',
  },
  legendNumber: {
    color: '#000',
    fontFamily: 'Inter-Medium',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 12,
    gap: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: colors.sky.lighter,
  },
  button: {
    flex: 1,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  modalMessage: {
    textAlign: 'center',
    color: colors.ink.dark,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
});
