import Homepage from "../pages/Homepage";
import useAsync from "../hooks/useAsync";
import {get_docs_by_attribute, pull_img_url} from "../services/persistence_manager"


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
            <li className="media">
                <a className="pull-left">
                    <img className="media-object comment-avatar" src={!!user_obj ? user_obj.img: "" } alt="" width="50" height="50"/>
                </a>
                <div className="media-body">
                    <div className="comment-info">
                        <div className="comment-author">
                            <a> {!!user_obj ? user_obj.username: null}</a>
                        </div>
                        <time>{new Date(rew.date).toGMTString()}</time>
                    </div>
                    <p>
                        {rew.review}
                    </p>
                </div>
            </li>)
}


export default Review;