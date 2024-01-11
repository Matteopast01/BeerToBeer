// ImageListUploader.js
import React, { useState } from "react";
import FileUploadButton from "../components/FileUploadButton";
import CustomIconButton from "../components/CustomIconButton";
import CancelIcon from '@mui/icons-material/Cancel'; // Assuming CancelIcon is available in your MUI icons

const ImagesUploader = ({ onImageUpload, maxImages }) => {
    const [imageList, setImageList] = useState([]);

    const handleImageUpload = (files) => {
        const totalImages = imageList.length + files.length;

        if (totalImages <= maxImages) {
            const newImageList = [...imageList, ...files];
            setImageList(newImageList);
            onImageUpload(newImageList);
        } else {
            // Puoi gestire l'errore o avvisare l'utente che ha raggiunto il limite di immagini
            console.error("Hai raggiunto il limite massimo di immagini.");
        }
    };

    const handleImageDelete = (index) => {
        const updatedImageList = [...imageList];
        updatedImageList.splice(index, 1);
        setImageList(updatedImageList);
        onImageUpload(updatedImageList);
    };

    return (
        <div className="container">
            <div className="box">
                <div className="columns is-multiline is-flex is-centered">
                    {imageList.map((image, index) => (
                        <div key={index} className="column is-one-third" style={{ position: 'relative' }}>
                            <img src={URL.createObjectURL(image)} alt={`Image ${index}`} style={{ maxWidth: "100%" }} />
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
