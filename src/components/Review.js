import Homepage from "../pages/Homepage";
import useAsync from "../hooks/useAsync";
import {get_docs_by_attribute, pull_img_url} from "../services/persistence_manager"
import {Avatar, ListItem, ListItemAvatar} from "@mui/material";


function Review({rew, answers}){
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


    return (
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={!!user_obj ? user_obj.img: "" } />
                </ListItemAvatar>
                <h1 style={{fontWeight: "bold", display: "box"}}> {!!user_obj ? user_obj.username: null} </h1>
                <time dateTime="2024-01-17">{new Date(rew.date).toTimeString()}</time>
                <p> comment </p>
            </ListItem>)
}


export default Review;