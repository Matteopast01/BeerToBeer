import {useDispatch, useSelector} from "react-redux";
import CustomIconButton from "./CustomIconButton";
import CloseIcon from '@mui/icons-material/Close';
import {resetPubSelected} from "../store/App";
import CustomCard from "./CustomCard";

function SinglePub(){

    const pubSelected = useSelector(state => state.pub.value);

    // if we are rendering singlePub it means that a pubSelected exists and so its properties images and description
    // however js needs a fallback value in case of null state

    //pubSelected.name (nome)
    //pubSelected.img (immagine)
    //pubSelected.description (descrizione)
    //pubSelected.lat
    //pubSelected.lng

    let images = pubSelected?.img || [];
    let description = pubSelected?.description || "";

    let name = pubSelected?.name;

     const dispatch = useDispatch();

     function handleClick(){
        dispatch(resetPubSelected(null))
    }

    return (

        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                <div style={{width: '70px'}}/>
                <div style={{flex: '1', textAlign: 'center', fontSize: '40px', fontFamily: 'Arial, sans-serif'}}>
                    <b>{name}</b>
                </div>
                <div style={{ width: '70px' }} />
                <div style={{ width: '50px' }}>
                    <CustomIconButton icon={<CloseIcon sx={{ color: '#f30303' }} />} handleClick={handleClick} size={"medium"} />
                </div>
            </div>
            <CustomCard img={images}  contentStyle={{width:"100%", background: "#f5f5f5"}} maxWidth={"95%"}>
                <div style={{textAlign: 'left', fontSize: '16px', fontFamily: 'Arial, sans-serif'}}>
                    {description}
                </div>
            </CustomCard>
        </div>
    );
}

export default SinglePub;
