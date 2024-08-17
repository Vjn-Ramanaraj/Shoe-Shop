
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import ProductDetailsScreen from '../Screens/ProductDetailsScreen';
import CartScreen from '../Screens/CartScreen';
import Header from '../Components/Header';
import { Product } from '../Model/model';

export type RootStackParamList = {
  Home: undefined;
  ProductDetails: { product: Product };
  Cart: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          header: () => {
            if (route.name === 'Home') {
              return (
                <Header
                  title={route.name}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              );
            } else {
              return <Header title={route.name} />;
            }
          },
        })}
      >
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
        </Stack.Screen>
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
