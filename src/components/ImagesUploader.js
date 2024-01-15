import React, { useState } from "react";
import FileUploadButton from "../components/FileUploadButton";
import CustomIconButton from "../components/CustomIconButton";
import CancelIcon from '@mui/icons-material/Cancel';

const ImagesUploader = ({ onImageUpload, maxImages }) => {
    const [imageList, setImageList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const handleImageUpload = (files) => {
        const totalImages = imageList.length + files.length;

        if (totalImages <= maxImages) {
            const newImageList = [...imageList, ...files];
            setImageList(newImageList);
            onImageUpload(newImageList);
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
        onImageUpload(updatedImageList);
    };

    //TODO query che si salva le foto che inserisco
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
                            <img src={URL.createObjectURL(image)} alt={`Image ${index}`}
                                 style={{ maxWidth: "100%", height: "auto", width: "100%" }} />
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
