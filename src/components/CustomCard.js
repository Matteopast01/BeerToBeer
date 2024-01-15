import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import 'bulma/css/bulma.min.css';
import {CardActionArea} from '@mui/material';

function CustomCard({ horizontal, maxWidth, contentStyle, numberContentRow, children, img , onClick }) {
    let style
    if(horizontal){
        style = {width: maxWidth, display: 'flex'}
    }
    else{
        style = {width: maxWidth, display: 'flex', flexDirection: 'column'}
    }


    return (
        <Card sx={style}>
            {!!onClick ? (<CardActionArea onClick={onClick}>
                <CardMedia
                    style={{padding: "5px", position: "relative", margin: "auto", width: "auto", height: "350px"}}
                    component="img"
                    image={img}
                    alt="img"
                />
                </CardActionArea>) :
                <CardMedia
                    style={{padding: "5px", position: "relative", margin: "auto", width: "auto", height: "350px"}}
                    component="img"
                    image={img}
                    alt="img"
                />}
            <CardContent sx={contentStyle}>
                <Typography sx={{display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: numberContentRow,
                    overflow: 'hidden', textOverflow: 'ellipsis'}} component={"div"}>
                    {children}
                </Typography>
            </CardContent>
        </Card>
    );
}



export default CustomCard;
