import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getAllNotes} from '../../helpers';
import EncryptedStorage from 'react-native-encrypted-storage';

const useHome = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);

  const getData = async () => {
    const dataNotes = await getAllNotes();
    setData(dataNotes);
  };

  const navigateToEdit = itemData => {
    navigation.navigate('EditNote', {itemData, onGoBack: getData});
  };

  useEffect(() => {
    getData();
  }, [navigation]);

  return {
    nav: {
      navigateToEdit,
    },
    state: {
      data,
    },
    func: {},
  };
};

export default useHome;
