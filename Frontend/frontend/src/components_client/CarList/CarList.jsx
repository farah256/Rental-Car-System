import React from "react";
import CarCard from "../CarCard/CarCard.jsx";
import "../../pages_client/index.css";

function CarList({carList}){
    return(
        <div className="list-car">
            {
               carList.map(
                   (car,index)=>(
                       <div >
                           <CarCard car={car}/>
                       </div>
                   )
               )
            }
        </div>
    )

}
export default CarList;