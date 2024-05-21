# Rick & Morty App

This is a React Native application that uses the Rick & Morty API to display information about the characters and episodes of the show. The app follows the SOLID principles and includes features such as pagination, search, and favorite character selection.

## Project Structure

The project has the following directory structure:

```
rick-and-morty-app
├── src
|   ├── components
|   |   ├── EpisodeCard.js
|   |   ├── CharacterCard.js
|   |   ├── Pagination.js
|   |   └── SearchBar.js
|   ├── screens
|   |   ├── HomeScreen.js
|   |   ├── EpisodeScreen.js
|   |   ├── CharacterScreen.js
|   |   └── FavoritesScreen.js
|   ├── redux
|   |   ├── store.js
|   ├── services
|   |   └── api.js
|   ├── utils
|   |   └── AsyncStorage.js
├── App.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Components

### EpisodeCard

The `EpisodeCard` component displays the details of an episode. It receives the episode data as props and renders the episode name, air date, and episode number.

### CharacterCard

The `CharacterCard` component displays the details of a character. It receives the character data as props and renders the character name, image, status, species, and gender.

### Pagination

The `Pagination` component handles pagination functionality for the lists. It receives the total number of items and the current page as props, and provides buttons for navigating to the previous and next pages.

### SearchBar

The `SearchBar` component provides a search input field for filtering the list of items. It receives a search function as a prop and calls the function with the search query when the user types in the input field.

## Screens

### HomeScreen

The `HomeScreen` component displays the list of episodes using pagination. It fetches the episode data from the API and renders the `EpisodeCard` components for each episode. The user can navigate to the `EpisodeScreen` by clicking on an episode.

### EpisodeScreen

The `EpisodeScreen` component displays the details of a selected episode and lists the characters in that episode. It fetches the episode data and character data from the API and renders the episode details along with the `CharacterCard` components for each character. The user can navigate to the `CharacterScreen` by clicking on a character.

### CharacterScreen

The `CharacterScreen` component displays the details of a selected character. It fetches the character data from the API and renders the character details using the `CharacterCard` component.

### FavoritesScreen

The `FavoritesScreen` component displays the list of favorite characters. It retrieves the favorite character data from AsyncStorage and renders the `CharacterCard` components for each favorite character. The user can remove characters from the favorites list by clicking on the remove button.

## Redux

The Redux store is configured in the `store.js` file. It includes the necessary middleware and reducers.


## Services

The `api.js` file exports functions for making API requests to retrieve data from the Rick & Morty API. It includes functions for fetching episodes, characters, and individual character details etc.

## Utils

The `AsyncStorage.js` file exports functions for storing and retrieving data from AsyncStorage. It includes functions for managing the favorite characters.

## App

The `App.js` file is the entry point of the application. It sets up the navigation and renders the root component.

## Dependencies

The project dependencies are listed in the `package.json` file. Make sure to run `npm install` to install all the required dependencies before running the app.

## Getting Started

To run the app, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install the dependencies.
4. Run `npx expo start` to start the development server.
5. Use an emulator or connect a physical device to run the app.

## Conclusion

This app provides a user-friendly interface for exploring the characters and episodes of the Rick & Morty show. Enjoy discovering your favorite characters and episodes!