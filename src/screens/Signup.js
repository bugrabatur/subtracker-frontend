import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import zxcvbn from 'zxcvbn';

export default function Signup({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);

  const handleSignup = () => {
    navigation.replace('TabNavigator');
  };

  const passwordStrength = zxcvbn(password).score;

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0: return 'red';
      case 1: return 'orange';
      case 2: return 'yellow';
      case 3: return 'lightgreen';
      case 4: return 'green';
      default: return 'gray';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kaydol</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Ad Soyad</Text>
        <TextInput
          style={styles.input}
          placeholder="Adınızı ve soyadınızı girin"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>E-posta</Text>
        <TextInput
          style={styles.input}
          placeholder="E-postanızı girin"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Şifre</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Şifrenizi girin"
            placeholderTextColor="#aaa"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
            <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#333" />
          </TouchableOpacity>
        </View>

        {password.length > 0 && (
          <>
            <View style={[styles.passwordStrengthBar, { backgroundColor: getPasswordStrengthColor() }]} />
            <Text style={{ color: getPasswordStrengthColor(), textAlign: 'center', marginBottom: 10 }}>
              {['Çok Zayıf', 'Zayıf', 'Orta', 'Güçlü', 'Çok Güçlü'][passwordStrength]}
            </Text>
          </>
        )}

        <Text style={styles.label}>Şifre (Tekrar)</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Şifrenizi tekrar girin"
            placeholderTextColor="#aaa"
            secureTextEntry={!showPasswordAgain}
            value={passwordAgain}
            onChangeText={setPasswordAgain}
          />
          <TouchableOpacity onPress={() => setShowPasswordAgain(!showPasswordAgain)} style={styles.iconContainer}>
            <Icon name={showPasswordAgain ? 'eye-slash' : 'eye'} size={20} color="#333" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Kaydol</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  form: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputPassword: {
    backgroundColor: '#f9f9f9',
    width: '85%',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    paddingLeft: 18,
    paddingBottom: 15,
  },
  passwordStrengthBar: {
    height: 5,
    borderRadius: 5,
    marginVertical: 5,
  },
  signupButton: {
    backgroundColor: '#1E88E5',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

