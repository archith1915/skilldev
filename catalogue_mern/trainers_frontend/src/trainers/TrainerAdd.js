import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import LoggedInHeader from "../header/LoggedInHeader";
import trainersService from '../services/TrainersService';


function TrainerAdd() { 
    
    const initTrainer = {
        name:"", 
        author:"",
        publisher:"", 
        number_of_copies:"",
        price : "",
    };
    const [trainer, setTrainer] = useState(initTrainer);
    const navigate =useNavigate();
    const onTextChange = function(event){
        const changedTrainer = {...trainer};
        changedTrainer[event.target.id] = event.target.value;
        setTrainer(changedTrainer);
    }
    const doCreateTrainer = async function(event){
        if(!window.confirm(`Are you sure to create the trainer '${trainer.name}'?`)){
            return;
        }
        const axiosResponse = trainersService.create({
            name:trainer.name, 
            author: trainer.author,
            publisher: trainer.publisher, 
            number_of_copies: trainer.number_of_copies,
            price : trainer.price
        });

        alert('Trainers is created successfully.');
        navigate("/trainers/list")
        console.log(`${trainer.name} has been created successfully`);
    }
    

    return(
        <>  <LoggedInHeader/>
        <div>
                <a href="/trainers/list" className="btn btn-dark">&lt;&lt;Go Back</a>
                <h3>Add entry</h3>
                <div class="container">
                    <div className="form-group">
                        <label htmlFor="name">Book name</label>
                        <input required type="text" className="form-control bg-dark text-light" 
                        id="name" aria-describedby="nameHelp" placeholder="Enter Book name"
                        value={trainer.name} onChange={onTextChange} /> 
                        <small id="nameHelp" className="form-text text-muted">Please enter name.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input type="text" className="form-control bg-dark text-light" 
                        id="author" aria-describedby="locationHelp" placeholder="Enter author"
                        value={trainer.author} onChange={onTextChange}/> 
                        <small id="locationHelp" 
                            className="form-text text-muted">Please enter author.</small>
                    </div>                    
                    <div className="form-group">
                        <label htmlFor="publisher">Publisher</label>
                        <input type="text" className="form-control bg-dark text-light" 
                        id="publisher" aria-describedby="technologyHelp" placeholder="Enter trainer publisher"
                        value={trainer.publisher} onChange={onTextChange}/> 
                        <small id="technologyHelp" 
                            className="form-text text-muted">Please enter publisher.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="number_of_copies">Number of copies</label>
                        <input type="text" className="form-control bg-dark text-light" 
                        id="number_of_copies" aria-describedby="phone_numberHelp" placeholder="Enter number of copies"
                        value={trainer.number_of_copies} onChange={onTextChange}/> 
                        <small id="phone_numberHelp" 
                            className="form-text text-muted">Please enter number of copies.</small>
                    </div>   


                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="text" className="form-control bg-dark text-light" 
                        id='price' aria-describedby="phone_numberHelp" placeholder="Enter price"
                        value={trainer.price} onChange={onTextChange}/> 
                        <small id="phone_numberHelp" 
                            className="form-text text-muted">Please enter price.</small>
                    </div> 


                    <button type="button" class="btn btn-success"
                     onClick={doCreateTrainer}>Create Entry</button>
                </div>
            </div>
    </>
    );
}

export default TrainerAdd;