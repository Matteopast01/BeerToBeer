import {delete_doc, load_by_attributes, store_rew} from "../services/persistence_manager";
import CustomIconButton from "./CustomIconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useContext} from "react";
import {AuthContext} from "../contexts/Auth";
import useAsync from "../hooks/useAsync";




export default function BeerCardDescription({beer}){
    const isIconClicked = async (beer_id, user_id, icon) => {
        let results = await load_by_attributes(icon, {
            beer_id: beer_id,
            uid: user_id
        })
        if(results.length > 0){
            return true
        }
        return false
    }
    const iconClickHandler = async (beer_id, user_id, icon) => {
        if (await isIconClicked(beer_id, user_id, icon) === false) {
            store_rew({
                beer_id: beer_id,
                uid: user_id
            },icon)
        } else {
            let results = await load_by_attributes(icon, {
                beer_id: beer_id,
                uid: user_id
            })
            console.log(results)
            delete_doc(icon, results[0].doc_id)
        }
    }

    const {currentUser} = useContext(AuthContext);
    const justLiked = useAsync(async () => {
        return !!currentUser ? await isIconClicked(beer.id, currentUser.uid, "Like") : false
    })
    const justFavorited = useAsync(async () => {
        return !!currentUser ? await isIconClicked(beer.id, currentUser.uid, "Favorites") : false
    })

    return(
        <div>
            {
                !! currentUser ?
                    <div>
                        <CustomIconButton size={"small"} sx={{ color: '#f30303'}}
                                          icon={!justLiked ? <FavoriteBorderIcon/>: <FavoriteIcon/> }
                                          clickedIcon={!justLiked ? <FavoriteIcon/>: <FavoriteBorderIcon/>}
                                          handleClick={()=>{iconClickHandler(beer.id, currentUser.uid,"Like")}}
                        />
                        <CustomIconButton size={"small"} justClicked={justFavorited} sx={{ color: '#ffd700'}}
                                          icon={!justFavorited ? <StarBorderIcon sx={{fontSize : 27}}/> : <StarIcon sx={{fontSize : 27}}/>}
                                          clickedIcon={!justFavorited ? <StarIcon sx={{fontSize : 27}}/> : <StarBorderIcon sx={{fontSize : 27}}/>}
                                          handleClick={()=>{iconClickHandler(beer.id, currentUser.uid, "Favorites")}}
                        />
                    </div> : null
            }
            <h1 className="has-text-centered"> {beer.name}</h1>
            <Typography variant="body2" color="text.secondary">
                {beer.description}
            </Typography>
        </div>
    )
}