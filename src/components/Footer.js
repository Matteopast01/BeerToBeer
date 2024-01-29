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
            <img src="/Logos/DAPP%20Logo.png" alt="logo"
                 style={{width: '10px', height: '13px', marginLeft: '5px'}}/>
        </div>
    );
}

export default Footer;