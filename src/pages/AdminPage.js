// AdminPage.js
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ImagesUploader from "../components/ImagesUploader";

const AdminPage = () => {
    const handleImageUpload = (imageList) => {
        console.log("Nuova lista di immagini:", imageList);
    };

    return (
        <div>
            <Header />
            <ImagesUploader onImageUpload={handleImageUpload} maxImages={3} />
            <br />
            <ImagesUploader onImageUpload={handleImageUpload} maxImages={1} />
            <Footer />
        </div>
    );
};

export default AdminPage;
