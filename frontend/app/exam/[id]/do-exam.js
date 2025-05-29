import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublicQuestionsByExamId } from '../../../features/question/questionSlice';
import {
  LatexRenderer,
  AppText,
  Button,
  ExamOverviewOverlay,
  ExamHeader,
  QuestionContent,
  QuestionStatements,
  LoadingOverlay,
  Dialog,
} from '@components/index';

import colors from '../../../constants/colors';
import { fetchAnswersByAttempt } from '../../../features/answer/answerSlice';
import {
  fetchPublicExamById,
  submitExam,
} from '../../../features/exam/examSlice';
import {
  joinExam,
  selectAnswerTN,
  selectAnswerDS,
  selectAnswerTLN,
  onExamStarted,
  onAnswerSaved,
  onAnswerError,
  setupDebugListener,
  cleanupSocketListeners,
} from '../../../services/socketExam';

export default function DoExamScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { questions } = useSelector((state) => state.questions);
  const { answers } = useSelector((state) => state.answers);
  const { examDetail, isSubmitting, submitResult, submitError } = useSelector(
    (state) => state.exams,
  );
  const { loading } = useSelector((state) => state.states);

  // Cập nhật ref mỗi khi exam thay đổi
  useEffect(() => {
    if (!examDetail || examDetail?.id !== id) {
      dispatch(fetchPublicExamById({ id }));
    }
  }, [dispatch, id]);

  const [isStarted, setIsStarted] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isOverviewVisible, setIsOverviewVisible] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [attemptId1, setAttemptId1] = useState(null);
  const [answerTN, setAnswerTN] = useState([]);
  const [answerTLN, setAnswerTLN] = useState([]);
  const [answerDS, setAnswerDS] = useState({});

  const [saveQuestion, setSaveQuestion] = useState(new Set());
  const [errorQuestion, setErrorQuestion] = useState(new Set());
  const [markedQuestions, setMarkedQuestions] = useState(new Set());

  const tnQuestions = questions?.filter((q) => q.typeOfQuestion === 'TN') || [];
  const dsQuestions = questions?.filter((q) => q.typeOfQuestion === 'DS') || [];
  const tlnQuestions =
    questions?.filter((q) => q.typeOfQuestion === 'TLN') || [];
  const [tlnInput, setTlnInput] = useState('');

  const sections = [
    { type: 'TN', questions: tnQuestions, title: 'Phần Trắc Nghiệm' },
    { type: 'DS', questions: dsQuestions, title: 'Phần Đúng Sai' },
    { type: 'TLN', questions: tlnQuestions, title: 'Phần Trả Lời Ngắn' },
  ].filter((section) => section.questions.length > 0); // Lọc các phần có câu hỏi

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentSection = sections[currentSectionIndex] || { questions: [] };
  const currentQuestion = currentSection.questions[currentQuestionIndex] || {};

  const isFirstQuestion =
    currentSectionIndex === 0 && currentQuestionIndex === 0;

  const isLastQuestion =
    currentSectionIndex === sections.length - 1 &&
    currentQuestionIndex === currentSection.questions.length - 1;

  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (!user) {
      Alert.alert('Lỗi', 'Vui lòng đăng nhập để làm bài');
      router.replace('/login');
      return;
    }
  }, [user]);

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (currentSectionIndex > 0) {
      const prevSectionIndex = currentSectionIndex - 1;
      const prevSection = sections[prevSectionIndex];
      setCurrentSectionIndex(prevSectionIndex);
      setCurrentQuestionIndex(prevSection.questions.length - 1);
    }
  };

  const goToNext = () => {
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min} phút ${sec} giây`;
  };

  const addQuestion = (questionId) => {
    setSaveQuestion((prev) => new Set(prev).add(Number(questionId)));
  };

  const addErrorQuestion = (questionId) => {
    setErrorQuestion((prev) => new Set(prev).add(Number(questionId)));
  };

  const removeQuestion = (questionId) => {
    setSaveQuestion((prev) => {
      const updated = new Set(prev);
      updated.delete(questionId);
      return updated;
    });
  };

  const removeErrorQuestion = (questionId) => {
    setErrorQuestion((prev) => {
      const updated = new Set(prev);
      updated.delete(questionId);
      return updated;
    });
  };

  const toggleMarkQuestion = (questionId) => {
    setMarkedQuestions((prev) => {
      const updated = new Set(prev);
      if (updated.has(questionId)) {
        updated.delete(questionId); // Bỏ đánh dấu
      } else {
        updated.add(questionId); // Đánh dấu
      }
      return updated;
    });
  };

  const getQuestionNumber = () => {
    let count = 0;
    for (let i = 0; i < currentSectionIndex; i++) {
      count += sections[i].questions.length;
    }
    return count + currentQuestionIndex + 1;
  };

  const handleAutoSubmit = () => {
    if (!attemptId1 || !examDetail?.testDuration) return;
    setSaveQuestion(new Set());
    setErrorQuestion(new Set());
  
    dispatch(submitExam({ attemptId: attemptId1 }))
      .unwrap()
      .then(() => {
        Alert.alert('Thành công', 'Bài thi đã được nộp thành công!');
        router.replace(`/exam/${attemptId1}/result`);
      })
      .catch((error) => {
        console.error('Lỗi khi nộp bài:', error);
        Alert.alert('Lỗi', error.message || 'Có lỗi xảy ra khi nộp bài');
      });
  };

  const handleSubmit = () => {
    if (!attemptId1) return;
    setSaveQuestion(new Set());
    setErrorQuestion(new Set());
    
    dispatch(submitExam({ attemptId: attemptId1 }))
      .unwrap()
      .then(() => {
        Alert.alert('Thành công', 'Bài thi đã được nộp thành công!');
        router.replace(`/exam/${attemptId1}/result`);
      })
      .catch(error => {
        console.error('Lỗi khi nộp bài:', error);
        Alert.alert('Lỗi', error.message || 'Có lỗi xảy ra khi nộp bài');
      });
  };

  useEffect(() => {
    if (!isStarted) {
      handleStartExam();
    }
  }, [isStarted]);

  const handleStartExam = () => {
    if (!user) {
      Alert.alert('Lỗi', 'Vui lòng đăng nhập để làm bài');
      router.replace('/login');
      return;
    }

    joinExam({ studentId: user.id, examId: id }, (message) => {
      alert('Lỗi', message);
      router.replace('/home');
    }).catch((error) => {
      Alert.alert('Lỗi', error.message);
    });
  };

  const handleSelectAnswerTN = (questionId, statementId, type) => {
    const payload = {
      attemptId: attemptId1,
      questionId,
      answerContent: statementId,
      studentId: user.id, // nếu cần xác định user
      type,
      examId: id,
      name: user.lastName + ' ' + user.firstName,
    };
    const newAnswer = {
      questionId,
      answerContent: statementId,
      typeOfQuestion: type,
    };
    setAnswerTN((prev) => {
      const filtered = prev.filter((a) => a.questionId !== questionId);
      return [...filtered, newAnswer];
    });

    selectAnswerTN(payload);
  };

  const handleSelectAnswerDS = (questionId, statementId, selectedAnswer) => {
    setAnswerDS((prev) => {
      const currentAnswers = prev[questionId] || [];

      const existing = currentAnswers.find(
        (ans) => ans.statementId === statementId,
      );

      // 🔁 Nếu đáp án đã giống thì không gửi lại
      if (existing && existing.answer === selectedAnswer) {
        return prev;
      }

      const updatedAnswers = currentAnswers.map((ans) =>
        ans.statementId === statementId
          ? { ...ans, answer: selectedAnswer }
          : ans,
      );

      // Nếu chưa có statement này
      if (!existing) {
        updatedAnswers.push({ statementId, answer: selectedAnswer });
      }

      const newState = {
        ...prev,
        [questionId]: updatedAnswers,
      };

      // ✨ Gửi toàn bộ lên server
      selectAnswerDS({
        questionId,
        answerContent: newState[questionId],
        studentId: user.id,
        attemptId: attemptId1,
        type: 'DS',
        examId: id,
        name: user.lastName + ' ' + user.firstName,
      });

      return newState;
    });
  };

  const handleSelectQuestion = (sectionIndex, questionIndex) => {
    setCurrentSectionIndex(sectionIndex);
    setCurrentQuestionIndex(questionIndex);
    setIsOverviewVisible(false); // Đóng overlay sau khi chọn câu hỏi
  };

  const handleSelectAnswerTLN = (questionId, answerContent, type) => {
    const trimmed = answerContent?.trim(); // Xóa khoảng trắng đầu và cuối

    if (!trimmed) return; // Nếu không có nội dung thì không gửi

    // Kiểm tra nếu nội dung giống với trước đó thì không cần gửi
    const existing = answerTLN.find((a) => a.questionId === questionId);
    if (existing?.answerContent === trimmed) return;

    // Cập nhật local state
    const newAnswer = {
      questionId,
      answerContent: trimmed,
      typeOfQuestion: type,
    };
    setAnswerTLN((prev) => {
      const filtered = prev.filter((a) => a.questionId !== questionId);
      return [...filtered, newAnswer];
    });

    // Emit socket
    const payload = {
      attemptId: attemptId1,
      questionId,
      answerContent: trimmed,
      studentId: user.id,
      type,
      examId: id,
      name: user.lastName + ' ' + user.firstName,
    };
    selectAnswerTLN(payload);
  };

  useEffect(() => {
    const defaultValue =
      answerTLN.find((a) => a.questionId === currentQuestion.id)
        ?.answerContent || '';
    setTlnInput(defaultValue);
  }, [currentQuestion.id]);

  useEffect(() => {
    if (answers) {
      setAnswerTN(answers.filter((answer) => answer.typeOfQuestion === 'TN'));
      setAnswerTLN(answers.filter((answer) => answer.typeOfQuestion === 'TLN'));

      const answerDS = {};
      answers.forEach((answer) => {
        if (answer.typeOfQuestion === 'DS' && answer.answerContent) {
          try {
            if (!answer.answerContent) return;
            const parsed = JSON.parse(answer.answerContent);
            answerDS[answer.questionId] = parsed;
          } catch (err) {
            console.error('Lỗi parse DS answerContent:', err);
          }
        }
      });
      setAnswerDS(answerDS);
    }
  }, [answers]);

  useEffect(() => {
    answerTN?.map((answer) => {
      if (answer.answerContent) {
        addQuestion(answer.questionId);
      }
    });
    answerTLN?.map((answer) => {
      if (answer.answerContent) {
        addQuestion(answer.questionId);
      }
    });
    Object.keys(answerDS)?.forEach((questionId) => {
      const answers = answerDS[questionId];
      if (answers.length === 4) {
        addQuestion(questionId);
      }
    });
  }, [answerTN, answerTLN, answerDS]);

  useEffect(() => {
    if (!attemptId1 || !examDetail?.testDuration) return;
    if (remainingTime <= 0) return handleAutoSubmit();
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [remainingTime, attemptId1, examDetail?.testDuration]);

  useEffect(() => {
    const cleanup = setupDebugListener();
    return cleanup;
  }, []);

  useEffect(() => {
    if (!examDetail) return;

    const handleExamStartedCallback = ({ attemptId, startTime }) => {
      console.log('Exam started:', attemptId, startTime);
      setIsStarted(true);

      try {
        if (examDetail?.testDuration && startTime) {
          const start = new Date(startTime);
          const now = new Date();
          const elapsedSeconds = Math.floor((now - start) / 1000);
          const totalSeconds = examDetail.testDuration * 60;
          const remaining = Math.max(totalSeconds - elapsedSeconds, 0);
          setRemainingTime(remaining);
        }
      } catch (err) {
        console.error('Lỗi khi tính toán thời gian còn lại:', err);
      }
      setAttemptId1(attemptId);
      if (attemptId) {
        dispatch(fetchAnswersByAttempt(attemptId));
      }
      if (id) {
        dispatch(fetchPublicQuestionsByExamId(id));
      }
    };

    const cleanup = onExamStarted(handleExamStartedCallback);
    return cleanup;
  }, []);

  useEffect(() => {
    const handleAnswerSaved = ({ questionId }) => {
      addQuestion(questionId);
      removeErrorQuestion(questionId);
    };

    const handleAnswerError = ({ questionId }) => {
      addErrorQuestion(questionId);
      removeQuestion(questionId);
    };

    // Setup event listeners
    const cleanupAnswerSaved = onAnswerSaved(handleAnswerSaved);
    const cleanupAnswerError = onAnswerError(handleAnswerError);

    return () => {
      cleanupAnswerSaved();
      cleanupAnswerError();
    };
  }, [isStarted]);

  useEffect(() => {
    console.log('Đã lưu câu hỏi:', Array.from(saveQuestion));
    console.log('Đã lưu câu hỏi lỗi:', Array.from(errorQuestion));
  }, [saveQuestion, errorQuestion]);

  // Close overlay when submit is successful
  useEffect(() => {
    if (submitResult) {
      setIsOverviewVisible(false);
    }
  }, [submitResult]);

  // Cleanup all socket listeners when component unmounts
  useEffect(() => {
    return () => {
      cleanupSocketListeners();
    };
  }, []);

  if (loading) {
    return (
      <>
        <LoadingOverlay></LoadingOverlay>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 20 }}>Đang chuẩn bị bài thi...</Text>
        </View>
      </>
    );
  }

  return (
    <View style={styles.mainContainer}>
      {isStarted ? (
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 50 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Tên đề, thời gian, menu icon */}
          {/* <View style={styles.headerContainer}>
            <AppText
              style={styles.examName}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {exam?.name.toUpperCase()}
            </AppText>
            <Text style={styles.timer}>{formatTime(remainingTime)} phút</Text>
            <Button
              icon="menu"
              iconLibrary="Feather"
              iconColor={colors.ink.darkest}
              style={[
                {
                  width: 'auto',
                  height: 'auto',
                  backgroundColor: 'transparent',
                  marginTop: 3,
                },
              ]}
              onPress={() => setIsOverviewVisible(true)} // Mở overlay
            />
          </View> */}
          <ExamHeader
            examName={examDetail?.name || 'Đang tải...'}
            remainingTime={formatTime(remainingTime)}
            onMenuPress={() => setIsOverviewVisible(true)}
          />
          {/* Button chuyển câu */}
          <View style={styles.navigationContainer}>
            <Button
              text="Câu trước"
              style={[
                styles.navButton,
                isFirstQuestion && styles.disabledButton,
              ]}
              onPress={goToPrevious}
              disabled={isFirstQuestion}
            />
            <Button
              text="Câu tiếp theo"
              style={[
                styles.navButton,
                isLastQuestion && styles.disabledButton,
              ]}
              onPress={goToNext}
              disabled={isLastQuestion}
            />
          </View>

          {/* Câu hỏi */}
          <QuestionContent
            sectionTitle={currentSection?.title}
            questionNumber={getQuestionNumber()}
            questionContent={currentQuestion?.content}
            questionImage={currentQuestion?.imageUrl}
          />

          {/* Lựa chọn */}
          <QuestionStatements
            type={currentSection?.type}
            question={currentQuestion}
            answerTN={answerTN}
            answerDS={answerDS}
            onSelectAnswerTN={handleSelectAnswerTN}
            onSelectAnswerDS={handleSelectAnswerDS}
            onSelectAnswerTLN={handleSelectAnswerTLN}
            tlnInput={tlnInput}
            setTlnInput={setTlnInput}
          />

          {/* Nút đánh dấu câu hỏi */}
          <Button
            text={
              markedQuestions.has(currentQuestion.id)
                ? 'Bỏ đánh dấu'
                : 'Đánh dấu'
            }
            style={{
              width: 120,
              marginVertical: 20,
              backgroundColor: markedQuestions.has(currentQuestion.id)
                ? '#facc15'
                : '#10b981',
            }}
            onPress={() => toggleMarkQuestion(currentQuestion.id)}
          />
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 20 }}>Đang chuẩn bị bài thi...</Text>
        </View>
      )}

      <ExamOverviewOverlay
        visible={isOverviewVisible}
        sections={sections}
        answers={answers}
        remainingTime={formatTime(remainingTime)}
        currentSectionIndex={currentSectionIndex}
        currentQuestionIndex={currentQuestionIndex}
        onSelectQuestion={handleSelectQuestion}
        onClose={() => setIsOverviewVisible(false)}
        handleSubmit={handleSubmit}
        saveQuestion={saveQuestion}
        errorQuestion={errorQuestion} // Truyền vào danh sách câu hỏi đã lưu
        markedQuestions={markedQuestions} // Truyền danh sách câu hỏi được đánh dấu
        isSubmitting={isSubmitting}
      />

      {isSubmitModalVisible && (
        <Dialog
          visible={isSubmitModalVisible}
          title="Thông báo"
          type="custom"
          onClose={() => setIsSubmitModalVisible(false)}
          actions={[
            {
              text: 'Đóng',
              onPress: () => {
                setIsSubmitModalVisible(false);
              },
              style: {
                backgroundColor: colors.primary,
                flex: 1,
              },
              textStyle: {
                color: colors.sky.white,
              },
            },
          ]}
        >
          <AppText style={{ fontSize: 16, textAlign: 'center' }}>
            {submitMessage}
          </AppText>
        </Dialog>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: colors.sky.white,
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between', // Đẩy button sang phải
    marginVertical: 12,
  },
  examName: {
    flex: 1,
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: colors.ink.darkest,
    textAlign: 'left',
    lineHeight: 30,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 16,
  },
  navButton: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: colors.ink.darkest,
    textAlign: 'center',
    marginBottom: 4,
  },
  questionNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.ink.darkest,
  },
  questionContent: {
    fontSize: 18,
    color: colors.ink.darker,
    marginVertical: 4,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.ink.darkest,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    color: colors.ink.darker,
  },
  dsContainer: {
    gap: 12,
  },
  trueFalseContainer: {
    gap: 10,
  },
  statementText: {
    fontSize: 18,
    color: colors.ink.darker,
  },
  trueFalseButtons: {
    flexDirection: 'row',
  },
  trueFalseButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  selectedButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.ink.darker,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.ink.darkest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCircle: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});
