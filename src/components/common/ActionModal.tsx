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
import { styles } from './ActionModal.styles';
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

  const { icon: Icon, title, btnLabel, btnColor, btnDisabledColor } = CONFIG[type];
  const isValid = note.trim().length >= 15;

  const handleConfirm = () => {
    if (!isValid) return;
    onConfirm(note);
    setNote('');
  };

  const handleClose = () => {
    setNote('');
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
