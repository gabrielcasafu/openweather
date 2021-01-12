import React from "react";


const Footer = (props) => {
    return(
    
        <> 
            <div className="row">
                <div className="col-lg-12 mt-4">
                    <p>Brindar información y pronósticos meteorológicos, prospectivas climáticas y alertas en su área de incumbencia, basados en el monitoreo continuo de la atmósfera y en el conocimiento científico, con el objeto de proteger a la población, contribuir a la defensa nacional, favorecer el desarrollo sustentable y dar cumplimiento a sus compromisos internacionales en la materia.</p>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12 mt-4">
                    <h4>Pronóstico para los próximos 5 días</h4>
                    <p>{props.dt}</p>
                </div>
            </div>
            
            <div className="row">
                
                <div className="col-lg-3 mt-4">
                
                </div>
                
            </div> 
        </>

    );
};

export default Footer;