import React, {useEffect, useState, useContext} from 'react';
import { Alert, Card, CardActions, CardContent, Grid} from "@mui/material";
import { CardMedia, Typography, Button, Box, Divider, Container, Paper, Rating, TextField} from "@mui/material";
import {useParams} from 'react-router-dom'
import {fetchOneSerial, fetchReviews, checkList} from "../http/SerialAPI";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import { Context } from '../index';
import {$authHost} from "../http/index";
import DeleteIcon from '@mui/icons-material/Delete';


const SerialPage = observer(() => {
    const navigate = useNavigate();
    const {user} = useContext(Context)
    const [serial, setSerial] = useState({})
    const {id} = useParams()
    const [reviews, setReviews] = useState([])
    const [text, setText] = useState("")
    const [rating, setRating] = useState(null)
    const [error, setError] = useState(undefined)
    const [success,setSuccess] = useState("")
    const [isInList, setIsInList] = useState({})


    useEffect(() => {
        fetchOneSerial(id).then(data => setSerial(data))
        fetchReviews(id).then(data => setReviews(data))
        if (user.isAuth) {
        checkList(id).then(data => setIsInList(data))
        }
    }, [])


    const createReviews = async (id, text_rew, rating) => {
      try {
      const {data} = await $authHost.post('api/reviews/' + id, {text_rew, rating})
      setSuccess("Ваш отзыв успешно отправлен")
      setRating(null)
      setText("")
      setError("")
      return data
      } catch (e) {
          setSuccess("")
          setError(e.response.data.message)
        }
  }
    const deleteReview = async (review_id) => {
      const {data} = await $authHost.delete('api/reviews/' + review_id)
    }

  const addInList = async (id,is_viewed) => {
    const {data} = await $authHost.post('api/userlists/' + id, {is_viewed} )
    setIsInList(data)
}

const deleteList = async (id) => {
  const {data} = await $authHost.delete('api/userlists/' + id )
  setIsInList(data)
}

    const card = reviews.map((data) => {
        return (
          <React.Fragment key={data.review_id}>  
            <CardContent align="left">
              <Typography variant="h6" component="div">
                {data.username}
              </Typography>
              <Rating name="read-only" value={data.rating} readOnly />
              <Typography variant="body2">{data.text_rew}</Typography>
              {user.user.is_superuser && ( 
                <CardActions >
                <Box>
                <Button onClick={() => navigate('/admin/review/'+ data.review_id)}> Редактировать </Button>
                <Button onClick={() => deleteReview(data.review_id)}> Удалить </Button>
                </Box></CardActions>
              )}              
            </CardContent>
          </React.Fragment>
        );
      });

    return (
        <Container>
        <Grid align="center" sx={{ mb: "1rem" }}>
        <Card  sx={{ maxWidth: 800}}>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {serial.name}
            </Typography>
        </CardContent>
        <CardMedia
            component="img"
            height="450"
            image={process.env.REACT_APP_API_URL + serial.content}
        />
        {user.isAuth && (
          <Box>
        {isInList.inlist === -1 && (
        <CardActions >
        <Box sx={{ flex: "1 1 auto" }}>
        <Button 
          variant="outlined"  
          onClick={() => addInList(id, true)} 
          sx={{ mr: 1 }}>
          Посмотрела
        </Button>
        <Button 
          variant="outlined"  
          onClick={() => addInList(id, false)} 
          sx={{ mr: 1 }}>
          Буду смотреть
        </Button>
        </Box></CardActions>
        )}
        {isInList.inlist === true && (<Typography variant='h6' sx={{ mt: 1, mb: "1rem" }}>Добавлено в список Просмотрено</Typography>)}
          {!isInList.inlist && (<Typography variant='h6' sx={{ mt: 1, mb: "1rem" }}>Добавлено в список Хочу посмотреть</Typography>)}
          {isInList.inlist !== -1 && (
          <Button variant="outlined"  onClick={() => deleteList(id)} startIcon={<DeleteIcon />}>
              Удалить из списка
            </Button>
          )}
            </Box>
        )}
        <CardContent>
            <Typography gutterBottom component="div">
            {serial.description}
            </Typography>
            <Divider/> 
            <Grid container spacing={4}  padding={2}>
        <Grid item xs={6}>
        <Box sx={{ width: '100%', maxWidth: 600}}>
        <Typography variant="body1" color="text.secondary" align='left'>Жанр: </Typography>
        <Typography variant="body1" color="text.secondary" align='left'>Страна: </Typography>
        <Typography variant="body1" color="text.secondary" align='left'>Статус: </Typography>
        <Typography variant="body1" color="text.secondary"align='left'>Год выхода: </Typography>
        <Typography variant="body1" color="text.secondary" align='left'>Количество сезонов: </Typography>
        <Typography variant="body1" color="text.secondary" align='left'>Количество серий: </Typography>
        <Typography variant="body1" color="text.secondary" align='left'>Длительность эпизода: </Typography>
        <Typography variant="body1" color="text.secondary" align='left'>Рейтинг IMDB: </Typography>
        <Typography variant="body1" color="text.secondary" align='left'>Ресурс для просмотра: </Typography>
        <Typography variant="body1" color="text.secondary" align='left'>Главные актеры: </Typography>
        </Box>
        </Grid>
        <Grid item xs={6}>
        <Box sx={{ width: '100%', maxWidth: 600}}>
        <Typography variant="body1" color="text.secondary" align='left'>{serial.genre_name} </Typography>
        <Typography variant="body1" color="text.secondary" align='left'>{serial.country_name} </Typography>
        <Typography variant="body1" color="text.secondary" align='left'>{serial.status} </Typography>
        <Typography variant="body1" color="text.secondary" align='left'>{serial.release_year} </Typography>
        <Typography variant="body1" color="text.secondary" align='left'>{serial.number_of_seasons} </Typography>
        <Typography variant="body1" color="text.secondary" align='left'>{serial.number_of_episodes} </Typography>
        <Typography variant="body1" color="text.secondary" align='left'>{serial.duration_of_episode} </Typography>
        <Typography variant="body1" color="text.secondary" align='left'>{serial.rating_imdb} </Typography>
        <Typography variant="body1" color="text.secondary" align='left'>{serial.resourse_url} </Typography>
        <Typography variant="body1" color="text.secondary" align='left'>{serial.main_actors} </Typography>
        </Box>
        </Grid>
        </Grid> 
        {user.user.is_superuser && ( 
                <CardContent >
                <Button onClick={() => navigate('/admin/serial/'+ id)}> Обновить информацию о сериале </Button>
                </CardContent>
              )} 
        </CardContent>
        </Card>
    </Grid>
    <Grid align="center" sx={{ mb: "1rem"}} >
      <Box style={{ width: 800 }}>
      <Typography variant="h5" sx={{ mb: "1rem" }}>
          Отзывы о сериале
        </Typography>
    <Card variant="outlined" >{card}</Card>
    {user.isAuth && (
    <Paper style={{ padding: 20,  width: 760, margin: "20px auto"}}>
    <Typography variant="h5" sx={{ mb: "1rem" }}> Оставьте отзыв</Typography>
    <Grid align='left' sx={{ width: 600}}>
    {error && (
          <Alert severity="error" sx={{ mb: "1rem" }}>
            {error}
          </Alert>
        )}
        {success && (
            <Alert severity="success" sx={{ mb: "1rem" }}>
              {success}
            </Alert>
        )}
    <Rating
      name="simple-controlled"
      value={rating}
      onChange={(event, rating)=> setRating(rating)}
      sx={{ mb: "1rem" }}
    />
    <TextField
          id="outlined-multiline-static"
          label="Введите комментарий"
          multiline
          sx={{ width: '75ch',  mb: "1rem" }}
          rows={4}
          value={text}
          onChange={(event) => {setText(event.target.value)}}
        />
        </Grid>
        <Button size='large' variant="outlined" onClick={() => createReviews(id, text, rating)}>Отправить</Button>
      </Paper>
    )}
    </Box>
    </Grid>
    </Container>
    );
});

export default SerialPage;