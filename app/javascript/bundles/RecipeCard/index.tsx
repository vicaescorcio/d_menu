import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import * as React from "react";
import { RecipeCardProps } from "./types";

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={recipe.image_url}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {recipe.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {recipe.ingredients_description}
        </Typography>
        <hr />
        <Typography variant="body2" color="text.secondary">
          {recipe.instructions}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
