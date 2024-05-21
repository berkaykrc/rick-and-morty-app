import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import EpisodeScreen from "./src/screens/EpisodeScreen";
import CharacterScreen from "./src/screens/CharacterScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Episodes" component={HomeScreen} />
          <Stack.Screen name="Episode" component={EpisodeScreen} />
          <Stack.Screen name="Character" component={CharacterScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
