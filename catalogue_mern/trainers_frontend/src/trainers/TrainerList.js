
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoggedInHeader from "../header/LoggedInHeader";
import trainersService from "../services/TrainersService";
function TrainerList() { 
    const [trainers, setTrainers] =  useState([]);
    const navigate = useNavigate();

    const callToReadAllTrainers = async function(){
        let axiosResponse; 
        
        try{
            axiosResponse = await trainersService.readAll();
        }
        catch(error){
            alert('Server Error');
            return;
        }
        
        const json =  axiosResponse.data; 
        
        setTrainers(json.data); 
    }

    useEffect(() => { 
        callToReadAllTrainers();
    }, []);

    const deleteByTrainer = async function(trainer){
        if(!window.confirm(`Are you sure to delete the trainers '${trainer.name}'?`)){
            return;
        }
        const axiosResponse = await trainersService.delete(trainer._id);
        const json = axiosResponse.data;
        alert(json.data.message);
        console.log(`${trainer.name} has been deleted successfully`);
        callToReadAllTrainers();
    }

    return (
        <>
          <LoggedInHeader />
          <div className="container"><br></br>
            <h3>Books List</h3>
            <br></br>
            <a href="/trainers/add" className="btn btn-success">Add Entry</a>
            <br></br>
            <br></br>
            <div className="row justify-content-center">
              {trainers.map((trainer) => (
                <div key={trainer._id} className="col-md-4 mb-4">
                  <div className="card text-left text-white bg-dark">
                    <div className="card-body">
                      <h5 className="card-title">{trainer.name}</h5>
                      <p className="card-text">
                        Author: {trainer.author}
                        <br />
                        Publisher: {trainer.publisher}
                        <br />
                        Number of Copies: {trainer.number_of_copies}
                        <br />
                        Price: {trainer.price}
                      </p>
                      <div className="d-flex justify-content-justify">
                        <a href={`/trainers/edit/${trainer._id}`} className="btn btn-warning me-2">Edit</a>
                        <button className="btn btn-danger" onClick={() => deleteByTrainer(trainer)}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      );
}

export default TrainerList;