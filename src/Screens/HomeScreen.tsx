import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ListRenderItem, StyleSheet, Image, TextInput, Dimensions } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/Navigation'; 
import { Product } from '../Model/model'; 


type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    axios
      .get('https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/products.json')
      .then(response => {
        if (response.data.result === 'success') {
          setProducts(response.data.data);
          setFilteredProducts(response.data.data);
        } else {
          setError('Failed to load products');
        }
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <TouchableOpacity style={styles.productContainer} onPress={() => navigation.navigate('ProductDetails', { product: item })}>
      <Image source={{ uri: item.mainImage }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>*{item.price.amount} {item.price.currency}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.searchBar}
        placeholder="Search products..."
        placeholderTextColor="#888888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
  },
  searchBar: {
    height: 40,
    borderColor: '#141E46',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    margin: 8,
    color: '#000000', 
    fontWeight: 'bold',
    
  },
  listContainer: {
    padding: 8,
  },
  productContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#141E46',
    borderRadius: 8,
    alignItems: 'center',
  },
  productImage: {
    width: Dimensions.get('window').width / 2 - 32,
    height: Dimensions.get('window').width / 2 - 32,
    marginBottom: 8,
  },
  productInfo: {
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:"justify",
    color:'#000000'
  },
  productPrice: {
    fontSize: 14,
    color:'#FF0000',
    fontWeight:'bold'
    
  }
  
});

export default HomeScreen;
