import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../types/navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../constants/theme';
import GradientBackground from '../../components/common/GradientBackground';

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
          <View style={styles.logoBox}>
            <Ionicons name="flask" size={26} color={Colors.white} />
          </View>
          <Text style={styles.logoText}>TrialMatch</Text>
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
            <Ionicons
              name="medkit-outline"
              size={28}
              color={role === 'provider' ? Colors.primary : Colors.textBody}
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
            <Ionicons
              name="person-outline"
              size={28}
              color={role === 'patient' ? Colors.primary : Colors.textBody}
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
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={18} color={Colors.textMuted} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={role === 'provider' ? 'Dr. Jane Smith' : 'Jane Smith'}
            placeholderTextColor={Colors.textMuted}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={18} color={Colors.textMuted} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
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
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={18} color={Colors.textMuted} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="••••••••••"
            placeholderTextColor={Colors.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(prev => !prev)}
            style={styles.eyeButton}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={Colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        {/* Create Account Button */}
        <TouchableOpacity style={styles.button} onPress={handleRegister} activeOpacity={0.85}>
          <GradientBackground style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Create Account</Text>
          </GradientBackground>
        </TouchableOpacity>

        {/* Sign In Link */}
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.linkText}>
            Already have an account?{' '}
            <Text style={styles.linkHighlight}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundPage,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPage,
  },
  inner: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingVertical: 48,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  logoBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textHeading,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textHeading,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textBody,
    marginBottom: 28,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textHeading,
    marginBottom: 10,
  },
  roleRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  roleCard: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: Colors.roleCardBorder,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  roleCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  roleCardIcon: {
    marginBottom: 8,
  },
  roleCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textHeading,
    textAlign: 'center',
    marginBottom: 4,
  },
  roleCardTitleSelected: {
    color: Colors.primary,
  },
  roleCardSub: {
    fontSize: 12,
    color: Colors.textBody,
    textAlign: 'center',
    lineHeight: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 20,
    height: 52,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.textHeading,
  },
  eyeButton: {
    padding: 4,
  },
  button: {
    height: 52,
    borderRadius: 12,
    marginTop: 4,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
    letterSpacing: 0.3,
  },
  linkButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  linkText: {
    fontSize: 14,
    color: Colors.textBody,
  },
  linkHighlight: {
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default RegisterScreen;
