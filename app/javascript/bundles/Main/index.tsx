import { Container } from "@mui/material";
import React from "react";
import RecommendationForm from "../RecommendationForm";
import RecipeCard from "../RecipeCard";
import { Recipe } from "../RecipeCard/types";

const Main = () => {
  const [ingredients, setIngredients] = React.useState<string[]>([]);
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [disableForm, setDisableForm] = React.useState<boolean>(false);

  const getRecommendation = async ({
    ingredients,
    rule,
  }: {
    ingredients: string[];
    rule: "any" | "all";
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

      setDisableForm(false);

      return recipes;
    } catch (error) {
      console.error(error);
    }
  };

  const onAddIngredient = async (ingredient: string) => {
    const newIngredients = [...ingredients, ingredient];

    setIngredients(newIngredients);
    const recipes = await getRecommendation({
      ingredients: newIngredients,
      rule: "any",
    });

    setRecipes(recipes);
  };

  const onDeleteIngredient = async (ingredient: string) => {
    const newIngredients = ingredients.filter((i) => i !== ingredient);
    setIngredients(newIngredients);

    if (newIngredients.length === 0) {
      setRecipes([]);
      return;
    }

    const recipes = await getRecommendation({
      ingredients: newIngredients,
      rule: "any",
    });

    setRecipes(recipes);
  };

  return (
    <Container>
      <RecommendationForm
        onAddIngredient={onAddIngredient}
        onDeleteIngredient={onDeleteIngredient}
        ingredients={ingredients}
        disable={disableForm}
      />

      {recipes?.length > 0 &&
        recipes.map((recipe) => (
          <RecipeCard key={recipe.title} recipe={recipe} />
        ))}
    </Container>
  );
};

export default Main;
