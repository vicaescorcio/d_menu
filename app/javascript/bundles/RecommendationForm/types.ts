export type RecommendationFormProps = {
  ingredients: string[];
  onAddIngredient: (ingredient: string) => void;
  onDeleteIngredient: (ingredient: string) => void;
  disable: boolean;
};
