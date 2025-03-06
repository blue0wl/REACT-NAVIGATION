import React, { useState, useContext } from 'react';
import { View, TextInput, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Props } from '../Navigation/props'
import { CartContext } from '../Screens/context/CartContext';

const products = [
    { id: '1', name: 'Product A', price: 10 },
    { id: '2', name: 'Product B', price: 20 },
    { id: '3', name: 'Product C', price: 30 },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        return <Text>Error: CartContext not found</Text>;
    }

    const { addToCart, cart } = cartContext;

    const [search, setSearch] = useState('');

    // Filter products based on search input
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <TextInput
                style={styles.searchInput}
                placeholder="Search products..."
                value={search}
                onChangeText={setSearch}
            />

            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.product}>
                        <Text>{item.name} - ₱{item.price}</Text>
                        <Button title="Add to Cart" onPress={() => addToCart(item)} />
                    </View>
                )}
            />
             <TouchableOpacity
                style={[styles.cartButton, cart.length === 0 && styles.disabledButton]}
                onPress={() => navigation.navigate('Cart')}
                disabled={cart.length === 0} // Disable button when cart is empty
            >
                <Text style={styles.cartButtonText}>Go to Cart</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    searchInput: {height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 10, paddingHorizontal: 10},
    product: { marginBottom: 10, padding: 10, backgroundColor: '#f9f9f9' },
    cartButton: {backgroundColor: '#007BFF', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 20},
    disabledButton: { backgroundColor: '#A9A9A9'},
    cartButtonText: {color: '#FFF', fontWeight: 'bold', fontSize: 18},
});

export default HomeScreen;
