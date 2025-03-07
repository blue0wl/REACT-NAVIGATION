import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ImageBackground, Image } from 'react-native';
import { CartContext } from './context/CartContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/AppNavigator';

type CheckoutScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Checkout'>;

const CheckoutScreen: React.FC = () => {

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
    <ImageBackground
      source={require('../assets/bg-final.jpg')} // Change this to your background image
      style={styles.background}
    >
      {/* Semi-transparent overlay */}
      <View style={styles.overlay} />

      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <View style={styles.titleRow}>
          <Image source={require('../assets/checkout.png')} style={styles.logo} />
          <Text style={styles.title}>Checkout</Text>
          </View>
        </View>

        <FlatList
  data={cart}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => {
    const productImage = getProductImage(item.name);

    return (
      <View style={styles.checkoutItem}>
        {/* Product Image */}
        <Image source={productImage} style={styles.productImage} />

        {/* Product Text & Quantity */}
        <View style={styles.productInfoContainer}>
          <Text style={styles.productText}>
            {item.name} - ₱{(item.price * item.quantity).toFixed(2)}
          </Text>
          <Text style={styles.quantityText}>Quantity: {item.quantity}</Text>
        </View>
      </View>
    );
  }}
/>


        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ₱{totalPrice.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton} onPress={handleConfirmPurchase}>
          <Text style={styles.checkoutText}>Confirm Purchase</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the whole screen
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust opacity (0 = transparent, 1 = solid)
  },
  container: { flex: 1, padding: 20, alignItems: 'stretch' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#7600bc' },
  titleContainer: { backgroundColor: '#e1b3ff', padding: 15, borderRadius: 8, width: '100%', marginBottom: 10 },
  totalContainer: { backgroundColor: '#ccffcc', padding: 10, borderRadius: 8, width: '100%', marginTop: 10, marginBottom: 10 },
  totalText: { fontWeight: 'bold', fontSize: 18, color: '#28a745' },
  checkoutButton: { backgroundColor: '#7600bc', padding: 15, borderRadius: 5, alignItems: 'center' },
  checkoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  checkoutItem: { padding: 10, borderBottomWidth: 1, marginBottom: 10, flexDirection: 'row', alignItems: 'center' },
  productText: { fontSize: 16, fontWeight: 'bold', flexWrap: 'wrap' },
  quantityText: { fontSize: 14, color: '#555', marginTop: 5 },
  backButton: { marginBottom: 10, padding: 10, backgroundColor: '#af69ed', borderRadius: 5, width: 80 },
  backText: { fontSize: 16, fontWeight: 'bold', color: '#FFF' },
  productImage: {width: 80, height: 80, borderRadius: 8, marginRight: 10, resizeMode: 'cover'},
  productInfoContainer: {flex: 1, flexDirection: 'column'},
  logo: { width: 30, height: 30, marginRight: 15, resizeMode: 'contain', flexShrink: 1 },
  titleRow: {flexDirection: 'row', alignItems: 'center'},
});

export default CheckoutScreen;
