import React, { Component } from 'react'
import logo from './logo.svg'
import BaseMap from './components/map/index'
import axios from 'axios'
import './App.css'

class App extends Component {
  state = {
    searching: false,
    routes: []
  }
  componentDidMount () {
    this.getRoutes(
      '-100.09780883789062,4590780966,-98.22463989257814,19.735683578629445'
    )
  }
  getRoutes = (bounds, offset) => {
    this.setState({ searching: true })
    const bind = this
    axios
      .get(
        'https://transit.land/api/v1/routes?bbox=' + bounds
        //  +
        // '&vehicle_type=bus'
      )
      .then(function (response) {
        console.log(response)
        bind.setState({ searching: false, routes: response.data.routes })
      })
      .catch(function (error) {
        console.log(error)
        bind.setState({ searching: false })
      })
  }

  handleBoundsChange = bounds => {
    this.getRoutes(bounds)
  }

  render () {
    return (
      <div className='App'>

        <BaseMap
          onBoundsChange={this.handleBoundsChange}
          minZoom={6}
          searching={this.state.searching}
          routes={this.state.routes}
        />
        {this.state.searching &&
          <div className='note'>Searching for routes...</div>}
        {!this.state.searching &&
          this.state.routes &&
          <div className='note'>
            {this.state.routes.length} routes found here
          </div>}
      </div>
    )
  }
}

export default App
