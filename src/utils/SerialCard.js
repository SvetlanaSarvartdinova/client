import React from 'react';
import {useNavigate} from "react-router-dom";
import { Card, CardActions, CardContent, Grid, CardMedia, Typography, Button, Box} from "@mui/material";

const SerialCard = ({serial}) => {
    const navigate = useNavigate();
    return (
        <Grid item xs={12} md={4}>
            <Card  sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="150"
                image={process.env.REACT_APP_API_URL + serial.content}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {serial.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Статус: {serial.status} 
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Сезонов: {serial.number_of_seasons}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Рейтинг IMDB: {serial.rating_imdb}
                </Typography>
            </CardContent>
            <CardActions >
                <Box>
                <Button size="small" onClick={() => navigate('/serial/' + serial.serial_id)}>Подробнее</Button>
                </Box></CardActions>
            </Card>
        </Grid>
    );
};

export default SerialCard;