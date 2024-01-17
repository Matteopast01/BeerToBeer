import CustomButton from "./CustomButton";
import CustomIconButton from "./CustomIconButton";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchBar from "./SearchBar";
import { useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts/Auth";
import {useContext, useState} from "react";
import {query_by_preamble} from "../services/persistence_manager";
import {useSelector} from "react-redux";

function Header(){

    const {currentUser} = useContext(AuthContext);
    const {handleLogout} = useContext(AuthContext);

    const navigate = useNavigate();
    // TODO: una volta capito se funziona passarlo allo store
    const [options, setOptions] = useState();

    const propsSearch = {
        onSearch: async function (searchTerm) {

            // queryResult, risultato della query
            const queryResult = await query_by_preamble(
                "Beer_Id",
                "name",
                searchTerm,
                "number_calls",
                5,
            );
            setOptions(queryResult);
        },
        // TODO: verificare options: useSelector(options)
    }

    const propsLogin = {
        icon: <AccountCircleIcon />,
        sx: { color: '#333333'},
        size: "large",
        handleClick: ()=>{navigate("/login")},
    }
    const propsLogout = {
        icon: <AccountCircleIcon />,
        sx: { color: '#333333'},
        size: "large",
        handleClick: ()=>{handleLogout(navigate)},
    }

    const propsHome = {
        text: "Home",
        sx: { color: '#333333'},
        size: "large",
        handleClick: ()=>{navigate("/")}
    }

    const propsPubs = {
        text: "Our Pubs",
        sx: { color: '#333333'},
        size: "large",
        handleClick: ()=>{navigate("/ourpubs")}
    }

    const propsAdvancedSearch = {
        text:"Advanced Search",
        sx: { color: '#333333'},
        size: "large",
        handleClick: ()=>{navigate("/search")},
        uploadButtonBoolean: true
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

                <div style={{width: '70px'}}/>

                <div style={{flex: '1', textAlign: 'center', fontSize: '40px', fontFamily: 'Arial, sans-serif'}}>
                    <b>BeerToBeer</b>
                </div>

                <div style={{width: '70px'}}>
                    <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                        {currentUser ? <CustomIconButton {...propsLogout}/> : <CustomIconButton {...propsLogin}/>}
                        <div>
                            {currentUser ? <CustomButton text={"Logout"} size={"small"} sx={{color: '#333333'}}/>:
                                <CustomButton text={"Login"} size={"small"} sx={{color: '#333333'}}/>}
                        </div>
                    </div>
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