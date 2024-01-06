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
        style = {maxWidth: maxWidth, display: 'flex'}
    }
    else{
        style = {maxWidth: maxWidth}
    }


    return (
        <Card sx={style} onClick={onClick}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="194"
                    image={img}
                    alt="img"
                />
                <CardContent style={{ width: contentWidth }}>
                    <Typography component={"span"} variant="body2" color="text.secondary">
                        {children}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        );
}



export default BeerCard;
