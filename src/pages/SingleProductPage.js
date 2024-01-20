import { useParams } from 'react-router-dom';
import CustomCard from "../components/CustomCard";
import useAsync from "../hooks/useAsync";
import {requestBeersById} from "../services/persistence_manager";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import Chip from '@mui/material/Chip';
import CustomIconButton from "../components/CustomIconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ProductCardDescription from "../components/ProductCardDescription";
import Review from "../components/Review";
import {sliderClasses} from "@mui/material";

function SingleProductPage(){
    const {beerId} = useParams()
    const beer = useAsync(
        async ()=>{
            const b = await requestBeersById(beerId)
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
                <ProductCardDescription beer={beer}/>
            </CustomCard> : beerId}
            <Review rew={{date: 100, review: "prova testo", uid_author: "loi4gpcxzxYwuD0u0H7ZvLV5aPb2"}}/>
        </div>
    )

}

export default SingleProductPage