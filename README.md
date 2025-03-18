# Forkify App

Forkify is a web application that allows users to search for recipes, view details, and save favorite recipes. It fetches data from the [Forkify API](https://forkify-api.herokuapp.com/) and provides an interactive UI for recipe management.

## Features

- Search for recipes by name
- View detailed recipe information
- Bookmark favorite recipes
- Upload custom recipes

## Technologies Used

- JavaScript (ES6+)
- HTML5 & CSS3
- Webpack
- Babel
- API Fetching (AJAX)
- MVC Architecture

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone  https://github.com/ibrahimabidi/forkify.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## API Key Setup

To use the Forkify API, you need an API key. Add your API key in `config.js`:

```js
export const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes/';
export const KEY = 'your-api-key-here';
```

## Usage

- Enter a recipe name in the search bar.
- Click on a recipe to view details.
- Use the bookmark button to save favorite recipes.
- Add new recipes using the form.

## Troubleshooting

- **API Errors (401, 404, 400)**: Check your API key and ensure the recipe ID is correct.
- **Invalid input data**: Ensure the `sourceUrl` and `ingredients` follow the correct format.

## License

This project is open-source and available under the MIT License.

