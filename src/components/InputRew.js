import {useRef, useState} from "react";
import CustomIconButton from "./CustomIconButton";
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import CustomButton from "./CustomButton";
import  {grey}  from '@mui/material/colors';
import {TextareaAutosize} from "@mui/material";
import Chip from "@mui/material/Chip";


const InputRew = function({placeholder, replyPlaceholder, onChange, onSubmit, rewToReply, style, onUnreply}){

    // Hook
    const [text, setText] = useState("")
    const contentRef = useRef(null);


    // Handle functions

    const handleChange = (event)=>{
        contentRef.current?.scrollIntoView();
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

    const chipStyle = {
        marginBottom: "2px",
        backgroundColor: "#000000",
        color: "#ffffff",
        '& .MuiChip-deleteIcon': {
            color: "#fcf3f3",
            '&:hover': {
                color: "#d2bcbc"
            }
        }
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
                {
                    !! rewToReply ?
                        <Chip sx={chipStyle}  variant="outlined" onDelete={onUnreply} label={"reply to "+rewToReply.user.username}/>:
                        ""
                }
                <TextareaAutosize
                    style={textAreaStyle}
                    placeholder={!! rewToReply ? replyPlaceholder : placeholder}
                    onChange={handleChange} value={text} minRows={2}
                />
                <div ref={contentRef}>
                    <CustomButton sx={submitButtonStyle} variant="contained" text={"Submit"} handleClick={handleSubmit}></CustomButton>
                </div>
            </div>
        </div>
    )

}

export default InputRew