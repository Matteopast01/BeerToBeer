import {Avatar, ListItem, ListItemAvatar} from "@mui/material";
import CustomButton from "./CustomButton";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import {useContext, useState} from "react";
import CustomIconButton from "./CustomIconButton";
import {AuthContext} from "../contexts/Auth";



function Review({rew, answers=[], onReply, onOptionClick, showOptions, showOptionsAnswers, showReplyButton}){

    // Hook
    const [answerOpened, setAnswerOpened] = useState(false)
    const {currentUser} = useContext(AuthContext);

    // Handle Function

    const clickHandler = (newAnswerOpened)=>{
        setAnswerOpened(newAnswerOpened)
    }

    // Render Function

    const render_rew = (rew, option=false, show_answer= true, answer_opened=true, reply_button=true, marginLeft=0)=>{
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
                        {(!! show_answer && !!answer_opened && answers.length > 0) ? <CustomButton sx={{fontSize: "11px", color: '#333333'}} text={"hide answers"} endIcon={<KeyboardArrowUpIcon/>} handleClick={()=>{ clickHandler(false)}}/> : ""}
                        {(!! show_answer && !answer_opened && answers.length > 0) ? <CustomButton sx={{fontSize: "11px", color: '#333333'}} text={"view answers"} endIcon={<KeyboardArrowDownIcon/>} handleClick={()=>{ clickHandler(true)}}/> : "" }
                        {!!option ? <CustomIconButton handleClick={()=>{onOptionClick(rew)}} icon={<MoreHorizOutlinedIcon sx={{fontSize : 18}}/>}/> : ""}
                    </div>
                </div>
            </ListItem>
        )
    }


    return (
    <div>
        {!! rew ? render_rew(rew, showOptions, true, answerOpened, !!showReplyButton): ""}
        {(!!answers && !!answerOpened) ? answers.map((answer) => {
            const option_answer = !!currentUser && (currentUser.uid === answer.user.uid || currentUser.role)
            return (
                <div key={answer.doc_id}>
                    {render_rew(answer, option_answer, false, false, false, 50)}
                </div>
            );
        }) : ""}
    </div>
                )
}


export default Review;