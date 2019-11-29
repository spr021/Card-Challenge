import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Theme from './config/theme'

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    backgroundColor: 'blue'
  },
  media: {
    height: 140
  }
})

function MediaCard (props) {
  const [cardView, setCardView] = useState({
    code: 1,
    title: 'Exercise',
    description: 'Exercise on a regular basis.',
    tag: 'sport'
  })
  function changCard () {
    const rand = Math.floor(Math.random() * 5)
    setCardView(props.cards.cards[rand])
  }
  useEffect(() => {
    if (cardView.code === 2) {
      const audioUrl = cardView.sound
      console.log('sound', audioUrl)
      var music = new Audio(audioUrl)
      music.play()
    }

    return () => {
      if (cardView.code === 2) {
        music.pause()
      }
    }
  }, [cardView.code])

  const classes = useStyles()

  return (
    <div className='cards'>
      <Card style={Theme[cardView.tag].style}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={cardView.code === 0 ? cardView.image : ''}
            title={cardView.title}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {cardView.title}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {cardView.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size='small' color='primary'>
          Edite
          </Button>
        </CardActions>
      </Card>
      <br />
      <Fab onClick={() => changCard()} color='primary' aria-label='add'>
        <AddIcon />
      </Fab>
    </div>
  )
}

const mapStateToProps = (state) => ({
  cards: state.obj
})

export default connect(mapStateToProps)(MediaCard)
