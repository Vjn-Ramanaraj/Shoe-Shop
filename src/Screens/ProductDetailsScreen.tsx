import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { addToCart } from '../Slices/CartSclices';
import { RootStackParamList } from '../navigation/Navigation';
import { CartItem } from '../Model/model';

type ProductDetailsScreenProps = StackScreenProps<RootStackParamList, 'ProductDetails'>;

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({ route }) => {
  const { product } = route.params;
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      const cartItem: CartItem = {
        id: `${product.id}-${selectedSize}`,
        product,
        selectedSize,
        quantity: 1, // Initial quantity
      };
      dispatch(addToCart(cartItem));
      Alert.alert('Success', 'Product added to cart!', [{ text: 'OK' }]);
    } else {
      Alert.alert('Error', 'Please select a size', [{ text: 'OK' }]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.card}>
        <Image source={{ uri: product.mainImage }} style={styles.image} />
      </View>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.stockStatus}>{product.stockStatus}                                                            <Text style={styles.brand}>{product.brandName}</Text></Text>
      
      <Text style={styles.price}>
        {product.price.amount} {product.price.currency} 
      </Text>
      
      <View style={[styles.colorContainer, { borderColor: product.colour }]}>
        <Text style={[styles.colorText, { color: product.colour }]}>Color: {product.colour}</Text>
      </View>
      <Text style={styles.description}>Description: {'\n\n'}{product.description}</Text>


{product.sizes.length > 0 && (
        <View style={styles.sizeContainer}>
          <Text style={styles.sizeLabel}>Select Size:</Text>
          <View style={styles.sizeOptions}>
            {product.sizes.map(size => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeOption,
                  selectedSize === size && styles.selectedSizeOption
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={styles.sizeText}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartButtonText}>ADD TO BASKET</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 20,
    backgroundColor: '#1E2A78', 
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  brand: {
    fontSize: 18,
    color: '#90EE90',
    textAlign: 'right',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  colorContainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginBottom: 10,
  },
  colorText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FCD600',
    textAlign: 'center',
    marginBottom: 10,
  },
  stockStatus: {
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'left',
    marginBottom: 10,
  },
  colour: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#DBA858',
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
  },
  sizeContainer: {
    marginBottom: 20,
  },
  sizeLabel: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  sizeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  sizeOption: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  selectedSizeOption: {
    borderColor: '#333',
    backgroundColor: 'red', 
  },
  sizeText: {
    fontSize: 16,
    color: '#333',
  },
  addToCartButton: {
    padding: 15,
    height: 60,
    width: 200,
    borderRadius: 50,
    backgroundColor: '#FFF700', 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  addToCartButtonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
});


export default ProductDetailsScreen;
