
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeFromCart } from '../Slices/CartSclices';
import Icon from 'react-native-vector-icons/Ionicons';

const CartScreen: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (parseFloat(item.product.price.amount) * item.quantity), 0).toFixed(2);
  };

  const handleRemoveFromCart = (id: string, selectedSize: string) => {
    dispatch(removeFromCart({ id, selectedSize }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.product.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.product.mainImage }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.product.name}</Text>
              <Text style={styles.productPrice}>{item.product.price.amount} {item.product.price.currency}</Text>
              <Text style={styles.productSize}>Size: {item.selectedSize}</Text>
              <View style={styles.quantityContainer}>
                <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => handleRemoveFromCart(item.product.id, item.selectedSize)}
              style={styles.removeButton}
            >
              <Icon name="close-circle-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${getTotalPrice()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Dark blue background
    padding: 10,
  },
  productContainer: {
    flexDirection: 'row',
    backgroundColor: '#1E2A78', // Dark blue card color
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white', // White color for name text
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FCD600', // Dark yellow color for price
    marginBottom: 4,
  },
  productSize: {
    fontSize: 14,
    color: '#90EE90',
    fontWeight:'bold'
  },
  quantityContainer: {
    backgroundColor: 'white', // Same as card color to blend in
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-end',
    marginTop: 4,
   
  },
  productQuantity: {
    fontSize: 14,
    color: 'blue',
    fontWeight:'bold'
  },
  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  totalContainer: {
    padding: 20,
    backgroundColor: '#B22222', // Dark red color for total price container
    borderRadius: 20,
    marginTop: 16,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // White text color for total price
  },
});

export default CartScreen;
