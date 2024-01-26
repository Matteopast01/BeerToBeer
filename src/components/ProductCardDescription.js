import Chip from "@mui/material/Chip";
import CustomButton from "./CustomButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {delete_doc, load_docs_by_attributes, store_doc, update_by_function} from "../services/persistence_manager";
import {AuthContext} from "../contexts/Auth";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";

function ProductCardDescription({beer}){
    const {currentUser} = useContext(AuthContext);
    const [liked, setLiked] = useState(false)
    const [favorited, setFavorited] = useState(false)
    const [numberLikes, setNumberLikes] = useState(beer.number_likes)
    const isIconClicked = async (beer_id, user_id, icon) => {
        let results = await load_docs_by_attributes(icon, {
            beer_id: beer_id,
            uid: user_id
        })
        if(results.length > 0){
            return true
        }
        return false
    }
    const updateNumberLikes = async (number_likes_to_add, beer_id)=>{
        await update_by_function("Beer_Id", "id", beer_id, (obj)=>{
            const { _, ...newObj } = obj;
            return {
                ...newObj,
                number_likes : obj.number_likes + number_likes_to_add
            }
        }, ()=> {
            setNumberLikes(numberLikes + number_likes_to_add )
        } )
    }
    const iconClickHandler = async (beer_id, user_id, icon) => {
        if (await isIconClicked(beer_id, user_id, icon) === false) {
            await store_doc({
                beer_id: beer_id,
                uid: user_id
            },icon)
            if (icon === "Like"){
                updateNumberLikes(1, beer_id)
            }
        } else {
            let results = await load_docs_by_attributes(icon, {
                beer_id: beer_id,
                uid: user_id
            })
            for( let result of results ){
                await delete_doc(icon, result.doc_id)
                if (icon === "Like"){
                    updateNumberLikes(-1, beer_id)
                }
            }
        }
    }

    useEffect( () => {
        (async ()=>{
            setLiked(!!currentUser ? await isIconClicked(beer.id, currentUser.uid, "Like") : false)
            setFavorited(!!currentUser ? await isIconClicked(beer.id, currentUser.uid, "Favorites") : false)
        })()
    }, []);

    return (
        <>
            <h1 style={{fontWeight: "bold", fontSize: "30px"}}>{beer.name}</h1>
            <div style={{display: "inline", margin: "auto"}}>
                <Chip className="p-2" style={{background: "#89b7ea", margin: "2px"}}  label={`ABV ${beer.abv}% vol`}/>
            </div>
            <div style={{display: "inline", margin: "auto"}}>
                <Chip className="p-2" style={{background: "#f5a844d3", margin: "2px"}}  label={`IBU ${beer.ibu}`}/>
            </div>
            <div style={{display: "inline", margin: "auto", width: "80%"}}>
                <Chip className="p-2" style={{background: "#75c270", margin: "2px"}}  label={`SRM ${beer.srm}`}/>
            </div>

            <br/><br/>
            <table>
                <thead style={{margin:"auto" }}>
                <tr>
                    <td className="p-2">
                        <h1 style={{fontWeight: "bold", display: "inline"}}>Description:</h1>
                    </td>
                    <td className="p-2">
                        <p style={{display: "inline-table"}}>
                            {beer.description}
                        </p>
                    </td>
                </tr>
                <tr>
                    <td className="p-2">
                        <h1 style={{fontWeight: "bold", display: "inline"}}>Food pairing:</h1>
                    </td>
                    <td className="p-2">
                        <p style={{display: "inline-table"}}>
                            {beer.food_pairing}{"."}
                        </p>
                    </td>
                </tr>
                </thead>
            </table>
            { !!currentUser ?
                <div style={{marginLeft: "80%", display: "flex"}}>
                    <CustomButton sx={{ color: "error.main" }}
                                  text={<b>{numberLikes} <span>like</span></b>}
                                  startIcon={
                                      !liked ? <FavoriteBorderIcon/>: <FavoriteIcon/>
                                 }
                                  handleClick={async () => {
                                      setLiked(!liked)
                                      await iconClickHandler(beer.id, currentUser.uid, "Like")
                                      setLiked(await isIconClicked(beer.id, currentUser.uid, "Like"))
                                  }}/>

                    <CustomButton sx={{ color: 'warning.light' }}
                                  startIcon={
                                        !favorited ? <StarBorderIcon sx={{fontSize : 27}}/> : <StarIcon sx={{fontSize : 27}}/>
                                  }
                                  text={<b>{"Favorite"}</b>}
                                  handleClick={async () => {
                                      setFavorited(!favorited)
                                      await iconClickHandler(beer.id, currentUser.uid, "Favorites")
                                      setFavorited(await isIconClicked(beer.id, currentUser.uid, "Favorites"))
                                  }}/>
                </div> : null
            }
        </>
    )
}

export default ProductCardDescription