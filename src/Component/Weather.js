import React from "react";


const Weather = (props) => {
    return(
            
            <>
            {
                (props.city) ?

            <div className="row">
            <div className="col-lg-3 offset-lg-2 mt-5">
                    <h3><i className="fa fa-map-marker fa-1x" aria-hidden="true"></i> {props.city}, {props.country}</h3>     
                </div>
                <div className="col-lg-3 mt-5">
                    <h5><i className={`wi ${props.weatherIcon} display-1`} /></h5>
                    <p className="mt-3"> {props.descripcion}</p> 
                    <h1 className="text-success mt-2"><strong>{props.temp} °C</strong> </h1>     
                </div>

                <div className="col-lg-3 mt-5">
                    <br></br>
                    <h5><strong>Temperatura Max:</strong> {props.temp_max} °C</h5>
                    <h5><strong>Temperatura Min:</strong> {props.temp_min} °C</h5>
                    <h5><strong>Presion:</strong> {props.pressure} hPa</h5>
                    <h5><strong>Humedad:</strong> {props.humidity} %</h5>
                    <h5><strong>Visibilidad:</strong> {props.visibility / 1000} km</h5>  
                        
                </div>
            </div> 
            :
            null
            }    
        
        </>

    );
};

export default Weather;