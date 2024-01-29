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
            <br/>
            <img src="/Logos/DAPP%20Logo.png" alt="logo"
                 style={{width: '35px', height: '35px', marginTop: '10px'}}/>
        </div>
    );
}

export default Footer;

