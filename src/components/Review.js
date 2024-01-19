import Homepage from "../pages/Homepage";
import useAsync from "../hooks/useAsync";
import {get_docs_by_attribute, pull_img_url} from "../services/persistence_manager"
import {Avatar, ListItem, ListItemAvatar} from "@mui/material";
import CustomButton from "./CustomButton";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useState} from "react";



function Review({rew, answers}){

    // Hook
    const [answerOpened, setAnswerOpened] = useState(false)


    const user_obj = useAsync(async () => {
        const user_q = await get_docs_by_attribute(rew.uid_author, "User", "uid")
        let img_q
        if( user_q[0].link_img !== ""){
            img_q = await pull_img_url(user_q[0].link_img)
        }
        else{
            img_q = await pull_img_url("usr-img.webp")
        }

        return {
            ...user_q[0],
            img: img_q
        }

    })

    // Handle Function

    const clickHandler = (newAnswerOpened)=>{
        setAnswerOpened(newAnswerOpened)
    }
    const render_rew = (answer_opened=true, reply_button=true, marginLeft=0)=>{
        return (
            <ListItem alignItems="flex-start" sx={{marginLeft: marginLeft.toString()+"px"}}>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={!!user_obj ? user_obj.img: ""} />
                </ListItemAvatar>
                <div style={{display: "flex",  flexDirection: "column"}}>
                    <div style={{  display: "flex"}}>
                        <span style={{fontWeight: "bold", fontSize: "18px"}}> {!!user_obj ? user_obj.username: null}</span>
                    </div>
                    <div>
                        <p style={{marginLeft: "5px"}}> comment </p>
                    </div>
                    <div>
                        <time style={{fontWeight: "lighter", fontSize: "12px"}}>{new Date(rew.date).toLocaleDateString("it",{ month: '2-digit', day: '2-digit', year: 'numeric' })}</time>
                        {!!reply_button ? <CustomButton sx={{fontSize: "11px", color: '#333333'}} text={"reply"}/> : ""}
                        {(!!reply_button && !!answer_opened) ? <CustomButton sx={{fontSize: "11px", color: '#333333'}} text={"hide answers"} endIcon={<KeyboardArrowDownIcon/>} handleClick={()=>{ clickHandler(false)}}/> : ""}
                        {(!!reply_button && !answer_opened) ? <CustomButton sx={{fontSize: "11px", color: '#333333'}} text={"view answers"} endIcon={<KeyboardArrowUpIcon/>} handleClick={()=>{ clickHandler(true)}}/> : "" }
                    </div>
                </div>
            </ListItem>
        )
    }


    return (
    <div>
        {render_rew(answerOpened)}
        {!! answerOpened ? render_rew(false, false, 50): ""}
    </div>
            )
}


export default Review;