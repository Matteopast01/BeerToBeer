import BeerCard from "./BeerCard";

export function CardList({maxColumn, cardFeature, items}){


    const matrix = [];
    for (let i = 0; i < items.length; i += maxColumn) {
        matrix.push(items.slice(i, i + maxColumn));
    }


    const render = function(){
        const renderCards = function(row) {
            return row.map((card) => {
                return (
                    <td className="p-2" key={card.id}>
                        <BeerCard maxWidth={cardFeature.maxWidth}
                                  contentWidth={cardFeature.contentWidth}
                                  horizontal = {cardFeature.horizontal}
                                  img={card.img}
                                  onClick={()=>{cardFeature.onClick(card)}}>
                            {card.description(card)}
                        </BeerCard>
                    </td>
                );
            });
        }

        return matrix.map((row, index)=>{
            return (
                <tr className="border-b" key={index}>
                    {renderCards(row)}
                </tr>
            )
        })
    }

    return (
        <table>
            <thead>
                {render()}
            </thead>
        </table>

    );
}

