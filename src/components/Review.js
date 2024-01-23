import useAsync from "../hooks/useAsync";
import {get_docs_by_attribute, pull_img_url} from "../services/persistence_manager"
import {Avatar, ListItem, ListItemAvatar} from "@mui/material";
import CustomButton from "./CustomButton";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import {useState} from "react";
import CustomIconButton from "./CustomIconButton";



function Review({rew, answers=[], onReply, showOptions, showOptionsAnswers}){

    // Hook
    const [answerOpened, setAnswerOpened] = useState(false)

    // Handle Function

    const clickHandler = (newAnswerOpened)=>{
        setAnswerOpened(newAnswerOpened)
    }

    // Render Function

    const render_rew = (rew, option=false, answer_opened=true, reply_button=true, marginLeft=0)=>{
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
                        {!!reply_button ? <CustomButton sx={{fontSize: "11px", color: '#333333'}} text={"reply"} handleClick={()=>{onReply(rew)}}/> : ""}
                        {(!!reply_button && !!answer_opened && answers.length > 0) ? <CustomButton sx={{fontSize: "11px", color: '#333333'}} text={"hide answers"} endIcon={<KeyboardArrowUpIcon/>} handleClick={()=>{ clickHandler(false)}}/> : ""}
                        {(!!reply_button && !answer_opened && answers.length > 0) ? <CustomButton sx={{fontSize: "11px", color: '#333333'}} text={"view answers"} endIcon={<KeyboardArrowDownIcon/>} handleClick={()=>{ clickHandler(true)}}/> : "" }
                        {!!option ? <CustomIconButton icon={<MoreHorizOutlinedIcon sx={{fontSize : 18}}/>}/> : ""}
                    </div>
                </div>
            </ListItem>
        )
    }


    return (
    <div>
        {!! rew ? render_rew(rew, showOptions, answerOpened): ""}
        {(!!answers && !!answerOpened) ? answers.map((answer) => {
            const option_answer = ( showOptions && rew.user.uid === answer.user.uid) || (showOptionsAnswers)
            return (
                <div key={answer.doc_id}>
                    {render_rew(answer, option_answer, false, false, 50)}
                </div>
            );
        }) : ""}
    </div>
                )
}


export default Review;