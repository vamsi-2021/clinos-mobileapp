import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../types/navigation';
import {useAuth} from '../../context/AuthContext';
import {Colors} from '../../constants/theme';
import {styles} from './LoginScreen.styles';
import {GlobalStyles} from '../../styles/GlobalStyles';
import GradientBackground from '../../components/common/GradientBackground';
import {MailIcon, PasswordIcon, EyeIcon, TrialsIcon} from '../../assets/icons';
import GradientIconButton from '../../components/common/GradientIconButton';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
};

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const {login} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // TODO: Replace with real API call
    login();
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
          <GradientIconButton icon={<TrialsIcon />} />
          <Text style={GlobalStyles.logoText}>TrialMatch</Text>
        </View>

        {/* Heading */}
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Sign in to access your clinical trial matching dashboard
        </Text>

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

        {/* Sign In Button */}
        <TouchableOpacity style={GlobalStyles.button} onPress={handleLogin} activeOpacity={0.85}>
          <GradientBackground style={GlobalStyles.buttonGradient}>
            <Text style={GlobalStyles.buttonText}>Sign In</Text>
          </GradientBackground>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <TouchableOpacity
          style={GlobalStyles.linkButton}
          onPress={() => navigation.replace('Register')}>
          <Text style={GlobalStyles.linkText}>
            Don't have an account?{' '}
            <Text style={GlobalStyles.linkHighlight}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


export default LoginScreen;
