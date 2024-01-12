import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useEditNote from './useEditNote';
import {emptyState} from '../../assets';
import Button from '../../components/Button';

let contextValue = {};

const EditNoteContext = React.createContext(contextValue);

const EditNote = () => {
  const {nav, func, state} = useEditNote();
  contextValue = {nav, func, state};

  return (
    <EditNoteContext.Provider value={contextValue}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      <View
        style={{
          backgroundColor: '#FFF', // F7F8FA
          padding: 16,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: '#EFEFEF',
        }}>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 16,
            color: '#080808',
            textAlign: 'center',
          }}>
          Note
        </Text>
      </View>
      <ScrollView keyboardDismissMode="on-drag">
        <View style={{marginHorizontal: 16, marginTop: 16}}>
          <View
            style={{backgroundColor: 'white', padding: 8, borderRadius: 16}}>
            <TextInput
              onChangeText={text => func.setTitle(text)}
              value={state.title}
              style={{
                fontWeight: '400',
                fontSize: 16,
                color: '#080808',
              }}
              placeholder="Judul catatan kamu"
            />
          </View>
          <View
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderRadius: 16,
              marginTop: 16,
            }}>
            <TextInput
              multiline
              value={state.description}
              onChangeText={text => func.setDescription(text)}
              style={{
                minHeight: 400,
                fontWeight: '400',
                fontSize: 16,
                color: '#080808',
                textAlignVertical: 'top',
              }}
              placeholder="Deskripsi catatan kamu"
            />
          </View>
          <Button
            onPress={func.insertDataToLocal}
            title="Simpan"
            style={{marginTop: 16}}
          />
        </View>
      </ScrollView>
    </EditNoteContext.Provider>
  );
};

export default EditNote;
