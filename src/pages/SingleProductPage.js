import { useParams } from 'react-router-dom';


function SingleProductPage(){
    const {beerId} = useParams()
    return (
        <div>
            {beerId}
        </div>
    )

}

export default SingleProductPage