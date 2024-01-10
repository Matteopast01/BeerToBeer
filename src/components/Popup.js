import * as React from 'react';
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CustomButton from "./CustomButton";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import FileUploadButton from "./FileUploadButton";

export default function Popup() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                        Enter your new photo  here:
                    </DialogContentText>
                    <FileUploadButton/>
            </DialogContent>
            <DialogActions>
                <CustomButton {...propsSave}/>
            </DialogActions>
        </Dialog>
        </div>
    );
}
