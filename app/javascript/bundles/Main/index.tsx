import {
  CircularProgress,
  Container,
  LinearProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import React from "react";
import RecommendationForm from "../RecommendationForm";
import { MainProps, Recipe } from "../shared/types";
import RecipesGrid from "../RecipesGrid";

const Main = ({ defaultRecipesPerPage }: MainProps) => {
  const [ingredients, setIngredients] = React.useState<string[]>([]);
  const [rule, setRule] = React.useState<string>("any");
  const [recipes, setRecipes] = React.useState<Recipe[]>(null);
  const [disableForm, setDisableForm] = React.useState<boolean>(false);

  const getRecommendation = async ({
    ingredients,
    rule,
    offset = 0,
  }: {
    ingredients: string[];
    rule: string;
    offset?: number;
  }) => {
    try {
      setDisableForm(true);
      if (!ingredients || ingredients.length === 0) {
        throw new Error("No ingredients provided");
      }

      const searchParams = new URLSearchParams({
        ingredients: ingredients.join(","),
        rule,
        offset: offset.toString(),
      });

      const response = await fetch(
        `/recommendations?${searchParams.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }
      const { recipes } = await response.json();

      if (offset > 0) {
        setRecipes((prevRecipes) => [...prevRecipes, ...recipes]);
      } else {
        setRecipes(recipes);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDisableForm(false);
    }
  };

  const onAddIngredient = async (ingredient: string, rule: string) => {
    setRecipes([]);
    const newIngredients = [...ingredients, ingredient];

    setIngredients(newIngredients);
    await getRecommendation({
      ingredients: newIngredients,
      rule,
    });
  };

  const onDeleteIngredient = async (ingredient: string, rule: string) => {
    setRecipes([]);
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
    setRecipes([]);
    const newRule = value ? "any" : "all";
    setRule(newRule);
    await getRecommendation({ ingredients, rule: newRule });
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
      {disableForm && <LinearProgress />}

      {recipes &&
        (recipes.length > 0 ? (
          <RecipesGrid
            recipes={recipes}
            ingredients={ingredients}
            rule={rule}
            key={ingredients.join(",")}
            defaultRecipesPerPage={defaultRecipesPerPage}
            fetchMoreRecords={getRecommendation}
          />
        ) : (
          <Typography variant="body1">
            {" "}
            No recipes found with this criteria
          </Typography>
        ))}
    </Container>
  );
};

export default Main;
