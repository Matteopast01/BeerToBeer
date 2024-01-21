import CustomButton from "./CustomButton";
import CustomIconButton from "./CustomIconButton";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchBar from "./SearchBar";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts/Auth";
import {useContext, useState} from "react";
import {get_docs_by_attribute, query_by_preamble, requestBeersByName} from "../services/persistence_manager";
import {useDispatch} from "react-redux";
import {pubSelected, resetPubSelected, setSearchTerm} from "../store/App";

// disableSearchBar passed as prop disables the searchBar component
function Header({pub, disableSearchBar}){

    const {currentUser} = useContext(AuthContext);
    const {handleLogout} = useContext(AuthContext);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [options, setOptions] = useState([]);

    const handleClickPub = function(){}; // TODO: da rimuovere tolti il commento multi riga sotto

    /*
    const handleClickPub = async (value) => {

        const pubFromDB = await get_docs_by_attribute(value, "Pub", "name");
        console.log("This is the pub from DB:" + JSON.stringify(pubFromDB[0]))

        const {position, ...newObj} = pubFromDB[0];
        console.log("This is the position:" + JSON.stringify(position))
        const pub = {
            ...newObj,
            lat: position.latitude,
            lng: position.longitude
        };

        dispatch(pubSelected(pub));
        dispatch(setSearchTerm(value));
    }
    */

    const handleClickBeer = async (value) => {
        const beer = await requestBeersByName(value);   // it returns an array of one element
        const id = beer[0].id;
        dispatch(setSearchTerm(value));
        navigate(`/product/${id}`)
    };

    const propsSearch = {
        onSearch: async function (searchTerm) {

            const queryResult = await query_by_preamble(
                !!pub ? "Pub" : "Beer_Id",
                "name",
                searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase(),
                5,
                true,       // attention!!! with false it orders by number_calls too (so many requests!)
                "number_calls"
            );
            setOptions(queryResult);
        },
        options: options,
        handleSubmit: (event, value) => {
            dispatch(setSearchTerm(value));
            if (!pub) {
                navigate(`/search`)
            }
        },
        label: !!pub ? "Search pub..." : "Search beer...",
        handleClick: !!pub ? handleClickPub : handleClickBeer
    };

    const propsLogin = {
        icon: <AccountCircleIcon/>,
        sx: { color: '#333333'},
        size: "large",
        handleClick: ()=>{navigate("/login")},
    };

    const propsLogout = {
        icon: <AccountCircleIcon/>,
        sx: { color: '#333333'},
        size: "large",
        handleClick: ()=>{handleLogout(navigate)},
    };

    const propsHome = {
        text: "Home",
        sx: { color: '#333333'},
        size: "large",
        handleClick: ()=>{navigate("/")}
    };

    const propsPubs = {
        text: "Our Pubs",
        sx: { color: '#333333'},
        size: "large",
        handleClick: ()=>{
            navigate("/ourpubs");
            dispatch(resetPubSelected(null));
        }
    };

    const propsAdvancedSearch = {
        text:"Advanced Search",
        sx: { color: '#333333'},
        size: "large",
        handleClick: ()=>{navigate("/search")},
        uploadButtonBoolean: true
    };

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

                <div style={{width: '70px'}}/>

                <div style={{flex: '1', textAlign: 'center', fontSize: '40px', fontFamily: 'Arial, sans-serif'}}>
                    <b>BeerToBeer</b>
                </div>

                <div style={{width: '70px'}}>
                    <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                        {currentUser ?
                            <CustomIconButton {...propsLogout}/> :
                            <CustomIconButton {...propsLogin}/>}


                        {/*<div>
                            {currentUser ? <CustomButton text={"Logout"} size={"small"} sx={{color: '#333333'}}/>:
                                <CustomButton text={"Login"} size={"small"} sx={{color: '#333333'}}/>}
                        </div>*/}
                    </div>
                </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <div>
                    <CustomButton {...propsHome}/>
                    <CustomButton {...propsPubs}/>
                    <CustomButton {...propsAdvancedSearch}/>
                </div>
                {!!disableSearchBar ? <div></div> : <SearchBar {...propsSearch}/>}
            </div>
        </div>
    );
}

export default Header;