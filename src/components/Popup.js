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
import DeleteIcon from "@mui/icons-material/Delete";


export default function Popup( {username,changeUpdatedUsername, changeUploadedImage }) {
    const [open, setOpen] = useState(false);

    const [formText, setFormText] = useState()

    const [img, setImg] = useState({})

    const {currentUser} = useContext(AuthContext);
    const handleFormOpen = () => {
        setOpen(true)
        setFormText(username)
    };
    const handleFormClose = () =>
        setOpen(false);


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
        if (user.link_img != ""){
            console.log("ti elimino")
            await delete_img(user.link_img)
        }

        const image_url = username + "_profile_img"
        await update_by_function("User", "uid", currentUser.uid, (user) => {
            user.link_img = image_url
            return user
        })
        changeUploadedImage(img)

        await push_img(image_url, img)
        handleFormClose()

    }

    const removeCurrentImage = async function () {
        const id_user = currentUser.uid
        const user = await get_docs_by_attribute(id_user, "User", "uid")
        if (user.link_img != "") {
            console.log("ti elimino")
            await delete_img(user.link_img)
        }
        await update_by_function("User", "uid", currentUser.uid, (user) => {
            user.link_img = ""
            return user
        })
        changeUploadedImage(null)



    }


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

    const propsRemoveCurrentImage = {
        variant: "outlined",
        sx: { color: '#333333'},
        size: "large",
        endIcon: <DeleteIcon />,
        text: "Delete Image",
        handleClick: removeCurrentImage
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
            <div>
            <CustomButton {...propsRemoveCurrentImage} style={{ display: 'block', marginBottom: '10px' }}/>
            </div>
            <div>
            <CustomButton {...propsEdit} style={{ display: 'block' }}/>
            </div>
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
                    <ImagesUploader props = {{type : "default", uploadFunction: RetrieveImage}} maxImages={1} minImages={0}/>
            </DialogContent>
            <DialogActions>
                <CustomButton {...propsSave}/>
            </DialogActions>
        </Dialog>
        </div>
    );
}
