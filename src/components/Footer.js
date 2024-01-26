function Footer(){

    const footerStyle = {
        bottom: 0,
        width: '100%',
        textAlign: 'center',
        fontSize: '12px',
        padding: '8px 0',
        marginTop: '10px',
        marginBottom: '5px',
    };

    return (
        <div style={footerStyle}>
            <b>Powered by DAPP © 2024</b>
        </div>
    );
}

export default Footer;