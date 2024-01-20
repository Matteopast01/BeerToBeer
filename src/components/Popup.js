import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from "./CustomButton";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import CustomIconButton from "./CustomIconButton";
import ImagesUploader from "./ImagesUploader";
import {useContext, useState} from "react";
import {AuthContext} from "../contexts/Auth";
import {delete_img, get_docs_by_attribute, push_img, update_by_function} from "../services/persistence_manager";


export default function Popup( {username,changeUpdatedUsername, changeUploadedImage }) {
    const [open, setOpen] = useState(false);

    const [formText, setFormText] = useState()

    const [img, setImg] = useState({})

    const {currentUser} = useContext(AuthContext);
    const handleFormOpen = () => {
        setOpen(true)
        setFormText(username)
    };
    const handleFormClose = () => setOpen(false);


    const handleUsernameChange = function (event){
        setFormText(event.target.value);
    }
    const handleFormEdit = async function () {
        await update_by_function("User", "uid", currentUser.uid, (user) => {
            user.username = formText
            return user
        })
        changeUpdatedUsername(formText)
        const id_user = currentUser.uid
        const user = await get_docs_by_attribute(id_user, "User", "uid")
        if (user.link_img !== ""){
            await delete_img(user.link_img)
        }

        const image_url = username + "_profile_img"
        await update_by_function("User", "uid", currentUser.uid, (user) => {
            user.link_img = image_url
            return user
        })
        changeUploadedImage(img)

        console.log(img)
        await push_img(image_url, img)
        handleFormClose()

    }



/*
        const getFileBlob = async (file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();

                reader.onloadend = function () {
                    if (reader.result instanceof ArrayBuffer) {
                        const byteArray = new Uint8Array(reader.result);
                        const blob = new Blob([byteArray], { type: file.type });
                        resolve(blob);
                    }
                };

                reader.readAsArrayBuffer(file);
            });
        };

    function mimeToExtension(mimeType) {
        const mimeParts = mimeType.split('/');
        if (mimeParts.length === 2) {
            return `.${mimeParts[1]}`;
        } else {
            console.error('Formato tipo MIME non valido');
            return null;
        }
    }
*/

    const RetrieveImage = async function (img) {
        setImg(img)

    }

    const propsEdit = {
        variant: "outlined",
        sx: { color: '#333333'},
        size: "large",
        endIcon: <EditIcon />,
        text: "Edit",
        handleClick: handleFormOpen
    }

    const propsSave = {
        variant: "outlined",
        sx: { color: '#333333'},
        size: "large",
        endIcon: <SaveAsIcon />,
        text: "Save ",
        handleClick: handleFormEdit
    }

    const propsClose = {
        variant: "text",
        color: "error",
        sx: {color: '#f30303'},
        size: "medium",
        icon: <CloseIcon />,
        handleClick: handleFormClose
    }

    return (
        <div>
            <CustomButton {...propsEdit}/>
            <Dialog
                open={open}
                onClose={handleFormClose}
                maxWidth="sm"
                fullWidth>
                <DialogTitle sx={{ color: 'black' }}>
                    Edit <EditIcon/>
                </DialogTitle>
                <div style={{ position: 'absolute', top: 0, right: 0, padding: '8px' }}>
                    <CustomIconButton {...propsClose} />
                </div>
                <DialogContent>
                    <DialogContentText sx={{textAlign: 'left', width: '100%'}}>
                        Enter your new username here:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                    id="name"
                    label="Username"
                    value={formText}
                    onChange={handleUsernameChange}
                    type="text"
                    fullWidth
                    variant="standard"
                    sx={{marginBottom: '30px' }}/>
                    <DialogContentText  sx={{ textAlign: 'left', width: '100%', marginBottom: '30px'}}>
                        Enter your new photo here:
                    </DialogContentText>
                    <ImagesUploader retrieveImage={RetrieveImage}  maxImages={1}/>
            </DialogContent>
            <DialogActions>
                <CustomButton {...propsSave}/>
            </DialogActions>
        </Dialog>
        </div>
    );
}
