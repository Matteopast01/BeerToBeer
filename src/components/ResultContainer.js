import {CardList} from "./CardList";
import useCardList from "../hooks/useCardList";
import BeerCardDescription from "./BeerCardDescription";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import useAsync from "../hooks/useAsync";
import {requestRandomBeer} from "../services/persistence_manager";






export const ResultContainer = function(){



    const [items, setItems] = useState([])
    const [filteredBeers, setFilteredBeers] = useState(items)
    const navigate = useNavigate()




    const values = useSelector((state)=>state.filters.values)
    const selection1 = useSelector((state) => state.sorting.selection1)
    const selection2 = useSelector((state) => state.sorting.selection2)

    let minAbv = values[0].min
    let maxAbv = values[0].max
    let minIbv = values[1].min
    let maxIbv = values[1].max
    let minSrm = values[2].min
    let maxSrm = values[2].max

    let firstSorting = selection1.value
    let secondSorting = selection2.value


    const loadBeers = async function () {

        const beerList = []

        for (let i = 0; i < 8; i++) {
            const requestResult = await requestRandomBeer()
            beerList.push(requestResult[0])

        }
        return beerList
    }

    useEffect(() => {
        (async  ()=> {
            setItems(await loadBeers())
            setFilteredBeers(await loadBeers())
        })()

    }, []);


    const filterBeers = function (){

       setFilteredBeers( items.filter((beer)=>{
            return beer.abv >= minAbv && beer.abv <= maxAbv &&
                beer.ibu >= minIbv && beer.ibu <= maxIbv &&
                beer.srm >= minSrm && beer.srm <= maxSrm;
        }))

    }

    useEffect(() => {
        filterBeers();
    }, [minAbv, maxAbv, minIbv, maxIbv, minSrm, maxSrm]);



    const [cardItems, cardFeature] = useCardList(filteredBeers,
        (item)=>{return item.id},
        (item)=>{return item.image_url},
        (item)=>{
            return <BeerCardDescription beer={item}/>
        },
        "default:350--8",
        (item)=>{navigate(`/product/${item.id}`)}
    )



    return (<div style={{ margin:"auto"}}>

        <CardList maxColumn={3} cardFeature={cardFeature} items={cardItems}/>
        </div>
    )

}
