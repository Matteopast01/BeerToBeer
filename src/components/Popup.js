
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from "./CustomButton";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import CustomIconButton from "./CustomIconButton";
import ImagesUploader from "./ImagesUploader";
import {useContext, useState} from "react";
import {AuthContext} from "../contexts/Auth";
import {count_docs, get_docs_by_attribute, pull_img_url} from "../services/persistence_manager";


export default function Popup( {currentImage}) {
    const [open, setOpen] = useState(false);

    const {currentUser} = useContext(AuthContext);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //TODO query che mi prende l'img attuale
   //te l'ho messa come props visto che la recupero nella componente padre, non ha senso fare la query due volte


    const handleImageUpload = (imageList) => {
        console.log("Nuova lista di immagini:", imageList);
    };

    const propsEdit = {
        variant: "outlined",
        sx: { color: '#333333'},
        size: "large",
        endIcon: <EditIcon />,
        text: "Edit",
        handleClick: handleOpen
    }

    const propsSave = {
        variant: "outlined",
        sx: { color: '#333333'},
        size: "large",
        endIcon: <SaveAsIcon />,
        text: "Save ",
        handleClick: handleClose
    }

    const propsClose = {
        variant: "text",
        color: "error",
        sx: {color: '#f30303'},
        size: "medium",
        icon: <CloseIcon />,
        handleClick: handleClose
    }

    return (
        <div>
            <CustomButton {...propsEdit}/>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth>
                <DialogTitle sx={{ color: 'black' }}>
                    Edit <EditIcon/>
                </DialogTitle>
                <div style={{ position: 'absolute', top: 0, right: 0, padding: '8px' }}>
                    <CustomIconButton {...propsClose} />
                </div>
                <DialogContent>
                    <DialogContentText  sx={{ textAlign: 'left', width: '100%' }}>
                        Enter your new username here:
                    </DialogContentText>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Username"
                    type="username"
                    fullWidth
                    variant="standard"
                    sx={{marginBottom: '30px' }}/>
                    <DialogContentText  sx={{ textAlign: 'left', width: '100%', marginBottom: '30px'}}>
                        Enter your new photo here:
                    </DialogContentText>
                    <ImagesUploader onImageUpload={handleImageUpload} maxImages={1}/>
            </DialogContent>
            <DialogActions>
                <CustomButton {...propsSave}/>
            </DialogActions>
        </Dialog>
        </div>
    );
}
