import React from "react";


const Search = (props) => {
    return(
    
        <>
            <div>{props.error ? error() : ""}</div>
            <form onSubmit={props.loadweather}>
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 mt-4">
                        <div className="input-group input-group-flat">
                            
                            <input type="text" name="city" className="form-control" placeholder="Ingrese ciudad (London) " />
                            <input type="text" name="country" className="form-control ml-2" placeholder="Ingrese pais (Uk)" />
                            <span className="input-group-btn">
                                <button className="btn btn-info btn-flat ml-2">Buscar</button>
                            </span>
                            
                        </div>
                    </div>
                </div>
            </form>
        </>

    );
};

const error = props => {
    return (
      <div className="alert alert-danger mx-5" role="alert">
        Por favor, ingrese ciudad y país.
      </div>
    );
};

export default Search;