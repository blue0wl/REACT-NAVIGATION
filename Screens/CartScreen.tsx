import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { CartContext } from './context/CartContext';
import { Props } from '../Navigation/props';

const getProductImage = (productName: string) => {
  const images: { [key: string]: number } = {
    "Wanna make you *bleep Cake (Whole)": require('../assets/1st_cake.jpg'),
    "...I mean Camaraderie Cake (Whole)": require('../assets/2nd_cake.jpg'),
    "That's the me...Cake (Whole)": require('../assets/3rd_cake.jpg'),
    "Petite and Sweet Short-cake (Whole)": require('../assets/4th_cake.jpg'),
    "Don't embarass me...Like the others Cake (Whole)": require('../assets/5th_cake.jpg'),
    "Mr. Fruity Cake": require('../assets/6th_cake.jpg'),
    "Nonsense Cake (Whole)": require('../assets/7th_cake.jpg'),
    "Wanna try some freaky...cake? (Whole)": require('../assets/8th_cake.jpg'),
    "Ever Tried 'This' One? Cake (Whole)": require('../assets/9th_cake.jpg'),
    "Light as a Feather Cake (Whole)": require('../assets/10th_cake.jpg'),
  };

  return images[productName] || require('../assets/1st_cake.jpg'); // Default image if not found
};

const products = [
  { id: '1', name: "Wanna make you *bleep Cake (Whole)", price: 599 },
  { id: '2', name: "...I mean Camaraderie Cake (Whole)", price: 830 },
  { id: '3', name: "That's the me...Cake (Whole)", price: 355 },
  { id: '4', name: "Petite and Sweet Short-cake (Whole)", price: 455 },
  { id: '5', name: "Don't embarass me...Like the others Cake (Whole)", price: 500 },
  { id: '6', name: "Mr. Fruity Cake", price: 400 },
  { id: '7', name: "Nonsense Cake (Whole)", price: 700 },
  { id: '8', name: "Wanna try some freaky...cake? (Whole)", price: 699 },
  { id: '9', name: "Ever Tried 'This' One? Cake (Whole)", price: 699 },
  { id: '10', name: "Light as a Feather Cake (Whole)", price: 500 },
];

const CartScreen: React.FC<Props> = ({ navigation }) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return <Text>Error: CartContext not found</Text>;
  }

  const { cart, addToCart, removeFromCart, totalPrice, clearCart } = cartContext;

  return (
    <ImageBackground
      source={require('../assets/bg-final.jpg')} 
      style={styles.background}
    >
      <View style={styles.overlay} /> 

      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <View style={styles.titleRow}>
            <Image source={require('../assets/cart.png')} style={styles.logo} />
            <Text style={styles.title}>Shopping Cart</Text>
          </View>
        </View>


        {cart.length === 0 ? (
          <Text>Your cart is empty.</Text>
        ) : (
          <>
            <FlatList
  data={cart} 
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => {
    const productImage = getProductImage(item.name); // Get image using name

    return (
      <View style={styles.cartItem}>
  
      {/* Product Image */}
      <Image source={getProductImage(item.name)} style={styles.productImage} />
    
      {/* Product Details & Quantity Controls */}
      <View style={styles.productContainer}>
    
        {/* Product Name, Price & Quantity */}
        <View style={styles.productTextContainer}>
          <Text style={styles.productText} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.productPrice}>₱{(item.price * item.quantity).toFixed(2)}</Text>
          <Text style={styles.quantityText}>Quantity: {item.quantity}</Text>
        </View>
    
        {/* Plus & Minus Buttons */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => addToCart(item, true)} style={styles.quantityButton}>
            <Text style={styles.AddText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.quantityButton}>
            <Text style={styles.MinText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>    


    );
  }}
/>
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total: ₱{totalPrice.toFixed(2)}</Text>
            </View>

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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#7600bc' },
  titleContainer: { backgroundColor: '#e1b3ff', padding: 15, borderRadius: 8, width: '100%', marginBottom: 10 },
  cartItem: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1},
  productContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1},
  productTextContainer: { flex: 1, flexDirection: 'column', marginRight: 10 },
  quantityControls: { flexDirection: 'row', gap: 10 },
  button: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5 },
  totalContainer: { backgroundColor: '#ccffcc', padding: 10, borderRadius: 8, width: '100%', marginTop: 10 },
  totalText: { fontWeight: 'bold', fontSize: 18, color: '#28a745' },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
  checkoutButton: { backgroundColor: '#7600bc', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  clearButton: { backgroundColor: '#4c00b0', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  clearText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: { backgroundColor: '#af69ed', padding: 5, borderRadius: 5, marginHorizontal: 5 },
  quantityText: { fontSize: 14, color: '#333', marginTop: 2 },
  AddText: { color: '#FFF', fontWeight: 'bold', fontSize: 18, padding: 5 },
  MinText: { color: '#FFF', fontWeight: 'bold', fontSize: 18, padding: 5 },
  productText: { fontSize: 16, fontWeight: 'bold', flexWrap: 'wrap' },
  backButton: { marginBottom: 10, padding: 10, backgroundColor: '#af69ed', borderRadius: 5, width: 80 },
  backText: { fontSize: 16, fontWeight: 'bold', color: '#FFF' },
  logo: { width: 30, height: 30, marginRight: 15, resizeMode: 'contain', flexShrink: 1 },
  titleRow: {flexDirection: 'row', alignItems: 'center'},
  

  background: {
    flex: 1,
    resizeMode: 'cover'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  productImage: {width: 80, height: 80, borderRadius: 8, marginRight: 10, resizeMode: 'cover'},
  productPrice: {fontSize: 14, color: '#555', marginTop: 3},
});

export default CartScreen;
