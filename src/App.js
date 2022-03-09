import React, { Component} from 'react';
import {Input } from 'reactstrap';

import 'weathericons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const api = {
  key: "6f37e51f54f144d7b38181046220803",
  base: "http://api.weatherapi.com/v1/forecast.json",
}

class App extends Component{
  
  constructor(){
    super();
    
    this.state={
      city: '',
      location: '',
      weatherAndForecastsDays: [],
      locations: [{id: 1,name: "Bariloche"}, {id: 2,name: "Mendoza"}, {id: 3,name: "Ushuaia"}, {id: 4,name: "Posadas"}, {id: 5,name: "San Juan"}]
    };

  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((location) => {
      this.setState({ location })
      this.geoReferencia();
    }, (err) => {
      console.log(err.message)
    })
  }

  changeCity = e => {

    this.setState({
      city: e.target.value,
    }, () => {
      this.consultarDatos();
    })
  }

  consultarDatos() {
    fetch(`${api.base}?key=${api.key}&q=${this.state.city }&days=5&aqi=no&alerts=no&lang=es`)
        .then(res => res.json())
        .then(result => {
          this.setState({
            weatherAndForecastsDays: result,
          }) 
        });
  }

  geoReferencia() {
    const { latitude } = this.state.location.coords;
    const { longitude } = this.state.location.coords;
    fetch(`${api.base}?key=${api.key}&q=${latitude},${longitude}&days=5&aqi=no&alerts=no&lang=es`)
        .then(res => res.json())
        .then(result => {
          this.setState({
            weatherAndForecastsDays: result,
          }) 
        });
  }
           
  dateBuilder = (d) => {
    let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "sabado"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} de ${month} de ${year}`
  }

  format_time(s) {
    let day = new Date(s).toLocaleDateString();
    return  day.slice(0, -5) ;
  }

  render(){

  const { 
      city,
      weatherAndForecastsDays,
      locations,
      location
  } = this.state;

    return(
      <div>
      <main>
        <div className="search-box">
          <Input
              type="select"
              className="form-control"
              onChange={this.changeCity}
              value={city}
          >
              <option value=''>Seleccionar ciudad</option>
              {
                  locations && locations.map(location =>( <option key={location.id} value={location.name}>{location.name}</option> ) )
              }
          </Input>
        </div>
        
        {
          (weatherAndForecastsDays != '') ? (
          <div>
            <div className="content-box">
              <div className="left-box">
                  <div className='title'>
                    EL TIEMPO AHORA EN <span className='title-localization'>{weatherAndForecastsDays.location && weatherAndForecastsDays.location.name}</span><br></br>
                    <span className='date'>{this.dateBuilder(new Date())}</span>
                  </div>
                  
                  <div className='weather-current'>
                      <div className='weather-image'>
                          <img src={weatherAndForecastsDays.current && weatherAndForecastsDays.current.condition.icon} alt="weather" width="64" height="64"/>
                      </div>
                      <div className='weather-temp'>
                        {weatherAndForecastsDays.current && weatherAndForecastsDays.current.temp_c}°<span className='weather-temp-icon'>C</span>
                      </div>
                  </div>
                  <div className='title-data'>{weatherAndForecastsDays.current && weatherAndForecastsDays.current.condition.text}</div>
              </div>
              <div className="right-box">
                <div className='weather-current'>
                    <div className='weather-data'>
                        <p className='line-separate'>Humedad: <span className='data-right'>{weatherAndForecastsDays.current && weatherAndForecastsDays.current.humidity}%</span></p>
                        <p className='line-separate'>Presion: <span className='data-right'>{weatherAndForecastsDays.current && weatherAndForecastsDays.current.pressure_mb} hPa</span></p>
                        <p className='line-separate'>Velocidad del Viento: <span className='data-right'>{weatherAndForecastsDays.current && weatherAndForecastsDays.current.wind_dir} - {weatherAndForecastsDays.current && weatherAndForecastsDays.current.wind_kph}km/h</span></p>
                        <p>Visibilidad: <span className='data-right'>{weatherAndForecastsDays.current && weatherAndForecastsDays.current.vis_km}km</span></p>
                    </div>

                </div>
              </div>

              <div className="content-box-forecast">

                <div className='title-forecast'>PREVISION PROXIMOS 3 DÍAS</div>

                {
                  
                      weatherAndForecastsDays.forecast && weatherAndForecastsDays.forecast.forecastday.map((comprobante, index) => {
                        return (
                          <div className="full-box">
                              <div className='date-forecast'>
                                {comprobante && this.format_time(comprobante.date)}
                              </div> 

                              <div className='date-forecast'>
                                    <img src={comprobante && comprobante.day.condition.icon}  alt="Forecasts" width="64" height="64"/>
                              </div>

                              <div className='date-forecast'>
                                <span className='date-forecast-title'>{comprobante && comprobante.day.maxtemp_c}°</span> / {comprobante && comprobante.day.mintemp_c}°
                              </div>

                              <div className='date-forecast'>
                                {comprobante && comprobante.day.condition.text}
                              </div>
                          </div>

                    );
                  })
                  
                  
                }
                

            </div>


            </div>

          </div>
                      
          

        ) : ('')
        
        
        }
      </main>
    </div>
    );
  }

}

export default App;
