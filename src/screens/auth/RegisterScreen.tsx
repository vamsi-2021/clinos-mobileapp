import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../types/navigation';
import {Colors} from '../../constants/theme';
import {styles} from './RegisterScreen.styles';
import {GlobalStyles} from '../../styles/GlobalStyles';
import GradientBackground from '../../components/common/GradientBackground';
import {StethoscopeIcon, PersonIcon, MailIcon, PasswordIcon, EyeIcon, TrialsIcon, PlaceholderIcon} from '../../assets/icons';

type Role = 'provider' | 'patient';

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Register'>;
};

const RegisterScreen = ({navigation}: RegisterScreenProps) => {
  const [role, setRole] = useState<Role>('provider');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // TODO: Implement registration logic
    Alert.alert('Success', 'Account created successfully');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.inner}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>

        {/* Logo */}
        <View style={styles.logoRow}>
          <GradientBackground style={GlobalStyles.logoBox} width={44} height={44}>
            <TrialsIcon width={26} height={26} stroke={Colors.white} />
          </GradientBackground>
          <Text style={GlobalStyles.logoText}>TrialMatch</Text>
        </View>

        {/* Heading */}
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>Get started with TrialMatch today</Text>

        {/* Role Selector */}
        <Text style={styles.label}>I am a:</Text>
        <View style={styles.roleRow}>
          <TouchableOpacity
            style={[styles.roleCard, role === 'provider' && styles.roleCardSelected]}
            onPress={() => setRole('provider')}
            activeOpacity={0.8}>
            <StethoscopeIcon
              width={28}
              height={28}
              stroke={role === 'provider' ? Colors.primary : Colors.textBody}
              style={styles.roleCardIcon}
            />
            <Text style={[styles.roleCardTitle, role === 'provider' && styles.roleCardTitleSelected]}>
              Healthcare{'\n'}Provider
            </Text>
            <Text style={styles.roleCardSub}>Find trials for your patients</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleCard, role === 'patient' && styles.roleCardSelected]}
            onPress={() => setRole('patient')}
            activeOpacity={0.8}>
            <PlaceholderIcon
              width={28}
              height={28}
              stroke={role === 'patient' ? Colors.primary : Colors.textBody}
              style={styles.roleCardIcon}
            />
            <Text style={[styles.roleCardTitle, role === 'patient' && styles.roleCardTitleSelected]}>
              Patient
            </Text>
            <Text style={styles.roleCardSub}>Find trials for yourself</Text>
          </TouchableOpacity>
        </View>

        {/* Full Name */}
        <Text style={styles.label}>
          {role === 'provider' ? 'Full Name (e.g., Dr. Jane Smith)' : 'Full Name'}
        </Text>
        <View style={GlobalStyles.inputWrapper}>
          <PersonIcon width={18} height={18} stroke={Colors.textMuted} style={GlobalStyles.inputIcon} />
          <TextInput
            style={GlobalStyles.input}
            placeholder={role === 'provider' ? 'Dr. Jane Smith' : 'Jane Smith'}
            placeholderTextColor={Colors.textMuted}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <View style={GlobalStyles.inputWrapper}>
          <MailIcon width={18} height={18} stroke={Colors.textMuted} style={GlobalStyles.inputIcon} />
          <TextInput
            style={GlobalStyles.input}
            placeholder="you@hospital.org"
            placeholderTextColor={Colors.textMuted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <View style={GlobalStyles.inputWrapper}>
          <PasswordIcon width={18} height={18} stroke={Colors.textMuted} style={GlobalStyles.inputIcon} />
          <TextInput
            style={GlobalStyles.input}
            placeholder="••••••••••"
            placeholderTextColor={Colors.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(prev => !prev)}
            style={GlobalStyles.eyeButton}>
            <EyeIcon
              width={20}
              height={20}
              stroke={Colors.textMuted}
              opacity={showPassword ? 0.4 : 1}
            />
          </TouchableOpacity>
        </View>

        {/* Create Account Button */}
        <TouchableOpacity style={GlobalStyles.button} onPress={handleRegister} activeOpacity={0.85}>
          <GradientBackground style={GlobalStyles.buttonGradient}>
            <Text style={GlobalStyles.buttonText}>Create Account</Text>
          </GradientBackground>
        </TouchableOpacity>

        {/* Sign In Link */}
        <TouchableOpacity
          style={GlobalStyles.linkButton}
          onPress={() => navigation.goBack()}>
          <Text style={GlobalStyles.linkText}>
            Already have an account?{' '}
            <Text style={GlobalStyles.linkHighlight}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


export default RegisterScreen;
