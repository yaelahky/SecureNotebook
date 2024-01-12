import React from 'react';
import {
  FlatList,
  Image,
  Linking,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useHome from './useHome';
import {emptyState} from '../../assets';
import Button from '../../components/Button';

let contextValue = {};

const HomeContext = React.createContext(contextValue);

const Home = () => {
  const {nav, func, state} = useHome();
  contextValue = {nav, func, state};

  return (
    <HomeContext.Provider value={contextValue}>
      <StatusBar backgroundColor="#F7F8FA" barStyle="dark-content" />
      <View
        style={{
          height: '100%',
          backgroundColor: '#F7F8FA', // F7F8FA
          padding: 16,
        }}>
        <Text
          style={{
            fontWeight: '800',
            fontSize: 38,
            color: '#080808',
          }}>
          Home
        </Text>
        <Text style={{marginTop: 4, fontSize: 14}}>
          Hi, Welcome to Simple Secure Note!
        </Text>
        <FlatList
          data={state.data}
          ListHeaderComponent={<View style={{marginTop: 32}} />}
          ListFooterComponent={<View style={{marginTop: 16}} />}
          keyExtractor={item => item.id}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  padding: 16,
                  paddingTop: 32,
                  backgroundColor: '#FFF',
                  borderRadius: 8,
                }}>
                <Image
                  source={emptyState}
                  style={{height: 260 / 2, width: 464 / 2}}
                />
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 16,
                    color: '#080808',
                    marginTop: 8,
                  }}>
                  Oops, there is no note yet!
                </Text>
                <Text style={{fontSize: 13}}>Lets try to add one.</Text>
                <Button
                  title="Add Note"
                  onPress={nav.navigateToEdit}
                  style={{marginTop: 16, marginBottom: 32}}
                />
              </View>
            );
          }}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => nav.navigateToEdit(item)}
              activeOpacity={0.5}
              style={{
                backgroundColor: '#FFF',
                padding: 16,
                borderRadius: 8,
                marginTop: 16,
              }}>
              <View style={{}}>
                <Text
                  numberOfLines={1}
                  style={{fontWeight: '500', fontSize: 14, color: '#080808'}}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </HomeContext.Provider>
  );
};

export default Home;
