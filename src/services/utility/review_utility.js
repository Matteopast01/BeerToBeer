import {get_docs_by_attribute, pull_img_url} from "../persistence_manager";

const get_user = async (rew)=> {
    const user_q = await get_docs_by_attribute(rew.uid_author, "User", "uid")
    let img_q
    if( user_q[0].link_img === ""){
        const defaultImage = await get_docs_by_attribute("default_user_img",
            "Default_Images", "type")
        img_q = await pull_img_url(defaultImage[0].link_img)
    }
    else{
        const link_img = user_q[0].link_img
        img_q = await pull_img_url(link_img)
    }

    return {
        ...user_q[0],
        img: img_q
    }
}

export const loads_rews = async (rews) => {
    const items = []
    for(let obj of rews){
        items.push(
            {
                ...obj,
                user: await get_user(obj)
            }
        )
    }
    return items
}