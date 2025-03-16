import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';
// import { search } from 'core-js/fn/symbol';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    console.log('Full API Response:', data);

    const { recipe } = data.data;
    console.log('Extracted Recipe:', recipe);

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url, // API has `source_url`, not `sourceUrl`
      image: recipe.image_url, // API has `image_url`, not `image`
      servings: recipe.servings ?? 1, // If missing, default to 1
      cookingTime: recipe.cooking_time ?? 0, // If missing, default to 0
      ingredients: recipe.ingredients.map(ing => ({
        quantity: ing.quantity !== null ? Number(ing.quantity) : null, // Fix NaN issue
        unit: ing.unit || '', // Ensure unit is always a string
        description: ing.description || '', // Ensure description is always a string
      })),
    };

    if (state.bookmarks.some(b => b.id === id)) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    console.log('Parsed Recipe Object:', state.recipe);
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // 0;
  const end = page * state.search.resultsPerPage; // 10;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  if (!state.recipe.servings || !newServings) return;

  state.recipe.ingredients.forEach(ing => {
    if (ing.quantity !== null) {
      ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    }
  });

  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Make current recipe a bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Make current recipe a bookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};
