import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import 'bulma/css/bulma.min.css';
import {CardActionArea} from '@mui/material';

function BeerCard({ horizontal, maxWidth, contentWidth, children, img , onClick }) {
    let style
    if(horizontal){
        style = {width: maxWidth, display: 'flex'}
    }
    else{
        style = {width: maxWidth}
    }


    return (
        <Card sx={style}>
            <CardActionArea onClick={onClick}>
                <CardMedia
                    component="img"
                    image={img}
                    alt="img"
                />
            </CardActionArea>
            <CardContent sx={{width: contentWidth}}>
                <Typography component={"span"} variant="body2" color="text.secondary">
                    {children}
                </Typography>
            </CardContent>
        </Card>
        );
}



export default BeerCard;
