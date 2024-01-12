import {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Alert, Platform, ToastAndroid} from 'react-native';
import {addNote, editNote, isObjectEmpty} from '../../helpers';

const useEditNote = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {itemData, onGoBack} = route.params;

  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  console.log(isEdit);

  const showToast = message => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(message);
    }
  };

  const navigateBack = async () => {
    Promise.all([onGoBack(), navigation.goBack()]);
  };

  const insertDataToLocal = async () => {
    const preparedData = {
      title,
      description,
    };

    console.log('isEdit', isEdit);
    switch (isEdit) {
      case false:
        Promise.all([
          await addNote(preparedData),
          showToast('Data Securely Added!'),
          await navigateBack(),
        ]);
        return;
      default:
        Promise.all([
          await editNote(itemData.id, preparedData),
          showToast('Your Changes Saved Securely!'),
          await navigateBack(),
        ]);
        return;
    }
  };

  useEffect(() => {
    if (itemData?.id) {
      setTitle(itemData.title);
      setDescription(itemData.description);
      setIsEdit(true);
    }
  }, [itemData]);

  return {
    nav: {
      navigateBack,
    },
    state: {
      title,
      description,
    },
    func: {
      setTitle,
      setDescription,
      insertDataToLocal,
    },
  };
};

export default useEditNote;
