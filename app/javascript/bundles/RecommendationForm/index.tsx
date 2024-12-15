import { Box, Chip, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { RecommendationFormProps } from "./types";

const RecommendationForm = ({
  onAddIngredient,
  onDeleteIngredient,
  ingredients,
  disable,
}: RecommendationFormProps) => {
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      const value = event.target.value;
      onAddIngredient(value);
      event.target.value = "";
    }
  };

  const handleChipDelete = (value: string) => {
    onDeleteIngredient(value);
  };

  return (
    <Box>
      <Typography variant="h5" component="h2">
        Recommendation Form
      </Typography>

      <TextField
        id="ingredients"
        label="Ingredients"
        onKeyDown={handleKeyDown}
        disabled={disable}
      />
      <Stack direction="row" spacing={1}>
        {ingredients.map((ingredient, index) => (
          <Chip
            label={ingredient}
            key={index}
            onDelete={(_: React.SyntheticEvent) => handleChipDelete(ingredient)}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default RecommendationForm;
