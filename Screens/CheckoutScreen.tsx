import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { CartContext } from './context/CartContext';
import {useNavigation}  from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation/AppNavigator'; 

type CheckoutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Checkout'>;


const CheckoutScreen: React.FC = () => {
  const cartContext = useContext(CartContext);
  const navigation = useNavigation<CheckoutScreenNavigationProp>();

  if (!cartContext) {
    return <Text>Error: CartContext not found</Text>;
  }

  const { cart, totalPrice, clearCart } = cartContext;

  const handleConfirmPurchase = () => {
    Alert.alert(
      "Purchase Successful",
      "Thank you for your purchase!",
      [
        {
          text: "OK",
          onPress: () => {
            clearCart(); // Clear the cart after purchase
            navigation.navigate("Home"); // Redirect to HomeScreen
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.checkoutItem}>
            <Text style={styles.productText}>
              {item.name} - ₱{(item.price * item.quantity).toFixed(2)}
            </Text>
            <Text style={styles.quantityText}>Quantity: {item.quantity}</Text>
          </View>
        )}
      />
      <Text style={styles.total}>Total Price: ₱{totalPrice.toFixed(2)}</Text>

      <TouchableOpacity style={styles.checkoutButton} onPress={handleConfirmPurchase}>
        <Text style={styles.checkoutText}>Confirm Purchase</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  total: { fontSize: 18, marginBottom: 20, fontWeight: 'bold' },
  checkoutButton: { backgroundColor: 'green', padding: 15, borderRadius: 5 },
  checkoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  checkoutItem: { padding: 10, borderBottomWidth: 1, marginBottom: 10 },
  productText: { fontSize: 16, fontWeight: 'bold' },
  quantityText: { fontSize: 14, color: '#555', marginTop: 5 },
});


export default CheckoutScreen;
