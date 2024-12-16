export type RecipeCardProps = {
  recipe: Recipe;
  onRecipeInfoCopy: (recipe: Recipe) => any;
  onRecipeShare: (recipe: Recipe) => any;
};

export type Recipe = {
  title: string;
  instructions: string;
  category: string;
  author: string;
  cook_time_seconds: number;
  prep_time_seconds: number;
  ratings: number;
  image_url: string;
  ingredients?: Ingredient[];
  ingredients_description?: string;
};

export type Ingredient = {
  name: string;
  quantity_grams: number;
  quantity_ml: number;
  preparation_method: string;
};

export type RecipesGridProps = {
  recipes: Recipe[];
  fetchMoreRecords: ({
    ingredients,
    rule,
    offset,
  }: {
    ingredients: string[];
    rule: string;
    offset?: number;
  }) => any;
  ingredients: string[];
  rule: string;
  defaultRecipesPerPage: number;
};

export type MainProps = {
  defaultRecipesPerPage: number;
};
