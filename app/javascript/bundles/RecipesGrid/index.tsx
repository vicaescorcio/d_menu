import React, { useEffect, useRef, useState } from "react";
import { Recipe, RecipesGridProps } from "../shared/types";
import Grid from "@mui/material/Grid2";
import RecipeCard from "../RecipeCard";
import { CircularProgress, IconButton, Snackbar } from "@mui/material";
import { Close } from "@mui/icons-material";

const copyToClipboard = (recipe: Recipe) => {
  const text = [
    recipe.title,
    `Author: ${recipe.author}`,
    `Prep Time: ${recipe.prep_time_seconds / 60} min`,
    `Cook Time: ${recipe.cook_time_seconds / 60} min`,
    `Ingredients:\n${recipe.ingredients_description}`,
    `Instructions: ${recipe.instructions}`,
  ].join("\n");

  navigator.clipboard.writeText(text);
};

const RecipesGrid = ({
  recipes,
  fetchMoreRecords,
  ingredients,
  rule,
  defaultRecipesPerPage,
}: RecipesGridProps) => {
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [copiedRecipeInfo, setCopiedRecipeInfo] =
    React.useState<boolean>(false);
  const bottom = useRef(null);
  const offset = useRef(defaultRecipesPerPage);
  const delay = 10000;

  const onRecipeInfoCopy = (recipe: Recipe) => {
    copyToClipboard(recipe);
    setCopiedRecipeInfo(true);
  };

  useEffect(() => {
    const fetchMore = async () => {
      setLoading(true);
      setTimeout(() => setShowLoading(true), delay);
      await fetchMoreRecords({
        ingredients,
        rule,
        offset: offset.current,
      });
      setLoading(false);
      setShowLoading(false);
      offset.current += defaultRecipesPerPage;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMore();
        }
      },
      { rootMargin: "0px", threshold: 0.1 }
    );
    observer.observe(bottom.current);
  }, []);

  return (
    <>
      <Grid container rowSpacing={1.5} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        {recipes.map((recipe, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={recipe.title + index}>
            <RecipeCard recipe={recipe} onRecipeInfoCopy={onRecipeInfoCopy} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <div ref={bottom} />
          {loading && showLoading && <CircularProgress />}
        </Grid>
      </Grid>
      <Snackbar
        open={copiedRecipeInfo}
        autoHideDuration={6000}
        onClose={() => setCopiedRecipeInfo(false)}
        message="Recipe info copied to clipboard"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setCopiedRecipeInfo(false)}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
};

export default RecipesGrid;
