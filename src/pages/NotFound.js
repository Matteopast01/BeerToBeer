import React from "react";
import theme from "../style/palette";
import CustomButton from "../components/CustomButton";
import palette from "../style/palette";
import {useNavigate} from "react-router-dom";

const styles = {
    container: {
        textAlign: "center",
        marginTop: "50px",
    },
    heading: {
        fontSize: "4em",  // Increased font size
        color: theme.palette.primary.dark,
    },
    message: {
        fontSize: "2em",  // Increased font size
        color: theme.palette.info.dark,
    },
    image: {
        width: "40%",  // Reduced image width
        margin: "auto"
    },
};


function NotFound({ code, message }) {
    const navigate = useNavigate()
    return (
        <div style={styles.container}>
            <div>
                <h1 style={styles.heading}>{code || "404"}</h1>
                <p style={styles.message}>{message || "Not Found"}</p>
                <CustomButton text = "Back to Home" sx = {{marginTop: "20px", color: theme.palette.info.dark, fontSize: "25px"}} color={"info"} size="large" handleClick={()=> navigate ("/")}/>
            </div>
            <img src="/Error/error404.png" style={styles.image} alt="404"/>
        </div>
    );
}

export default NotFound;
