export type RecommendationFormProps = {
  ingredients: string[];
  onAddIngredient: (ingredient: string, rule: string) => void;
  onDeleteIngredient: (ingredient: string, rule: string) => void;
  onRuleChange: (rule: boolean) => void;
  rule: string;
  disable: boolean;
};
