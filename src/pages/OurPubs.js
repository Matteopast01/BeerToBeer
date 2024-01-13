import Header from "../components/Header";
import * as React from "react";
import Footer from "../components/Footer";
import PageSwitch from "../components/PageSwitch";
import Maps from "../components/Maps";

function OurPubs (){
    return (
        <div>
            <div>
                <Header/>
            </div>

            <div style={{display: "flex", minHeight: "73vh"}}>
                <div style={{flex: "50%"}}>
                    <PageSwitch/>
                </div>
                <div style={{flex: "50%"}}>
                    <Maps/>
                </div>
            </div>

            <div>
                <Footer/>
            </div>
        </div>
    );
}

export default OurPubs;