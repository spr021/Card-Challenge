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
import PropTypes from 'prop-types'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import { useSpring, animated } from 'react-spring/web.cjs'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save'
import { SaveChange } from './action/action'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ccc',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5, 5, 5)
  }
}))

const useStyle = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
})

const modal = {
  height: 200,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const Fade = React.forwardRef(function Fade (props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter()
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited()
      }
    }
  })

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  )
})

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func
}

function MediaCard (props) {
  const classe = useStyle()
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [cardView, setCardView] = useState({
    code: 1,
    title: 'Exercise',
    description: 'Exercise on a regular basis.',
    tag: 'sport'
  })

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function changCard () {
    const rand = Math.floor(Math.random() * 5)
    setCardView(props.cards.cards[rand])
  }
  function saveChanges () {
    props.dispatch(SaveChange(cardView))
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
console.log('sttttttttt', cardView)
  return (
    <div className='cards'>
      <Card style={Theme[cardView.tag].style}>
        <CardActionArea>
          <CardMedia
            className={classe.media}
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
          <Button size='small' color='primary' onClick={handleOpen}>
          Edite
          </Button>
          <Modal
            aria-labelledby='spring-modal-title'
            aria-describedby='spring-modal-description'
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            <Fade in={open}>
              <div style={modal} className={classes.paper}>
                <TextField onChange={(e) => setCardView({ ...cardView, title: e.target.value })} id='outlined-basic' label='Title' variant='outlined' />
                <TextField id='outlined-basic' label='Description' variant='outlined' />
                <div className='modal-button'>
                  <Button
                    onClick={(e) => saveChanges(e)}
                    variant='contained'
                    color='primary'
                    className={classes.button}
                    endIcon={<SaveIcon />}
                  >
                  Save
                  </Button>
                  <Button
                    variant='contained'
                    color='secondary'
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Fade>
          </Modal>
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

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(MediaCard)
// connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(component)
