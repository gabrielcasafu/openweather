import React from "react";


const Banner = (props) => {
    return(
    
        <> 
            <header className="main-header">
                <nav className="navbar navbar-static-top">
                    <div className="container">
                        <div className="navbar-header">
                            <a href="./" className="navbar-brand"><b>OPEN WEATHER MAP</b></a>
                                {
                                (props.city) ?
                                <>
                                    <span className="ml-1 text-white mr-2">
                                        {props.city}, {props.country} {props.temp}°C 
                                    </span> 
                                    <i className={`wi ${props.weatherIcon} display-5 text-white`} />  
                                </>
                                :
                                null
                                }
                            
                        </div>
                    </div>
                </nav>
            </header>
        </>

    );
};

export default Banner;