import {SafeAreaView} from 'react-native';
import React from 'react';
import MainNavigation from './src/Navigator/MainNavigator';

import {PersistGate} from 'redux-persist/integration/react';

import {connect, Provider} from 'react-redux';
import reduxStore from './src/Store/store';

export default function App() {
  const {store, persistor} = reduxStore();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainNavigation />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
}
