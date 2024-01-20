import {useState} from "react";
import CustomIconButton from "./CustomIconButton";
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import CustomButton from "./CustomButton";
import  {grey}  from '@mui/material/colors';


const InputRew = function({placeholder, onChange, onSubmit}){

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
        minHeight: "60px",
        padding: "10px",
        resize: "none"
    }

    // Render



    return (
        <div style={{marginLeft: "10%", marginRight:"10%"}}>
            <div>
                <textarea style={textAreaStyle} placeholder={placeholder} onChange={handleChange} value={text}></textarea>
                <CustomButton sx={submitButtonStyle} variant="contained" text={"Submit"} handleClick={handleSubmit}></CustomButton>
            </div>
        </div>
    )

}

export default InputRew