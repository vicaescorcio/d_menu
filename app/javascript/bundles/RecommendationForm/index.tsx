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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#3f51b5",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        What do you want to cook with?
      </Typography>

      <TextField
        fullWidth
        id="ingredients"
        label="Ingredients"
        onKeyDown={handleKeyDown}
        disabled={disable}
      />

      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Tooltip title="Toogle to filter recipes that should contain ALL or ANY of the ingredients">
          <Info fontSize="small" />
        </Tooltip>
        <Typography>ALL</Typography>
        <Switch
          onChange={handleRuleChange}
          defaultChecked
          inputProps={{ "aria-label": "rule" }}
        />
        <Typography>ANY</Typography>
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
