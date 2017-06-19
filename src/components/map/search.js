import { MapControl } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-geocoder-mapzen'
import 'leaflet-geocoder-mapzen/dist/leaflet-geocoder-mapzen.css'

export default class SearchBox extends MapControl {
  componentWillMount () {
    const searchBox = L.control.geocoder('mapzen-Ce2Bkun', {
      pointIcon: false,
      polygonIcon: false,
      markers: false
    })
    this.leafletElement = searchBox
  }
}
