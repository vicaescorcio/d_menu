import { Container, LinearProgress } from "@mui/material";
import React from "react";
import RecommendationForm from "../RecommendationForm";
import RecipeCard from "../RecipeCard";
import { Recipe } from "../shared/types";
import RecipesGrid from "../RecipesGrid";

const Main = () => {
  const [ingredients, setIngredients] = React.useState<string[]>([]);
  const [rule, setRule] = React.useState<string>("any");
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [disableForm, setDisableForm] = React.useState<boolean>(false);

  const getRecommendation = async ({
    ingredients,
    rule,
  }: {
    ingredients: string[];
    rule: string;
  }) => {
    setDisableForm(true);

    try {
      const searchParams = new URLSearchParams({
        ingredients: ingredients.join(","),
        rule,
      });
      const response = await fetch(
        `/recommendations?${searchParams.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }
      const { recipes } = await response.json();

      setRecipes(recipes);
      setDisableForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onAddIngredient = async (ingredient: string, rule: string) => {
    const newIngredients = [...ingredients, ingredient];

    setIngredients(newIngredients);
    await getRecommendation({
      ingredients: newIngredients,
      rule,
    });
  };

  const onDeleteIngredient = async (ingredient: string, rule: string) => {
    const newIngredients = ingredients.filter((i) => i !== ingredient);
    setIngredients(newIngredients);

    if (newIngredients.length === 0) {
      setRecipes([]);
      return;
    }

    await getRecommendation({
      ingredients: newIngredients,
      rule,
    });
  };

  const onRuleChange = async (value: boolean) => {
    const newRule = value ? "any" : "all";
    setRule(newRule);
    const recipes = await getRecommendation({ ingredients, rule: newRule });
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <RecommendationForm
        onAddIngredient={onAddIngredient}
        onDeleteIngredient={onDeleteIngredient}
        onRuleChange={onRuleChange}
        ingredients={ingredients}
        rule={rule}
        disable={disableForm}
      />

      {disableForm ? <LinearProgress /> : <RecipesGrid recipes={recipes} />}
    </Container>
  );
};

export default Main;
