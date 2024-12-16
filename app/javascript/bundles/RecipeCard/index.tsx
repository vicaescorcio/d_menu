import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  Snackbar,
} from "@mui/material";
import * as React from "react";
import { Recipe, RecipeCardProps } from "../shared/types";

const getImageUrl = (imageUrl: string) => {
  const urlParams = new URLSearchParams(new URL(imageUrl).search);

  return decodeURIComponent(urlParams.get("url"));
};

const RecipeCard = ({ recipe, onRecipeInfoCopy }: RecipeCardProps) => {
  const handleCopyInfoClick = () => {
    onRecipeInfoCopy(recipe);
  };
  return (
    <>
      <Card sx={{ maxWidth: 500 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={getImageUrl(recipe.image_url)}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {recipe.title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Author: {recipe.author}
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary">
            {`Prep Time: ${recipe.prep_time_seconds / 60} min `}|
            {` Cook Time: ${recipe.cook_time_seconds / 60} min`}
          </Typography>
          <br />
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {recipe.ingredients_description.split("\n").join(", ")}
          </Typography>
          <hr />
          <Typography variant="body2" color="text.secondary">
            {recipe.instructions}
          </Typography>
          <br />
          <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Rating name="read-only" value={recipe.ratings} readOnly />
            <Typography variant="body2" color="text.secondary">
              ({recipe.ratings})
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button onClick={handleCopyInfoClick} size="small">
            Copy All Info
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default RecipeCard;
