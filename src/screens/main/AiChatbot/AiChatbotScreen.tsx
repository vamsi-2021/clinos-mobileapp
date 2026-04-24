import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
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
  ChatIcon,
  ChevronDownIcon,
  InvestigateIcon,
  PersonIcon,
  RightArrowIcon,
  SendIcon,
} from '../../../assets/icons';
import GradientIconButton from '../../../components/common/GradientIconButton';
import Markdown from 'react-native-markdown-display';

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

const markdownStyles = {
  body:       { fontSize: 13, color: Colors.textHeading, lineHeight: 20 },
  strong:     { fontWeight: '700' as const, color: Colors.textHeading },
  em:         { fontStyle: 'italic' as const },
  bullet_list:{ marginTop: 4 },
  ordered_list:{ marginTop: 4 },
  list_item:  { marginTop: 2 },
  code_inline:{ backgroundColor: Colors.backgroundScreen, borderRadius: 4, paddingHorizontal: 4, fontFamily: 'monospace', fontSize: 12 },
  fence:      { backgroundColor: Colors.backgroundScreen, borderRadius: 8, padding: 10, fontSize: 12, fontFamily: 'monospace' },
  blockquote: { backgroundColor: Colors.backgroundScreen, borderLeftColor: Colors.primary, borderLeftWidth: 3, paddingHorizontal: 10, marginVertical: 4 },
  hr:         { backgroundColor: Colors.inputBorder, height: 1, marginVertical: 8 },
  heading1:   { fontSize: 18, fontWeight: '700' as const, color: Colors.textHeading, marginBottom: 4 },
  heading2:   { fontSize: 16, fontWeight: '700' as const, color: Colors.textHeading, marginBottom: 4 },
  heading3:   { fontSize: 14, fontWeight: '600' as const, color: Colors.textHeading, marginBottom: 2 },
  link:       { color: Colors.primary },
};

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

        {/* Controls */}
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

        {/* Chat card: messages + input */}
        <View style={styles.chatCard}>
          <ScrollView
            ref={scrollRef}
            style={styles.chatArea}
            contentContainerStyle={styles.chatContent}
            showsVerticalScrollIndicator
            onContentSizeChange={() =>
              scrollRef.current?.scrollToEnd({ animated: false })
            }>
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
          </ScrollView>

          {/* Divider */}
          <View style={styles.inputDivider} />

          {/* Input bar */}
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

      {/* Trial dropdown modal */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPage,
  },
  flex: {
    flex: 1,
  },

  // Controls section
  controls: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textHeading,
  },
  screenSub: {
    fontSize: 13,
    color: Colors.textBody,
    marginTop: 4,
    marginBottom: 16,
    lineHeight: 18,
  },
  fieldLabel: {
    fontSize: 13,
    color: Colors.textMuted,
    marginBottom: 6,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    paddingHorizontal: 14,
    height: 40,
  },
  dropdownText: {
    flex: 1,
    fontSize: 15,
    color: Colors.textHeading,
  },
  dropdownPlaceholder: {
    color: Colors.textMuted,
  },
  tokenInput: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    paddingHorizontal: 14,
    height: 40,
    fontSize: 15,
    color: Colors.textHeading,
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
    backgroundColor: Colors.statusPendingBg,
    borderRadius: 10,
    padding: 8,
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    color: Colors.warning,
    fontWeight: '600',
    lineHeight: 18,
  },

  // Chat card
  chatCard: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: Colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    overflow: 'hidden',
  },
  chatArea: {
    flex: 1,
  },
  inputDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.inputBorder,
  },
  chatContent: {
    padding: 14,
    gap: 12,
  },
  bubble: {
    maxWidth: '70%',
    borderRadius: 12,
    padding: 12,
  },
  botRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    gap: 10,
  },
  botAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.backgroundScreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    flexShrink: 0,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    flexShrink: 0,
  },
  userAvatarText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
  },
  bubbleBot: {
    maxWidth: '80%',
    backgroundColor: Colors.backgroundScreen,
  },
  typingBubble: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  bubbleUser: {
    alignSelf: 'flex-end',
    maxWidth: '80%',
    backgroundColor: Colors.primary,
  },
  msgText: {
    fontSize: 13,
    color: Colors.textHeading,
    lineHeight: 20,
  },
  msgTextUser: {
    color: Colors.white,
  },
  warningItalic: {
    color: Colors.warning,
    fontStyle: 'italic',
  },

  // Input bar
  inputBar: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    paddingHorizontal: 14,
    height: 40,
    fontSize: 14,
    color: Colors.textHeading,
  },
  inputFocused: {
    borderColor: Colors.primary,
    borderWidth: 1.5,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  sendBtnDisabled: {},
  footer: {
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    lineHeight: 16,
  },

  // Dropdown modal
  overlay: {
    flex: 1,
  },
  dropdownSheet: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
  },
  dropdownOption: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: Colors.white,
  },
  dropdownOptionFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  dropdownOptionLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdownOptionSelected: {
    backgroundColor: Colors.secondary,
  },
  dropdownOptionText: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  dropdownOptionTextSelected: {
    color: Colors.white,
    fontWeight: '600',
  },
});
