

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home';
import login from './src/login';
import SignUp from './src/SignUp'


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Login & SingUp APP" component={Home} />
        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="SignUp" component={SignUp} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;