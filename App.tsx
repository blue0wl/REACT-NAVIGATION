import { Text, View, Image, ScrollView, Pressable, StatusBar, Platform } from 'react-native';
import './Stylesheet';
import AppNavigator from './Navigation/AppNavigator';
import { CartProvider } from './Screens/context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <View style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
        <StatusBar barStyle="dark-content" />
        <AppNavigator />
      </View>
    </CartProvider>
  );
}