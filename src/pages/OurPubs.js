import Header from "../components/Header";
import Footer from "../components/Footer";
import PageSwitch from "../components/PageSwitch";
import Maps from "../components/Maps";
import {useParams} from "react-router-dom";

function OurPubs (){
    return (
        <div>
            <div>
                <Header pub/>
            </div>

            <div style={{display: "flex", minHeight: "73vh", marginTop: "5px"}}>
                <div style={{width: "60%", marginRight: "5px"}}>
                    <PageSwitch/>
                </div>
                <div style={{width: "40%", marginTop: "10px"}}>
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