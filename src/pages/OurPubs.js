import Header from "../components/Header";
import * as React from "react";
import Footer from "../components/Footer";
import PageSwitch from "../components/PageSwitch";

function OurPubs (){
    return (
        <div>
            <div>
                <Header/>
            </div>
            <PageSwitch/>
            <div>
                <Footer/>
            </div>
        </div>
    )
}

export default OurPubs;