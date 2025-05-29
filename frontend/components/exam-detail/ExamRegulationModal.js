import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from '../AppText';
import Dialog from '../dialog/Dialog';
import colors from '../../constants/colors';

export default function ExamRegulationModal({
  visible,
  examName,
  examDuration,
  onClose,
  onStart,
}) {
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <Dialog
      visible={visible}
      title="Quy chế thi"
      type="custom"
      onClose={onClose}
      actions={[
        {
          text: 'Hủy',
          onPress: onClose,
          style: {
            backgroundColor: colors.sky.base,
            flex: 1,
          },
          textStyle: {
            color: colors.sky.white,
          },
        },
        {
          text: 'Bắt đầu làm bài',
          onPress: () => {
            onClose();
            onStart();
          },
          style: {
            backgroundColor: isAgreed ? colors.success : colors.disabled,
            flex: 1,
          },
          textStyle: {
            color: colors.sky.white,
          },
          disabled: !isAgreed, // Chỉ cho phép nhấn khi đã đồng ý
        },
      ]}
    >
      <View style={{ padding: 20 }}>
        {/* Tên đề thi */}
        <AppText style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Tên đề thi: {examName || 'Đang tải...'}
        </AppText>

        {/* Thời gian làm bài */}
        <AppText style={{ fontSize: 16, marginBottom: 20 }}>
          Thời gian làm bài: {examDuration || 'Đang tải...'} phút
        </AppText>

        {/* Nội dung quy chế thi */}
        <AppText style={{ fontSize: 16, marginBottom: 20 }}>
          Vui lòng đọc và đồng ý với quy chế thi trước khi bắt đầu:
        </AppText>
        <AppText
          style={{ fontSize: 14, marginBottom: 20, color: colors.ink.darkest }}
        >
          1. Thí sinh không được phép sử dụng tài liệu trong quá trình làm bài.
          {'\n'}2. Thí sinh không được phép rời khỏi màn hình thi quá 3 lần.
          {'\n'}3. Thí sinh phải nộp bài trước khi hết thời gian làm bài.
          {'\n'}4. Mọi hành vi gian lận sẽ bị xử lý theo quy định.
        </AppText>

        {/* Radio button đồng ý */}
        <TouchableOpacity
          style={styles.radioCircle}
          onPress={() => setIsAgreed(!isAgreed)}
        >
          {isAgreed && <View style={styles.innerCircle} />}
        </TouchableOpacity>
        <AppText style={{ marginLeft: 10, fontSize: 16 }}>
          Tôi đồng ý với quy chế thi
        </AppText>
      </View>
    </Dialog>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: 'transparent', // Đường tròn ngoài không có màu nền
    borderColor: colors.primary, // Đường viền ngoài có màu chính
    position: 'relative',
  },
  innerCircle: {
    height: 10, // Kích thước hình tròn nhỏ
    width: 10,
    borderRadius: 5, // Đảm bảo hình tròn
    backgroundColor: colors.primary, // Màu nền của hình tròn nhỏ
  },
});
