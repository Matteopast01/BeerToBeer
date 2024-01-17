import CustomCard from "./CustomCard";

export function CardList({maxColumn, cardFeature, items}){

    const matrix = [];
    for (let i = 0; i < items.length; i += maxColumn) {
        matrix.push(items.slice(i, i + maxColumn));
    }

    const render = function(){
        const renderCards = function(row) {
            return row.map((card) => {
                return (
                    <td className="p-2" key={card.id.toString()}>
                        <CustomCard maxWidth={cardFeature.maxWidth}
                              contentWidth={cardFeature.contentWidth}
                              numberContentRow = {cardFeature.numberContentRow}
                              horizontal = {cardFeature.horizontal}
                              img={card.img}
                              onClick={()=>{cardFeature.onClick(card)}}>
                            {card.description}
                        </CustomCard>
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
        <table style={{width:"80%", margin:"auto"}}>
            <thead style={{margin:"auto" }}>
                {render()}
            </thead>
        </table>
    );
}