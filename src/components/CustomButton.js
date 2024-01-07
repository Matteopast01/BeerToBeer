import * as React from 'react';
import Button from '@mui/material/Button';

// startIcon = icon jsx to import like <DeleteIcon />
// variant = "text", "contained" or "outlined"
// color = "primary", "secondary", "error", "warning", "info" or "success"
// size = "small", "medium" or "large"
// text = the button text

function CustomButton({startIcon, variant, color, size, endIcon, text, handleClick}) {
  return (
      <Button type
              startIcon={startIcon}
              variant={variant}
              color={color}
              size={size}
              endIcon={endIcon}
              onClick={handleClick}
      >
          {text}
      </Button>
  );
}

export default CustomButton;
