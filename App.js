import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProfile from './MyProfile';
import ManageShop from './ManageShop';
import Home from './Home';
import { Header } from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen options={{headerShown:false}} name='Home' component={Home}/>
        <Stack.Screen name='MyProfile' component={MyProfile}/>
        <Stack.Screen name='ManageShop' component={ManageShop}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
