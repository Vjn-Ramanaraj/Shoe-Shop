import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/Store';
import Navigation from './src/Navigation/Navigation';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <View style={styles.screen}>
        <StatusBar backgroundColor="#141E46" barStyle="light-content" />
        <Navigation />
      </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  screen: {
    // color: '#141E46',
    flex: 1,  // Ensures the view takes up the full screen
  }
});
