import {useNavigation} from '@react-navigation/native';
import ReactNativeBiometrics from 'react-native-biometrics';
import {Alert, Linking, Platform, ToastAndroid} from 'react-native';

const useAuth = () => {
  const navigation = useNavigation();

  const showToast = message => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(message);
    }
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const handleRequestBiometric = async () => {
    const rnBiometrics = new ReactNativeBiometrics();

    const {available} = await rnBiometrics.isSensorAvailable();

    if (available) {
      rnBiometrics
        .simplePrompt({promptMessage: 'Verifikasi dengan sidik jari'})
        .then(() => {
          showToast('Biometric authentication success');
          navigateToHome();
        })
        .catch(err => {
          console.log(err);
          showToast('Biometric authentication failed');
        });
    } else {
      showToast('Biometric authentication not supported');
    }
  };

  const handleLinkedInPress = () => {
    Linking.openURL('https://www.linkedin.com/in/ananda-rizky-yuliansyah');
  };

  return {
    nav: {
      navigateToHome,
    },
    state: {},
    func: {
      handleRequestBiometric,
      handleLinkedInPress,
    },
  };
};

export default useAuth;
