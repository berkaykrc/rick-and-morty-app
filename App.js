import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import { PersistGate } from "redux-persist/integration/react";
import EpisodeScreen from "./src/screens/EpisodeScreen";
import CharacterScreen from "./src/screens/CharacterScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux/store";

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Episodes" component={HomeScreen} />
            <Stack.Screen name="Episode" component={EpisodeScreen} />
            <Stack.Screen name="Character" component={CharacterScreen} />
            <Stack.Screen name="Favorites" component={FavoritesScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
