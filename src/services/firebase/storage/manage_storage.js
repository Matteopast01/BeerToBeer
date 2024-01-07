import "../conf-firebase.js"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

const storage = getStorage()

export let push_img = async function (path_img, file,  postprocessing= ()=>{}, error = ()=>{}) {
    try{
        let snapshot = await uploadBytes(ref(storage, path_img), file)
        console.log("img uploaded")
        postprocessing(snapshot)
    }
    catch (e) {
        console.log(e)
        error()
    }
}

export let pull_img_url = async function (path_img, postprocessing= ()=>{}, error = ()=>{}){
    try{
       let url =  await getDownloadURL(ref(storage, path_img))
        postprocessing(url)
    }
    catch (e){
        error()
    }
}