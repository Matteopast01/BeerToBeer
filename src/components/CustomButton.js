import * as React from 'react';
import Button from '@mui/material/Button';
import {useState} from "react";

// disabledBoolean = true to disable the button
// startIcon = icon jsx to import like <DeleteIcon />
// variant = "text", "contained" or "outlined"
// color = "primary", "secondary", "error", "warning", "info" or "success"
// size = "small", "medium" or "large"
// text = the button text

function CustomButton({justClicked, startIcon, startIconClicked, disabledBoolean,
                          variant, color, sx, size, endIcon, endIconClicked, text, textClicked, handleClick}) {

    const [clicked, setClicked] = useState(!!justClicked)

    if(clicked){
        startIcon = !!startIconClicked ? startIconClicked : startIcon
        endIcon = !!endIconClicked ? endIconClicked : endIcon
        text = !!textClicked ? textClicked : text
    }
    const realHandleClick = function (){
        if(clicked){
            setClicked(false)
        }
        else {
            setClicked(true)
        }
        if(!!handleClick){
            handleClick()
        }
    }

  return (
      <Button disabled={disabledBoolean}
              startIcon={startIcon}
              variant={variant}
              color={color}
              sx={sx}
              size={size}
              endIcon={endIcon}
              onClick={realHandleClick}>
          {text}
      </Button>
  );
}

export default CustomButton;