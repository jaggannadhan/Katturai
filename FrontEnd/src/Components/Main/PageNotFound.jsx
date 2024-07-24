import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../../Styles/Main/PageNotFound.scss';

const PageNotFound = () => { 
    const navigate = useNavigate();

    useEffect(() => {
        const activate = () => {
            document.querySelector('.cont_principal').className= "cont_principal cont_error_active";  
        }
        activate();
    }, []);


    return(
        <div className="cont_principal">
            <div className="cont_error">
                <h1>Oops</h1>  
                <p>The Page you're looking for isn't here.</p>
                <div id="home-btn">
                    <h4 className="btn-txt"
                        onClick={() => navigate("/")}
                    >
                        Home
                    </h4>
                </div>
            </div>
            <div className="cont_aura_1"></div>
            <div className="cont_aura_2"></div>
        </div>
    )
}

export default PageNotFound;
