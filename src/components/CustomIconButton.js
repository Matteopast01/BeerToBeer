import * as React from 'react';
import IconButton from '@mui/material/IconButton';

// children examples:
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// label = label that explains the button type
// variant = "text", "contained" or "outlined"
// color = "primary", "secondary", "error", "warning", "info" or "success"
// size = "small", "medium" or "large"
// children = <DeleteIcon />, <AlarmIcon /> ecc

function CustomIconButton({label, variant, color, size, children, handleClick}) {
  return (
      <IconButton aria-label={label}
              variant={variant}
              color={color}
              size={size}
              onClick={handleClick}
      >
          {children}
      </IconButton>
  );
}

export default CustomIconButton;