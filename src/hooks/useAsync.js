import {useEffect, useState} from "react";


const useAsync = (promise) =>{
    const [result, setResult] = useState(null)
     useEffect(()=>{(async ()=>{
         const r = await promise()
         setResult(r)
     })()
     return ()=>{setResult(null)}},[])

    return result
}

export default useAsync