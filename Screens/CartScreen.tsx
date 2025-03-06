import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { CartContext } from './context/CartContext';
import { Props } from '../Navigation/props';

const CartScreen: React.FC<Props> = ({ navigation }) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return <Text>Error: CartContext not found</Text>;
  }

  const { cart, addToCart, removeFromCart, totalPrice, clearCart } = cartContext;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {cart.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
  data={cart}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.productText}>{item.name} - ₱{(item.price * item.quantity).toFixed(2)}</Text>
      <Text style={styles.quantityText}>Quantity: {item.quantity}</Text>
      <View style={styles.quantityContainer}>
      <TouchableOpacity onPress={() => addToCart(item, true)} style={styles.quantityButton}>
          <Text style={styles.AddText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.quantityButton}>
          <Text style={styles.MinText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  )}
/>

          <Text style = {styles.totalText}>Total: ₱{totalPrice.toFixed(2)}</Text>

          <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Checkout', { cart })}>
            <Text style={styles.buttonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </>
      )}

      {cart.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
          <Text style={styles.clearText}>Clear Cart</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  cartItem: { padding: 10, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  quantityControls: { flexDirection: 'row', gap: 10 },
  button: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5 },
  totalText: {fontWeight: 'bold', fontSize: 18},
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
  checkoutButton: { backgroundColor: '#28a745', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  clearButton: { backgroundColor: '#DC3545', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  clearText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
  quantityContainer: {flexDirection: 'row', alignItems: 'center'},
  quantityButton: {backgroundColor: '#007BFF', padding: 5, borderRadius: 5, marginHorizontal: 5},
  quantityText: {fontSize: 14, color: '#555', marginTop: 5},
  AddText: {color: '#FFF', fontWeight: 'bold', fontSize: 18, padding: 5},
  MinText: {color: '#FFF', fontWeight: 'bold', fontSize: 18, padding: 5},
  productText: {fontSize: 16, fontWeight: 'bold'},
});

export default CartScreen;
