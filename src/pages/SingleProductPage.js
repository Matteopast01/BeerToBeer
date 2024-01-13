import { useParams } from 'react-router-dom';
import CustomCard from "../components/CustomCard";
import useAsync from "../hooks/useAsync";
import {requestBeersById} from "../services/persistence_manager";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import Chip from '@mui/material/Chip';
import * as React from "react";
import CustomIconButton from "../components/CustomIconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";


function SingleProductPage(){
    const {beerId} = useParams()
    const beer = useAsync(
        async ()=>{
            const b = await requestBeersById(beerId)
            console.log(b)
            return b[0]
        }
    )
    /*
    <CustomButton text={
                    <Chip sx={ {background: "#ffd5d5"}}  icon={<FavoriteBorderIcon  sx={{color: "#f30303"}}/>} label={"15 Likes"}/>
                }></CustomButton>
                <Chip style={{background: "#c7fdb7"}} icon={<ModeCommentOutlinedIcon/>} label={"3 REVIEWS"}/>
     */
    return (
        <div>
            <Header/>
            {!!beer ?
            <CustomCard img={beer.image_url} horizontal contentStyle={{width:"75%", background: "#f5f5f5"}} maxWidth={"100%"}>
                <h1 style={{fontWeight: "bold", fontSize: "150%"}}>{beer.name}</h1>
                <div style={{display: "inline", margin: "auto"}}>
                    <Chip className="p-2" style={{background: "#75c270", marginRight: "2px"}}  label={`SRM ${beer.srm}`}/>
                </div>
                <div style={{display: "inline", margin: "auto"}}>
                    <Chip className="p-2" style={{background: "#e7c9b6", margin: "2px"}}  label={`ABV ${beer.abv} % vol`}/>
                </div>
                <div style={{display: "inline", margin: "auto", width: "80%"}}>
                    <Chip className="p-2" style={{background: "#a0bbbb", margin: "2px"}}  label={`IBU ${beer.ibu}`}/>
                </div>

                <br/><br/>
                <table>
                    <thead style={{margin:"auto" }}>
                        <tr>
                            <td className="p-2">
                                <h1 style={{fontWeight: "bold" ,display: "inline"}}> Decription: </h1>
                            </td>
                            <td className="p-2">
                                <p style={{display: "inline-table"}}>
                                    {beer.description}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-2">
                                <h1 style={{fontWeight: "bold" ,display: "inline"}}> Food Pairing: </h1>
                            </td>
                            <td className="p-2">
                                <p style={{display: "inline-table"}}>
                                    {beer.food_pairing}
                                </p>
                            </td>
                        </tr>
                    </thead>
                </table>
                <div>
                    <CustomButton sx={{ left: "80%", color: '#ffd700' }}
                                  startIcon={<StarBorderIcon  sx={{color: '#ffd700'}}/>}
                                  text={"Favorite"}>
                    </CustomButton>
                    <CustomButton sx={{ left: "81%", color: "#f30303" }}
                                  text={"15 like"}
                                  startIcon={<FavoriteBorderIcon  sx={{color: "#f30303"}}/>}>
                    </CustomButton>
                </div>
            </CustomCard> : beerId}
        </div>
    )

}

export default SingleProductPage