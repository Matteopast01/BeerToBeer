import {useNavigate} from "react-router-dom";
import {CardList} from "./CardList";
import useCardList from "../hooks/useCardList";
import DropDown from "./DropDown";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {load_ordered_docs, requestBeersById, store_rew, load_by_attributes} from "../services/persistence_manager.js";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import CustomIconButton from "./CustomIconButton";
import Typography from "@mui/material/Typography";
import {AuthContext} from "../contexts/Auth";

export function BeerContainer(){
    const [selection, setSelection] = useState({label: "Più viste", value: "Più visti"});
    const [items, setItems] = useState([])
    const {currentUser} = useContext(AuthContext);

    const isLaked = async (beer_id, user_id) => {
        let results = await load_by_attributes("Like", {
            beer_id: beer_id,
            uid: user_id
        })
        console.log(results)
        if(results.length > 0){
            return true
        }
        return false
    }
    const changeLike = (beer_id, user_id)=>{
        store_rew({
            beer_id : beer_id,
            uid : user_id
        })
    }

    useEffect(() => {
        (async  ()=> {
            setItems(await getBeers())
        })()
        return ()=>{
            setItems([])
        }
    }, []);



    const options = [
        {label: "Più viste", value: "Più visti"},
        {label: "Più apprezzate", value: "Più apprezzate"}
    ]

    const handleSelect = async (option) => {
        setItems(await getBeers())
        setSelection(option);
    };

    const getBeers = async function () {
        let arrayOfId = await load_ordered_docs("Beer_Id", "number_calls", "desc", 6)
        let beers = []
        for (let obj of arrayOfId) {
            let beer = await requestBeersById(obj.id)
            beers.push(beer[0])
        }
        return beers
    }

    const navigate = useNavigate();
    const [cardItems, cardFeature] = useCardList(items,
            (item)=>{return item.id},
            (item)=>{return item.image_url},
            (item)=>{return(
                <div>
                    {
                        !! currentUser ?
                                <div>
                                    <CustomIconButton size={"small"} sx={{ color: '#f30303'}} icon={<FavoriteBorderIcon/>}
                                                      clickedIcon={<FavoriteIcon/>}
                                                      handleClick={()=>{isLaked(212, "coiwechwrefchwer")}}/>
                                    <CustomIconButton size={"small"} sx={{ color: '#ffd700'}} icon={<StarBorderIcon sx={{fontSize : 27}}/>}
                                                      clickedIcon={<StarIcon sx={{fontSize : 27}}/>}/>
                                </div> : null
                    }
                    <h1 className="has-text-centered"> {item.name}</h1>
                    <Typography variant="body2" color="text.secondary">
                        {item.description}
                    </Typography>
                </div>
            ) },
            "default:350--8",
            (item)=>{navigate("/login")}
            )

    return (
        <div>
            <br/>
            <div style={{margin: "auto", width:"10%", display: "flex", justifyContent: "center" }}>
                <DropDown options={options} value={selection} onChange={handleSelect} />
            </div>
            <CardList maxColumn={3} cardFeature={cardFeature} items={cardItems}></CardList>
        </div>
    )
}
