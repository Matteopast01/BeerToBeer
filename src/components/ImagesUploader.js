import React, {useContext, useEffect, useState} from "react";
import FileUploadButton from "../components/FileUploadButton";
import CustomIconButton from "../components/CustomIconButton";
import CancelIcon from '@mui/icons-material/Cancel';
import {get_docs_by_attribute, pull_img_url} from "../services/persistence_manager";
import {AuthContext} from "../contexts/Auth";

const ImagesUploader = ({ maxImages, type , retrieveImage, }) => {
    const [imageList, setImageList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        (async  ()=> {
           await uploadStartingImages()
        })()
    }, []);

    const uploadStartingImages = async function (){
        const items = [];
        if (type === "slider_img"){
            const queryResult = await get_docs_by_attribute("slider_img", "Default_Images", "type")
            for (let doc of queryResult){
                items.push(await pull_img_url(doc.link_img))
            }

        }
        else if (type === "default_user_img"){

            const queryResult = await get_docs_by_attribute("default_user_img", "Default_Images", "type")
            items.push(await pull_img_url(queryResult[0].link_img))
        }

        setImageList(items)


    }
    const handleImageUpload = (files) => {
        const totalImages = imageList.length + files.length;

        if (totalImages <= maxImages) {
            const newImageList = [...imageList];
            for (const file of files) {
                newImageList.push(file);
                if (type == null)
                retrieveImage(file)
            }
            setImageList(newImageList);

        } else {
            setErrorMessage("You have reached the limit number of images, delete one to upload again.");
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
    };


    const handleImageDelete = (index) => {
        const updatedImageList = [...imageList];
        updatedImageList.splice(index, 1);
        setImageList(updatedImageList);
    };

    return (
        <div className="container">
            {errorMessage && (
                <div className="notification is-danger">
                    <p>{errorMessage}</p>
                </div>
            )}

            <div className="box">
                <div className="columns is-multiline is-flex is-centered">
                    {imageList.map((image, index) => (
                        <div key={index} className="column is-one-third" style={{ position: 'relative' }}>
                            {
                                typeof image === "string" ? <img src={image} alt={`Image ${index}`}
                                                                      style={{ maxWidth: "100%", height: "auto", width: "100%" }} /> : <img src={URL.createObjectURL(image)} alt={`Image ${index}`} style={{ maxWidth: "100%", height: "auto", width: "100%" }} />
                            }
                            <div style={{ position: 'absolute', top: 0, right: 0 }}>
                                <CustomIconButton
                                    label="Remove"
                                    color="error"
                                    size="small"
                                    icon={<CancelIcon />}
                                    handleClick={() => handleImageDelete(index)}
                                />
                            </div>
                        </div>
                    ))}
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
