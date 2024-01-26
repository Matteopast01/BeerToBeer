import {useRef, useState} from "react";
import CustomButton from "./CustomButton";
import {TextareaAutosize} from "@mui/material";
import Chip from "@mui/material/Chip";
import theme from "../style/palette";

const InputRew = function({placeholder, replyPlaceholder, onChange, onSubmit, rewToReply, style, onUnreply, ref}){

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
        if (text != "") onSubmit(text)
        setText("")
    }

    // Props
    const submitButtonStyle = {
        marginLeft: "35%",
        width: "auto",
        marginRight:"35%",
        backgroundColor: theme.palette.primary.dark,
        '&:hover': {
            backgroundColor: theme.palette.primary.main
        },
        color: "#ffffff"
    }

    const chipStyle = {
        marginBottom: "2px",
        backgroundColor: theme.palette.primary.dark,
        color: "#ffffff",
        '& .MuiChip-deleteIcon': {
            color: "#fcf3f3",
            '&:hover': {
                color: theme.palette.info.main
            }
        }
    }

    const textAreaStyle = {
        width: "100%",
        padding: "10px",
        resize: "none",
        //box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
        // borderColor: theme.palette.primary.main,
    }

    return (
        <div style={style}>
            <div>
                {
                    !! rewToReply ?
                        <Chip sx={chipStyle}  variant="outlined" onDelete={onUnreply} label={"replying to "+rewToReply.user.username}/>:
                        ""
                }
                <TextareaAutosize
                    style={textAreaStyle}
                    placeholder={!! rewToReply ? replyPlaceholder : placeholder}
                    onChange={handleChange} value={text} minRows={2}
                    ref={ref}
                />
                <div ref={contentRef} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <CustomButton sx={submitButtonStyle} variant="contained" text={"Submit"} handleClick={handleSubmit}></CustomButton>
                </div>
            </div>
        </div>
    )
}

export default InputRew