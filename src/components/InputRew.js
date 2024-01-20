import {useState} from "react";
import CustomIconButton from "./CustomIconButton";
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import CustomButton from "./CustomButton";
import  {grey}  from '@mui/material/colors';
import {TextareaAutosize} from "@mui/material";


const InputRew = function({placeholder, onChange, onSubmit, style}){

    // Hook
    const [text, setText] = useState("")


    // Handle functions

    const handleChange = (event)=>{
        const inputText = event.target.value
        setText(inputText)
        if (!!onChange){
            onChange(inputText)
        }
    }

    const handleSubmit = ()=>{
        onSubmit(text)
        setText("")
    }
    // Props

    const submitButtonStyle = {
        marginLeft: "35%",
        width: "30%",
        marginRight:"35%",
        backgroundColor: "#100f0f",
        '&:hover': {
            backgroundColor: grey[900]
        },
        color: "#ffffff"
    }


    const textAreaStyle = {
        width: "100%",
        padding: "10px",
        resize: "none"
    }

    // Render



    return (
        <div style={style}>
            <div>
                <TextareaAutosize style={textAreaStyle} placeholder={placeholder} onChange={handleChange} value={text} minRows={2}></TextareaAutosize>
                <CustomButton sx={submitButtonStyle} variant="contained" text={"Submit"} handleClick={handleSubmit}></CustomButton>
            </div>
        </div>
    )

}

export default InputRew