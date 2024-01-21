import {CardList} from "./CardList";
import useCardList from "../hooks/useCardList";
import BeerCardDescription from "./BeerCardDescription";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { requestBeersById} from "../services/persistence_manager";
import {setSearchedBeers} from "../store/App";

export const ResultContainer = function(){

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const values = useSelector((state)=>state.filters.values)
    const selection1 = useSelector((state) => state.sorting.selection1)
    const selection2 = useSelector((state) => state.sorting.selection2)


    let minAbv = values[0].min
    let maxAbv = values[0].max
    let minIbv = values[1].min
    let maxIbv = values[1].max
    let minSrm = values[2].min
    let maxSrm = values[2].max

    let sortingProperty = selection1.value
    let sortingWay = selection2.value



    const searchTerm = useSelector((state)=> state.searchTerm.value)
    console.log(searchTerm)


    const loadBeers = async function () {

        const beerList = []
        for (let i = 1; i < 10; i++) {
            const requestResult = await requestBeersById(i)
            const beer = requestResult[0]
            beerList.push(beer)
        }
        return beerList
    }

    useEffect(() => {
        (async  ()=> {
            const beers = await loadBeers()
            dispatch(setSearchedBeers(beers))
        })()
    }, []);


    const beers = useSelector((state)=>state.searchedBeers.searchedBeers)
    const filterBeers = function (){

      return beers.filter((beer)=>{
            return beer.abv >= minAbv && beer.abv <= maxAbv &&
                beer.ibu >= minIbv && beer.ibu <= maxIbv &&
                beer.srm >= minSrm && beer.srm <= maxSrm;
        })
    }

    let filteredBeers = filterBeers()

    const sortingBeers = function (filteredBeers, sortingProperty, sortingWay) {
        const sortOrder = sortingWay === 'decreasing' ? -1 : 1;

        if (sortingProperty === "alphabetical") {
            return sortOrder === 1
                ? [...filteredBeers].sort((a, b) => a.name.localeCompare(b.name))
                : [...filteredBeers].sort((a, b) => b.name.localeCompare(a.name));
        }

        if (sortingProperty === "ibu") {
            return sortOrder === 1
                ? [...filteredBeers].sort((a, b) => a.ibu - b.ibu)
                : [...filteredBeers].sort((a, b) => b.ibu - a.ibu);
        }

        return [...filteredBeers];
    };

    let Beers = (sortingProperty === null || sortingProperty === "-") ? filteredBeers : sortingBeers(filteredBeers, sortingProperty, sortingWay);

    const [cardItems, cardFeature] = useCardList(Beers,
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