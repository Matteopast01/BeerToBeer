import React from "react";
import theme from "../style/palette";
const styles = {
    container: {
        textAlign: "center",
        marginTop: "50px",
    },
    heading: {
        fontSize: "3em",
        color: theme.palette.primary.dark,
    },
    message: {
        fontSize: "1.5em",
        color: theme.palette.info.dark,
    },
};

function NotFound({ code, message }) {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>{code || "404"}</h1>
            <p style={styles.message}>{message || "Not Found"}</p>
        </div>
    );
}

export default NotFound;
