import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  LoadingOverlay,
  HeaderWithBackButton,
  ExamInfoCard,
  ExamHistory,
  Dialog,
  AppText,
  ExamRegulationModal,
} from '@components/index';
import colors from '../../../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPublicExamById,
  saveExamForUser,
} from '../../../../features/exam/examSlice';
import { fetchAttemptByStudentId } from '../../../../features/attempt/attemptSlice';

export default function ExamDetailScreen() {
  const { id } = useLocalSearchParams();
  const { examDetail, loading } = useSelector((state) => state.exams);

  const router = useRouter();
  const dispatch = useDispatch();

  const { attempts } = useSelector((state) => state.attempts);

  // Dialog state
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogActions, setDialogActions] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  // Chỉ giữ lại một useEffect để fetch dữ liệu
  useEffect(() => {
    // Fetch thông tin đề thi
    dispatch(fetchPublicExamById({ id }));

    // Fetch lịch sử làm bài
    dispatch(fetchAttemptByStudentId({ examId: id }));
  }, [dispatch, id]);

  const handleBookmarkPress = () => {
    dispatch(saveExamForUser({ examId: id }))
      .unwrap()
      .then((response) => {
        // Show success dialog
        const isSaved = response.data.isSave;
        setDialogTitle('Thành công');
        setDialogMessage(
          isSaved ? 'Lưu đề thi thành công' : 'Bỏ lưu đề thi thành công',
        );
        setDialogVisible(true);
        setDialogActions([
          {
            text: 'OK',
            onPress: () => setDialogVisible(false),
            style: {
              backgroundColor: colors.primary,
              flex: 1,
            },
            textStyle: {
              color: colors.sky.white,
            },
          },
        ]);
      })
      .catch((error) => {
        // Show error dialog
        setDialogTitle('Lỗi');
        setDialogMessage(error.message || 'Đã xảy ra lỗi khi lưu đề thi');
        setDialogVisible(true);
      });
  };

  const handleStartExam = () => {
    // Kiểm tra xem người dùng còn lượt làm bài hay không
    if (
      examDetail?.attemptLimit > 0 &&
      examDetail?.userAttemptCount >= examDetail?.attemptLimit
    ) {
      // Hiển thị thông báo nếu đã hết lượt làm bài
      setDialogTitle('Thông báo');
      setDialogMessage('Bạn đã sử dụng hết lượt làm bài cho đề thi này.');
      setDialogVisible(true);
      setDialogActions([
        {
          text: 'OK',
          onPress: () => setDialogVisible(false),
          style: {
            backgroundColor: colors.primary,
            flex: 1,
          },
          textStyle: {
            color: colors.sky.white,
          },
        },
      ]);
      return;
    }

    // Kiểm tra xem có bài thi đang làm dở hay không
    const ongoingAttempt = attempts.find(
      (attempt) => attempt.examId == id && attempt.endTime === null,
    );

    if (ongoingAttempt) {
      setDialogTitle('Thông báo');
      setDialogMessage('Bạn đang làm dở bài thi này, bạn có muốn tiếp tục?');
      setDialogVisible(true);
      setDialogActions([
        {
          text: 'Hủy',
          onPress: () => setDialogVisible(false),
          style: {
            backgroundColor: colors.sky.base,
            flex: 1,
          },
          textStyle: {
            color: colors.sky.white,
          },
        },
        {
          text: 'Tiếp tục',
          onPress: () => {
            setDialogVisible(false);
            router.push(`/exam/${id}/do-exam`);
          },
          style: {
            backgroundColor: colors.success,
            flex: 1,
          },
          textStyle: {
            color: colors.sky.white,
          },
        },
      ]);
      return;
    }

    // Nếu còn lượt làm bài, hiển thị modal quy chế thi
    setIsModalVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {loading && <LoadingOverlay />}
      <HeaderWithBackButton
        title={examDetail?.name}
        onBackPress={() => router.replace('/practice')}
      />
      <View style={styles.content}>
        <ExamInfoCard
          examDetail={examDetail}
          onStartExam={handleStartExam}
          onBookmarkPress={handleBookmarkPress}
        />
        <ExamHistory
          attempts={attempts.filter((attempt) => attempt.endTime !== null)}
          onViewResult={(attemptId) => router.push(`/exam/${attemptId}/result`)}
        />
      </View>

      {/* Dialog for notifications */}
      <Dialog
        visible={dialogVisible}
        title={dialogTitle}
        type="custom"
        onClose={() => setDialogVisible(false)}
        actions={dialogActions}
      >
        <AppText style={{ fontSize: 16, textAlign: 'center' }}>
          {dialogMessage}
        </AppText>
      </Dialog>

      <ExamRegulationModal
        visible={isModalVisible}
        examName={examDetail?.name}
        examDuration={examDetail?.testDuration}
        onClose={() => setIsModalVisible(false)}
        onStart={() => {
          setIsModalVisible(false);
          router.push(`/exam/${id}/do-exam`);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: colors.sky.lightest,
    padding: 20,
    gap: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.ink.darkest,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  selectedCircle: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});
