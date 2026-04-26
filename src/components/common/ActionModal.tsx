import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { Colors } from '../../constants/theme';
import { CheckCircleIcon, CircleXMarkIcon } from '../../assets/icons';
import GradientBackground from './GradientBackground';
import { SvgProps } from 'react-native-svg';

export enum ActionModalType {
  Confirm = 'confirm',
  Ineligible = 'ineligible',
  ApproveCriterion = 'approve_criterion',
}

const CONFIG: Record<ActionModalType, { icon: React.FC<SvgProps>; title: string; btnLabel: string; btnColor: string; btnDisabledColor: string }> = {
  [ActionModalType.Confirm]: {
    icon: CheckCircleIcon,
    title: 'Confirm Eligibility',
    btnLabel: 'Confirm Eligibility',
    btnColor: Colors.statusEligible,
    btnDisabledColor: 'transparent',
  },
  [ActionModalType.Ineligible]: {
    icon: CircleXMarkIcon,
    title: 'Mark Ineligible',
    btnLabel: 'Mark Ineligible',
    btnColor: Colors.statusIneligible,
    btnDisabledColor: '#E8A0A2',
  },
  [ActionModalType.ApproveCriterion]: {
    icon: CheckCircleIcon,
    title: 'Approve Criterion',
    btnLabel: 'Approve Criterion',
    btnColor: Colors.statusEligible,
    btnDisabledColor: '#8BBECE',
  },
};

type Props = {
  visible: boolean;
  type: ActionModalType;
  patientToken?: string;
  onClose: () => void;
  onConfirm: (note: string) => void;
};

const ActionModal = ({ visible, type, patientToken, onClose, onConfirm }: Props) => {
  const [note, setNote] = useState('');
  const [touched, setTouched] = useState(false);

  const { icon: Icon, title, btnLabel, btnColor, btnDisabledColor } = CONFIG[type];
  const isValid = note.trim().length >= 15;

  const handleConfirm = () => {
    setTouched(true);
    if (!isValid) return;
    onConfirm(note);
    setNote('');
    setTouched(false);
  };

  const handleClose = () => {
    setNote('');
    setTouched(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.card}>
          <TouchableOpacity style={styles.close} onPress={handleClose} hitSlop={8}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Icon
              width={20}
              height={20}
              stroke={btnColor}
            />
            <Text style={styles.title}>{title}</Text>
          </View>
          <Text style={styles.subtitle}>
            This action will be recorded in the audit log with full traceability.
          </Text>

          {patientToken ? (
            <View style={styles.patientBox}>
              <Text style={styles.patientLabel}>Patient: </Text>
              <Text style={styles.patientValue}>{patientToken}</Text>
            </View>
          ) : null}

          <Text style={styles.noteLabel}>Clinical Reasoning Note *</Text>
          <TextInput
            style={[
              styles.textarea,
              { borderColor: note.length > 0 ? Colors.primary : Colors.inputBorder },
            ]}
            placeholder="Explain your clinical reasoning for this action..."
            placeholderTextColor={Colors.textMuted}
            multiline
            textAlignVertical="top"
            value={note}
            onChangeText={setNote}
          />
          <View style={styles.noteFooter}>
            {!isValid ? (
              <Text style={styles.validationText}>
                Please enter at least 15 characters explaining your clinical reasoning.
              </Text>
            ) : (
              <View />
            )}
            <Text style={styles.charCount}>{note.length} chars</Text>
          </View>

          <TouchableOpacity
            style={[styles.actionBtn, !isValid && styles.actionBtnDisabled, { backgroundColor: isValid ? btnColor : btnDisabledColor }]}
            onPress={handleConfirm}
            activeOpacity={0.85}
            disabled={!isValid}
          >
            {type !== ActionModalType.Ineligible ?
              <GradientBackground style={{ alignSelf: 'stretch' }}>
                <Text style={styles.actionText}>{btnLabel}</Text>
              </GradientBackground> :
              <Text style={styles.actionText}>{btnLabel}</Text>
            }
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={handleClose} activeOpacity={0.75}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ActionModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 24,
  },
  close: {
    alignSelf: 'flex-end',
    padding: 4,
    marginBottom: 8,
  },
  closeText: {
    fontSize: 16,
    color: Colors.textMuted,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textHeading,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textBody,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 18,
  },
  patientBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundPage,
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  patientLabel: {
    fontSize: 14,
    color: Colors.textBody,
  },
  patientValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textHeading,
  },
  noteLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textHeading,
    marginBottom: 8,
  },
  textarea: {
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 12,
    fontSize: 13,
    color: Colors.textHeading,
    minHeight: 110,
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 6,
    marginBottom: 18,
    gap: 12,
  },
  validationText: {
    flex: 1,
    fontSize: 12,
    color: Colors.statusIneligible,
    lineHeight: 16,
  },
  charCount: {
    fontSize: 12,
    color: Colors.textMuted,
    flexShrink: 0,
  },
  actionBtn: {
    height: 40,
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnDisabled: {
    opacity: 0.4,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.white,
  },
  cancelBtn: {
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.inputBorder,
  },
  cancelText: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.textHeading,
  },
});
