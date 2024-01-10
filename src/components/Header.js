import CustomButton from "./CustomButton";
import CustomIconButton from "./CustomIconButton";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchBar from "./SearchBar";
import Search from "../pages/Search";
import {Route, useNavigate} from "react-router-dom";

function Header(){

    const propsSearch = {
        onSearch: function () {
            // TODO
        }
    }

    const navigate = useNavigate();

    const propsAccount = {
        children: <CustomButton text={"Login"}/>,
        icon: <AccountCircleIcon />,
        sx: { color: '#333333'},
        size: "large",
        handleClick: ()=>{navigate("/login")}
    }

    const propsHome = {
        text: "Home",
        sx: { color: '#333333'},
        size: "small",
        handleClick: ()=>{navigate("/")}
    }

    const propsPubs = {
        text: "Our Pubs",
        sx: { color: '#333333'},
        size: "small",
        handleClick: ()=>{navigate("/ourpubs")}
    }

    const propsAdvancedSearch = {
        text:"Advanced Search",
        sx: { color: '#333333'},
        size: "small",
        handleClick: ()=>{navigate("/search")}
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{width: '70px'}}/>
                <div style={{flex: '1', textAlign: 'center', fontSize: '32px', fontFamily: 'Arial, sans-serif'}}>
                    <b>BeerToBeer</b>
                </div>
                <div style={{width: '70px'}}>
                    <CustomIconButton {...propsAccount} />
                </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <div>
                    <CustomButton {...propsHome} />
                    <CustomButton {...propsPubs} />
                    <CustomButton {...propsAdvancedSearch} />
                </div>
                <SearchBar {...propsSearch} />
            </div>
        </div>
    );
}

export default Header;