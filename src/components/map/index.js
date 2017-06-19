import React, { Component } from 'react'
import { Map, TileLayer, Polyline, Popup, Tooltip } from 'react-leaflet'
import SearchBox from './search'

const outer = [[19.07250, -99.997], [19.70336, -98.1243]]

export default class BaseMap extends Component {
  state = {
    bounds: outer
  }

  handleMoveend = e => {
    const bounds = e.target.getBounds()
    this.props.onBoundsChange(bounds.toBBoxString())
  }

  handleLoad = e => {
    debugger
    e.target.zoomIn(1)
  }

  render () {
    const { minZoom, routes } = this.props

    return (
      <Map
        bounds={this.state.bounds}
        zoomControl={false}
        onMoveend={this.handleMoveend}
        minZoom={minZoom}
        onLoad={this.handleLoad}
      >
        <SearchBox />
        <TileLayer
          attribution='&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
          url='http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png'
        />

        {routes &&
          routes.map((route, i) => {
            return (
              <Polyline
                key={i}
                color={route.color ? '#' + route.color : 'lime'}
                positions={route.geometry.coordinates.map(a =>
                  a.map(b => b.reverse())
                )}
              >
                <Popup>
                  <div>
                    <div>{route.operated_by_name}</div>
                    <span>{route.name} {route.vehicle_type}</span>
                  </div>
                </Popup>

              </Polyline>
            )
          })}
      </Map>
    )
  }
}
