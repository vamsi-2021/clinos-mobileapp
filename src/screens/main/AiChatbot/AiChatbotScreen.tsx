import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../constants/theme';
import AppHeader from '../../../components/common/AppHeader';
import {
  BotIcon,
  ChevronDownIcon,
  InvestigateIcon,
  PersonIcon,
  SendIcon,
} from '../../../assets/icons';
import GradientIconButton from '../../../components/common/GradientIconButton';
import Markdown from 'react-native-markdown-display';
import { styles, markdownStyles } from './AiChatbotScreen.styles';

const BotAvatar = () => (
  <View style={styles.botAvatar}>
    <BotIcon width={18} height={18} stroke={Colors.primary} />
  </View>
);

const UserAvatar = () => (
  <View style={styles.botAvatar}>
    <PersonIcon width={18} height={18} stroke={Colors.black} />
  </View>
);

type Trial = { id: string; label: string };

type Message = {
  id: string;
  role: 'bot' | 'user';
  text: string;
};

const TRIALS: Trial[] = [
  { id: 'FLAURA2',   label: 'FLAURA2 (NCT04035486)' },
  { id: 'CODEBREAK', label: 'CodeBreaK 200 (NCT04303780)' },
  { id: 'DESTINY',   label: 'DESTINY-Breast03 (NCT03529110)' },
  { id: 'PROPEL',    label: 'PROpel (NCT03732820)' },
  { id: 'NIVO',      label: 'Nivo+Talazoparib Melanoma (NCT04187833)' },
];

const INITIAL_BOT_TEXT = `Hello! I'm the **ClinOS Protocol Assistant**.

Select a trial from the dropdown above to get started. I can help you understand eligibility criteria, protocol details, and answer questions about specific trials.

> ⚠️ I cannot render eligibility verdicts — use the Patient Queue for official evaluations.`;

const trialWelcomeText = (trialLabel: string) =>
  `I'm now loaded with the **${trialLabel}** protocol.

To get started, you might want to ask about:

* **Prior Therapy Requirements:** Details on the necessary previous treatments.
* **Biomarker Specifics:** Requirements for specific mutations or excluded biomarkers.
* **Condition Constraints:** Rules regarding performance status or comorbidities.

How can I help you navigate this protocol today?`;

const INITIAL_MESSAGES: Message[] = [
  { id: '0', role: 'bot', text: INITIAL_BOT_TEXT },
];

const AiChatbotScreen = () => {
  const [selectedTrial, setSelectedTrial] = useState<Trial | null>(null);
  const [patientToken, setPatientToken] = useState('');
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ x: 0, y: 0, width: 0 });
  const [inputFocused, setInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const trialBtnRef = useRef<React.ComponentRef<typeof TouchableOpacity>>(null);
  const scrollRef = useRef<ScrollView>(null);

  const openDropdown = () => {
    trialBtnRef.current?.measureInWindow((x, y, width, height) => {
      setDropdownPos({ x, y: y + height + 4, width });
      setDropdownVisible(true);
    });
  };

  const handleSend = () => {
    if (!selectedTrial || !inputText.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText.trim(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 50);
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: `Based on the ${selectedTrial.label} protocol, I'll look into that. Please note that responses cite criterion IDs and cannot render eligibility verdicts.`,
      };
      setIsLoading(false);
      setMessages(prev => [...prev, botMsg]);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
    }, 1000);
  };

  const canSend = !!selectedTrial && inputText.trim().length > 0 && !isLoading;

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>

        <ScrollView
          ref={scrollRef}
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({ animated: false })
          }>

          <View style={styles.controls}>
            <Text style={styles.screenTitle}>AI Protocol Chatbot</Text>
            <Text style={styles.screenSub}>
              RAG-powered protocol Q&A with criterion citations
            </Text>

            <Text style={styles.fieldLabel}>Select Trial</Text>
            <TouchableOpacity
              ref={trialBtnRef}
              style={styles.dropdown}
              activeOpacity={0.8}
              onPress={openDropdown}>
              <Text style={[styles.dropdownText, !selectedTrial && styles.dropdownPlaceholder]}>
                {selectedTrial ? selectedTrial.label : 'Choose a trial for context...'}
              </Text>
              <ChevronDownIcon width={18} height={18} stroke={Colors.textMuted} />
            </TouchableOpacity>

            <Text style={[styles.fieldLabel, { marginTop: 12 }]}>
              Patient Token (optional)
            </Text>
            <TextInput
              style={styles.tokenInput}
              placeholder="e.g., PT-001"
              placeholderTextColor={Colors.textMuted}
              value={patientToken}
              onChangeText={setPatientToken}
            />

            <View style={styles.warningBanner}>
              <InvestigateIcon width={18} height={18} stroke={Colors.warning} />
              <Text style={styles.warningText}>
                Always verify AI responses against the full protocol before acting.
              </Text>
            </View>
          </View>

          <View style={styles.messagesArea}>
            {messages.map(msg =>
              msg.role === 'bot' ? (
                <View key={msg.id} style={styles.botRow}>
                  <BotAvatar />
                  <View style={[styles.bubble, styles.bubbleBot]}>
                    <Markdown style={markdownStyles}>
                      {msg.text}
                    </Markdown>
                  </View>
                </View>
              ) : (
                <View key={msg.id} style={styles.userRow}>
                  <View style={[styles.bubble, styles.bubbleUser]}>
                    <Text style={[styles.msgText, styles.msgTextUser]}>{msg.text}</Text>
                  </View>
                  <UserAvatar />
                </View>
              )
            )}
            {isLoading && (
              <View style={styles.botRow}>
                <BotAvatar />
                <View style={[styles.bubble, styles.bubbleBot, styles.typingBubble]}>
                  <ActivityIndicator size="small" color={Colors.primary} />
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.inputBarOuter}>
          <View style={styles.inputBar}>
            <TextInput
              style={[styles.input, inputFocused && styles.inputFocused]}
              placeholder={
                selectedTrial
                  ? 'Ask about protocol criteria...'
                  : 'Select a trial first to get started.'
              }
              placeholderTextColor={Colors.textMuted}
              value={inputText}
              onChangeText={setInputText}
              editable={!!selectedTrial}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <TouchableOpacity
              style={[styles.sendBtn, !canSend && styles.sendBtnDisabled]}
              activeOpacity={0.8}
              onPress={handleSend}
              disabled={!canSend}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <GradientIconButton icon={<SendIcon />} disabled={!canSend} size={40} iconSize={18} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      <Modal
        visible={dropdownVisible}
        transparent
        animationType="none"
        onRequestClose={() => setDropdownVisible(false)}>
        <Pressable style={styles.overlay} onPress={() => setDropdownVisible(false)}>
          <View
            style={[
              styles.dropdownSheet,
              {
                position: 'absolute',
                top: dropdownPos.y,
                left: dropdownPos.x,
                width: dropdownPos.width,
              },
            ]}>
            {TRIALS.map((trial, index) => {
              const isSelected = selectedTrial?.id === trial.id;
              return (
                <TouchableOpacity
                  key={trial.id}
                  style={[
                    styles.dropdownOption,
                    isSelected && styles.dropdownOptionSelected,
                    index === 0 && styles.dropdownOptionFirst,
                    index === TRIALS.length - 1 && styles.dropdownOptionLast,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectedTrial(trial);
                    setDropdownVisible(false);
                    setMessages([{
                      id: Date.now().toString(),
                      role: 'bot',
                      text: trialWelcomeText(trial.label),
                    }]);
                  }}>
                  <Text
                    style={[
                      styles.dropdownOptionText,
                      isSelected && styles.dropdownOptionTextSelected,
                    ]}>
                    {trial.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default AiChatbotScreen;
