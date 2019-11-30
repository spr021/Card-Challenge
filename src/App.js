import React, { useEffect } from 'react'
import Card from './card'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import { connect } from 'react-redux'
import { SaveRequest } from './action/action'

function App (props) {
  useEffect(() => {
    axios.get('http://static.pushe.co/challenge/json')
      .then(function (response) {
        console.log('rrrr', response.data)
        props.dispatch(SaveRequest(response.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  return (

    <Container maxWidth='lg'>
      <Grid
        xs={12}
        md={12}
        lg={6}
      >
        <Card />
      </Grid>
    </Container>
  )
}
const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

export default connect(mapDispatchToProps)(App)
