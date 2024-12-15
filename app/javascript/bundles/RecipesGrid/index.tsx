import React from "react";
import { RecipesGridProps } from "../shared/types";
import Grid from "@mui/material/Grid2";
import RecipeCard from "../RecipeCard";

const RecipesGrid = ({ recipes }: RecipesGridProps) => {
  return (
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
      {recipes.map((recipe) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={recipe.title}>
          <RecipeCard recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipesGrid;
