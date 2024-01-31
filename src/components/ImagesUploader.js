import React, {useEffect, useState} from "react";
import FileUploadButton from "../components/FileUploadButton";
import CustomIconButton from "../components/CustomIconButton";
import CancelIcon from '@mui/icons-material/Cancel';
import {get_docs_by_attribute, pull_img_url} from "../services/persistence_manager";
import theme from "../style/palette";

const ImagesUploader = ({props, text, maxImages, minImages}) => {

    const [imageList, setImageList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        (async  ()=> {
           await uploadStartingImages()
        })()
    }, []);

    const uploadStartingImages = async function (){
        const items = [];
        if (props.type === "slider_img"){
            const queryResult = await get_docs_by_attribute("slider_img",
                "Default_Images", "type")
            for (let doc of queryResult){
                items.push(await pull_img_url(doc.link_img))
            }
        }
        else if (props.type === "default_user_img"){

            const queryResult = await get_docs_by_attribute("default_user_img",
                "Default_Images", "type")
            items.push(await pull_img_url(queryResult[0].link_img))
        }
        setImageList(items)
    }

    const handleImageUpload = async (files) => {
        const numberImages = imageList.length + files.length;
        if (numberImages <= maxImages) {
            const newImageList = [...imageList];
            for (let index = 0; index < files.length; index++) {
                newImageList.push(files[index]);
                if (props.type === "default")
                    props.uploadFunction(files[index])
                else if (props.type === "slider_img") {
                    props.uploadFunction(files[index])}
                else if (props.type === "default_user_img") {
                    props.uploadFunction(files[index])
                }
            }
            setImageList(newImageList);
        } else {
            setErrorMessage("You have reached the limit number of images, delete one to upload again.");
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
    };

    const handleImageDelete = async (index) => {
        const totalImages = imageList.length-1
        if (totalImages >= minImages) {
            if (props.type === "slider_img") {
                await props.removePopupImage(imageList[index])
            }
            const updatedImageList = [...imageList];
            updatedImageList.splice(index, 1);
            setImageList(updatedImageList);
        }
        else {
            setErrorMessage("Upload an image before removing an another one");
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
    }

    return (
        <div className="container">
            {errorMessage && (
                <div className="notification is-danger">
                    <p>{errorMessage}</p>
                </div>
            )}

            <div className="box" style={{boxShadow: `1px 1px 2px ${theme.palette.primary.main}`}}>
                <div style={{ fontSize: 'larger', fontWeight: 'bold' }}> {text} </div>
                <br/>
                <div className="columns is-multiline is-flex is-centered">
                    {imageList.map((image, index) => (
                        <div key={index} className="column is-one-third" style={{ position: 'relative' }}>
                            {typeof image === "string" ? <img src={image} alt={`Image ${index}`}
                                                                 style={{ maxWidth: "100%", height: "auto", width: "100%" }} />
                                    : <img src={URL.createObjectURL(image)} alt={`Image ${index}`}
                                           style={{ maxWidth: "100%", height: "auto", width: "100%" }} />}
                            <div style={{ position: 'absolute', top: 0, right: 0 }}>
                                <CustomIconButton
                                    variant= "text"
                                    color= "error"
                                    sx= {{color: theme.palette.error.main }}
                                    size= "small"
                                    icon={<CancelIcon />}
                                    handleClick={() => handleImageDelete(index)}/>
                            </div>
                        </div>))}
                </div>
                <div className="columns is-multiline">
                    <div className="column is-full has-text-centered">
                        <FileUploadButton onFileChange={handleImageUpload} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImagesUploader;
