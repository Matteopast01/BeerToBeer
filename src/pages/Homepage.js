import BeerCard from "../components/BeerCard";

const Homepage = function (){
    return ( <div>
        <BeerCard horizontal maxWidth={345} contentWidth={500} img={"https://bulma.io/images/placeholders/96x96.png"}>
            <p>prova testo</p>
        </BeerCard>
    </div>)


}

export default Homepage;