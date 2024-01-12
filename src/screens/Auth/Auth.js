import React from 'react';
import {Image, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {heroFingerprint} from '../../assets';
import useAuth from './useAuth';

let contextValue = {};

const AuthContext = React.createContext(contextValue);

const Auth = () => {
  const {nav, func, state} = useAuth();
  contextValue = {nav, func, state};

  return (
    <AuthContext.Provider value={contextValue}>
      <StatusBar backgroundColor="#009043" barStyle="dark-content" />
      <View
        style={{
          height: '100%',
          backgroundColor: '#FFF',
          justifyContent: 'center',
          padding: 16,
        }}>
        <Text
          style={{
            fontWeight: '800',
            fontSize: 32,
            textAlign: 'center',
            color: '#080808',
          }}>
          Simple Secure Note
        </Text>
        <Text style={{marginTop: 12, fontSize: 14, textAlign: 'center'}}>
          Lockbox of Trust - A Personal Vault of Confidential Information
        </Text>
        <View style={{alignItems: 'center', marginTop: 70, marginBottom: 100}}>
          <Image source={heroFingerprint} style={{height: 180, width: 180}} />
        </View>
        <TouchableOpacity
          onPress={func.handleRequestBiometric}
          activeOpacity={0.5}
          style={{backgroundColor: '#009043', padding: 16, borderRadius: 32}}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontWeight: '500', fontSize: 14, color: 'white'}}>
              Unlock Using Biometrics
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={func.handleLinkedInPress}>
          <Text style={{marginTop: 16, fontSize: 12, textAlign: 'center'}}>
            Made with 💖 by Ananda Rizky Yuliansyah{'\n'}for Atask.id Pre-test
          </Text>
        </TouchableOpacity>
      </View>
    </AuthContext.Provider>
  );
};

export default Auth;
