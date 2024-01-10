export async function requestBeersByName(name, postprocessing = ()=>{}, error = ()=>{}) {
     let result = await fetch(`https://api.punkapi.com/v2/beers/?beer_name=${name}`)
    return await result.json()
}

export async function requestBeersById(id, postprocessing = ()=>{}, error = ()=>{}) {
    try{
        let result = await fetch(`https://api.punkapi.com/v2/beers/${id}`)
        return await result.json()
    }
    catch (e) {
        error(e)
    }
}


export async function requestRandomBeer( postprocessing = ()=>{}, error = ()=>{}) {
    try{
        let result = await fetch(`https://api.punkapi.com/v2/beers/random`)
        return await result.json()
    }
    catch (e) {
        error(e)
    }
}
