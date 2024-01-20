import Homepage from "../pages/Homepage";
import useAsync from "../hooks/useAsync";
import {get_docs_by_attribute, pull_img_url} from "../services/persistence_manager"
import {Avatar, ListItem, ListItemAvatar} from "@mui/material";
import CustomButton from "./CustomButton";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useState} from "react";



function Review({rew, answers=[]}){

    // Hook
    const [answerOpened, setAnswerOpened] = useState(false)


    const rew_obj = useAsync(async () => {
        return {
            ...rew,
            user: await get_user(rew)
        }
    })

    const answers_objs = useAsync(async () => {
        const items = []
        for(let obj of answers){
            items.push(
                {
                    ...obj,
                    user: await get_user(obj)
                }
            )
        }
        return items
    })

    // Utility Function

    const get_user = async (rew)=> {
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
    }

    // Handle Function

    const clickHandler = (newAnswerOpened)=>{
        setAnswerOpened(newAnswerOpened)
    }

    // Render Function

    const render_rew = (rew, answer_opened=true, reply_button=true, marginLeft=0)=>{
        return (
            <ListItem alignItems="flex-start" sx={{marginLeft: marginLeft.toString()+"px"}}>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={rew.user.img} />
                </ListItemAvatar>
                <div style={{display: "flex",  flexDirection: "column"}}>
                    <div style={{  display: "flex"}}>
                        <span style={{fontWeight: "bold", fontSize: "18px"}}> {rew.user.username}</span>
                    </div>
                    <div>
                        <p style={{marginLeft: "5px"}}> {rew.review} </p>
                    </div>
                    <div>
                        <time style={{fontWeight: "lighter", fontSize: "12px"}}>{new Date(rew.date).toLocaleDateString("it",{ month: '2-digit', day: '2-digit', year: 'numeric' })}</time>
                        {!!reply_button ? <CustomButton sx={{fontSize: "11px", color: '#333333'}} text={"reply"}/> : ""}
                        {(!!reply_button && !!answer_opened && answers.length > 0) ? <CustomButton sx={{fontSize: "11px", color: '#333333'}} text={"hide answers"} endIcon={<KeyboardArrowDownIcon/>} handleClick={()=>{ clickHandler(false)}}/> : ""}
                        {(!!reply_button && !answer_opened && answers.length > 0) ? <CustomButton sx={{fontSize: "11px", color: '#333333'}} text={"view answers"} endIcon={<KeyboardArrowUpIcon/>} handleClick={()=>{ clickHandler(true)}}/> : "" }
                    </div>
                </div>
            </ListItem>
        )
    }


    return (
    <div>
        {!! rew_obj ? render_rew(rew_obj, answerOpened): ""}
        {(!!answers_objs && !!answerOpened) ? answers_objs.map((answer, i) => {
            return (
                <div key={i}>
                    {render_rew(answer, false, false, 50)}
                </div>
            );
        }) : ""}
    </div>
                )
}


export default Review;