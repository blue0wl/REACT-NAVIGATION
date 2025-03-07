import React, { useState, useContext } from 'react';
import { View, TextInput, Text, FlatList, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Props } from '../Navigation/props';
import { CartContext } from '../Screens/context/CartContext';

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

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        return <Text>Error: CartContext not found</Text>;
    }

    const { addToCart, cart } = cartContext;
    const [search, setSearch] = useState('');

    // ✅ Filter products based on search input
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <ImageBackground 
          source={require('../assets/bg-final.jpg')} // Background image
          style={styles.background}
        >
          {/* Dark overlay to improve readability */}
          <View style={styles.overlay} />
      
          <View style={styles.container}>
            {/* Banner with Logo & Title */}
            <View style={styles.titleContainer}>
              <Image source={require('../assets/sc.png')} style={styles.logo} />
              <Text style={styles.titleText}>Oddly Patissiere</Text>
            </View>
      
            {/* Search Bar */}
            <TextInput
              style={styles.searchInput}
              placeholder="Search something sweet..."
              value={search}
              onChangeText={setSearch}
            />
      
            {/* Product List */}
            <FlatList
              data={filteredProducts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.product}>
                  <Image source={getProductImage(item.name)} style={styles.productImage} />
                  <View style={styles.productTextContainer}>
                    <Text style={styles.productText}>{item.name} - ₱{item.price}</Text>
                  </View>
                  <TouchableOpacity onPress={() => addToCart(item)} style={styles.button}>
                    <Text style={styles.buttonText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
      
            {/* Go to Cart Button */}
            <TouchableOpacity
              style={[styles.cartButton, cart.length === 0 && styles.disabledButton]}
              onPress={() => navigation.navigate('Cart')}
              disabled={cart.length === 0} // Disable button when cart is empty
            >
              <Text style={styles.cartButtonText}>Go to Cart</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    searchInput: {
        height: 40, 
        borderColor: '#4c00b0', 
        borderWidth: 1, 
        borderRadius: 5, 
        marginBottom: 10, 
        paddingHorizontal: 10,
        backgroundColor: '#fbeeff'
    },
    product: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: 10, 
        borderBottomWidth: 1, 
        backgroundColor: '#fbeeff' 
    },
    productTextContainer: { flex: 1, flexShrink: 1 },
    cartButton: { 
        backgroundColor: '#7600bc', 
        padding: 15, 
        borderRadius: 5, 
        alignItems: 'center', 
        marginTop: 20 
    },
    disabledButton: { backgroundColor: '#A9A9A9' },
    cartButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
    buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
    button: { backgroundColor: '#7600bc', padding: 10, borderRadius: 5, alignItems: 'center' },
    productText: { fontWeight: 'bold', marginRight: 20 },
    productImage: { width: 80, height: 80, marginRight: 10, borderRadius: 5 },
    titleContainer: { backgroundColor: '#4c00b0', paddingVertical: 10, alignItems: 'center', width: '100%', marginBottom: 15, flexDirection: 'row', justifyContent: 'center'},
    titleText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
    logo: { width: 69, height: 69, marginRight: 10, resizeMode: 'contain', flexShrink: 1 },
    background: {
        flex: 1,
        resizeMode: 'contain', 
        width: '100%',
        height: '100%'},
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Dark overlay
    }
});

export default HomeScreen;
