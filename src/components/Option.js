import ReactDOM from "react-dom";
import CustomButton from "./CustomButton";
import {Dialog, DialogContent} from "@mui/material";

function Option({ open=true, onClose= ()=>{}, onDelete= ()=>{}, onCancel= ()=>{},deleteLabel, cancelLabel, actionBar }) {

    //Props

    const deteteStyle = {
        color: "#ff0000",
        borderColor: "#8c8080" ,
        height: "40px",
        '&:hover': {
            borderColor: '#ff0000',
        }
    }

    const cancelStyle = {
        color: "#8c8080",
        borderColor: "#8c8080",
        height: "40px",
        fontAlign: "center",
        '&:hover': {
            borderColor: '#000000',
        }
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
        >
                { deleteLabel ? <CustomButton sx={deteteStyle} variant={"outlined"} text={deleteLabel} handleClick={onDelete}/> : ""}
                { cancelLabel ? <CustomButton sx={cancelStyle} variant={"outlined"} text={cancelLabel} handleClick={onCancel}/> : ""}
        </Dialog>
    );
}

export default Option;
