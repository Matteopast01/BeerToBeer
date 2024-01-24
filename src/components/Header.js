import CustomButton from "./CustomButton";
import CustomAccountButton from "./CustomAccountButton";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchBar from "./SearchBar";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts/Auth";
import {useContext, useEffect, useState} from "react";
import {
    get_docs_by_attribute,
    pull_img_url,
    query_by_preamble,
    requestBeersByName
} from "../services/persistence_manager";
import {useDispatch, useSelector} from "react-redux";
import {imgSelected, pubSelected, resetPubSelected, setSearchTerm} from "../store/App";
import {secondary} from "../style/palette";


// disableSearchBar passed as prop disables the searchBar component
function Header({pub, disableSearchBar, advancedSearch}) {

    const navigate = useNavigate();
    const profileImg = useSelector(state => state.userImg.value)
    const dispatch = useDispatch();
    const [options, setOptions] = useState([]);
    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        (async  ()=> {
            if (currentUser != null) {
                const user = await get_docs_by_attribute(currentUser.uid, "User", "uid")
                const defaultImage = await get_docs_by_attribute("default_user_img",
                    "Default_Images", "type")
                const link_img = user[0].link_img
                const img = !!link_img ? await pull_img_url(link_img) : await pull_img_url(defaultImage[0].link_img)
                dispatch(imgSelected(img))
            }
        })()
    }, [currentUser]);

    const handleClickPub = async (value) => {
        if (value != null) {
            const pubFromDB = await get_docs_by_attribute(value, "Pub", "name");
            const {position, ...newObj} = pubFromDB[0];
            const img = await pull_img_url(pubFromDB[0].link_img)
            const pub = {
                ...newObj,
                lat: position.latitude,
                lng: position.longitude,
                img: img
            };
            dispatch(pubSelected(pub));
        }
    }

    const handleClickBeer = async (value) => {
            value = value && value.charAt(0) === '#' ? value.slice(1) : value;
            const beer = await requestBeersByName(value);   // it returns an array of one element
            const id = beer[0].id;
            dispatch(setSearchTerm(value));
            navigate(`/product/${id}`)
            navigate(0)
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
        handleSubmit: (value, event) => {
            dispatch(setSearchTerm(value));
            if (!pub && !advancedSearch) {
                navigate(`/search/${value}`)
            }
            else if (pub || advancedSearch) {
                event.preventDefault()
            }

        },
        label: !!pub ? "Search pub..." : "Search beer...",
        handleClick: !!pub ? handleClickPub : handleClickBeer
    };

    const propsLogin = {
        icon: <AccountCircleIcon/>,
        sx: { color: '#333333'},
        size: "large",
        // handleClick: ()=>{navigate("/login")},
    };

    const propsLogout = {
        icon: <AccountCircleIcon/>,
        sx: { color: '#333333'},
        size: "large",
        // handleClick: ()=>{handleLogout(navigate)},
    };

    const propAccountButton = {
        src: !!currentUser ? profileImg : null
    }

    const propsHome = {
        text: "Home",
        sx: { color: secondary},
        size: "large",
        handleClick: ()=>{navigate("/")}
    };

    const propsPubs = {
        text: "Our Pubs",
        sx: { color: secondary},
        size: "large",
        handleClick: ()=>{
            navigate("/ourpubs");
            dispatch(resetPubSelected(null));
        }
    };

    const propsAdvancedSearch = {
        text:"Advanced Search",
        sx: { color: secondary},
        size: "large",
        handleClick: ()=>{navigate("/search")},
        uploadButtonBoolean: true
    };

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{width: '70px'}}/>
                <div style={{flex: '1', textAlign: 'center', fontSize: '40px', fontFamily: 'Arial, sans-serif'}}>
                    <b>BeerToBeer</b>
                </div>
                <div style={{width: '70px'}}>
                    <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                        <CustomAccountButton {...propAccountButton}/>
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
        </>
    );
}

export default Header;
