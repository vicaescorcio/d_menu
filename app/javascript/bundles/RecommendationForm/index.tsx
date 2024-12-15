import {
  Box,
  Chip,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { RecommendationFormProps } from "./types";
import { Info } from "@mui/icons-material";

const RecommendationForm = ({
  onAddIngredient,
  onDeleteIngredient,
  onRuleChange,
  ingredients,
  rule,
  disable,
}: RecommendationFormProps) => {
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      const value = event.target.value;
      onAddIngredient(value, rule);
      event.target.value = "";
    }
  };

  const handleChipDelete = (value: string) => {
    onDeleteIngredient(value, rule);
  };

  const handleRuleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRuleChange(event.target.checked);
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

      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Tooltip title="Select OR to recommend recipes that contain at least one of the ingredients">
          <Info fontSize="small" />
        </Tooltip>
        <Typography>OR</Typography>
        <Switch
          onChange={handleRuleChange}
          defaultChecked
          inputProps={{ "aria-label": "rule" }}
        />
        <Typography>AND</Typography>
      </Stack>
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
