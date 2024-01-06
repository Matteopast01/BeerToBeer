import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import 'bulma/css/bulma.min.css';

function BeerCard({ vertical, horizontal, maxWidth, contentWidth, children, img  }) {
    let style
    if(horizontal){
        style = {maxWidth: maxWidth, display: 'flex'}
    }
    else{
        style = {maxWidth: maxWidth}
    }


    return (
        <Card sx={style}>
            <CardMedia
                component="img"
                height="194"
                image={img}
                alt="img"
            />
            <CardContent style={{ width: contentWidth }}>
                <Typography variant="body2" color="text.secondary">
                    {children}
                </Typography>
            </CardContent>
        </Card>
        );
}



export default BeerCard;
