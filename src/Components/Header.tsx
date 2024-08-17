import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../navigation/Navigation'; 

interface HeaderProps {
  title: string;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartButton}>
        <Icon name="bag-check" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141E46',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 16,
  },
  headerText: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  backButton: {
    padding: 5,
  },
  cartButton: {
    padding: 5,
  },
});

export default Header;
