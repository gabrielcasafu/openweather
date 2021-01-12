import React, { Component} from 'react';

import Weather from "./Component/Weather";
import Search from "./Component/Search";
import Footer from "./Component/Footer";
import Banner from "./Component/Banner";
import 'weathericons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Api_Key = "39bdd30d5ff4dcb293669437108f69cf";

class App extends Component{
  
  constructor(){
    super();
    
    this.state={
      city: undefined,
      country: undefined,
      temp: '',
      temp_max: '',
      temp_min: '',
      pressure: '',
      humidity: '',
      visibility: '',
      descripcion: '',
      dt:'',
      //currentCity: '',
      error: false
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };

  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  //convierto a grados celsius
  calCelsius(temp){
    let cell = Math.floor(temp-273,15);
    return cell;
  }

  //formateo fecha
  format_time(s) {
    let day = new Date(s * 1e3).toLocaleDateString();
    let hora = new Date(s * 1e3).toLocaleTimeString();
    return  "Pronóstico oficial del día " + day + " última actualizacion a las " + hora + " horas.";
  }

  
  getWeather = async e => {
    
    e.preventDefault();

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

    if (country && city) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}&lang=sp`
        //`http://api.openweathermap.org/data/2.5/weather?q=London,Uk&appid=${Api_Key}`
      );

      const response = await api_call.json();

      this.setState({
        city: response.name,
        country: response.sys.country,
        main: response.weather[0].main,
        temp: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        pressure: response.main.pressure,
        humidity: response.main.humidity,
        visibility: response.visibility,
        descripcion: response.weather[0].description,
        dt: this.format_time(response.dt),
        error: false

      });

      // seting icons
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);

      console.log(response);
    } else {
      this.setState({
        error: true
      });
    }
  };

  render(){

    return(
      <div className="hold-transition skin-blue layout-top-nav">
        <div className="wrapper">

          <Banner 
           city={this.state.city} 
           country={this.state.country}
           temp={this.state.temp} 
           weatherIcon={this.state.icon}
          />  
          <div className="content-wrapper">
              <div className="container"> 
                  <section className="content text-center">
                      <Search 
                        loadweather={this.getWeather}
                        error={this.state.error}
                      />
                      <Weather 
                        city={this.state.city} 
                        country={this.state.country} 
                        temp={this.state.temp} 
                        temp_max={this.state.temp_max} 
                        temp_min={this.state.temp_min} 
                        pressure={this.state.pressure} 
                        humidity={this.state.humidity} 
                        visibility={this.state.visibility}
                        descripcion={this.state.descripcion}

                        weatherIcon={this.state.icon}
                      />
                      <Footer 
                        dt={this.state.dt}
                      />

                  </section>  
              </div>
          </div> 

      </div>
    </div>
    );
  }

}

export default App;
