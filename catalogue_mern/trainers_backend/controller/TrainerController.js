//TrainerModel
class TrainerController {
    create = async (request, response) => {
        const form = { ...request.body };
        
        let rbody = { };
        let rstatus = 200;

        try {
            const trainerModel = new TrainerModel( {
                _id : new mongoose.Types.ObjectId(),
                name: form.name, 
                author: form.author,
                publisher: form.publisher, 
                number_of_copies: form.number_of_copies,
                price : form.price
            } );
            const trainerModelRes = await trainerModel.save();

            const trainerDoc = await TrainerModel.findOne({_id: trainerModel._id}).lean();

            rbody = {
                data : trainerDoc,
                isError: false
            };

            console.log("create", rbody); 
        }
        catch( error ) {
            rbody = {
                data : {message : `Error in creating entry.\n${error}`},
                isError: true
            };         

            console.log("create", rbody); 

            rstatus = 500;
        }

        response.status(rstatus).send(rbody);
    }     

    update = async (request, response) => {
        //path variables
        const id = request.params.id;
        //form posted
        const form = { ...request.body };
        
        //
        let rbody = {};
        let rstatus = 200;

        try {
            const updatableTrainer = {
                name: form.name, 
                author: form.author,
                publisher: form.publisher, 
                number_of_copies: form.number_of_copies,
                price : form.price
            };  
            const trainerModelRes = await TrainerModel.findOneAndUpdate(
                        { _id : id }, 
                        updatableTrainer, 
                        {new: true});
            const updatedTrainer = await TrainerModel.findOne({ _id: id });
            
            if(!updatedTrainer) {
                rbody = {
                    data : {"message" : "Entry not found"},
                    isError: true
                };

                 console.log(rbody); 

                rstatus = 404;
            }
            else {
                rbody = {
                    data : updatedTrainer,
                    isError: false,
                    isLoggedIn: true
                };

                console.log(rbody); 
            }
        }
        catch( error ) {
            rbody = {
                data : {message : `Error in updating entry.\n${error}`},
                isError: true,
                isLoggedIn: true
            };

            console.log(rbody); 

            rstatus = 500;
        }

        response.status(rstatus).send(rbody);        
    }
    
    remove = async (request, response) => {
        const id = request.params.id;
        
        let rbody = {};
        let rstatus = 200;

        try {
            const trainerModelRes = await TrainerModel.findOneAndDelete({ _id : id });

            if(!trainerModelRes) {
                rbody = {
                    data : {"message" : "entry not found"},
                    isError: true
                };

                console.log(rbody); 

                rstatus = 404;
            } 
            else {
                rbody = {
                    data : {message: "entry Deleted successfully."},
                    isError: false
                }; 

                console.log(rbody); 
            }
        }
        catch( error ) {
            rbody = {
                data : {message : `Error in deleting entry.\n${error}`},
                isError: true
            };

            console.log(rbody); 

            rstatus = 500;
        }

        response.status(rstatus).send(rbody);
    }  

    readAll = async (request, response) => {
        let rbody = {};
        let rstatus = 200;

        try {
            const trainerDocs = await TrainerModel.find().lean();

            rbody = {
                data : trainerDocs,
                isError: false
            };
            
            console.log(rbody); 
        }
        catch( error ) {
            rbody = {
                data : {message : `Error in reading all entries.\n${error}`},
                isError: true
            };

            console.log(rbody);

            rstatus = 500;
        }

        response.status(rstatus).send(rbody);  
    }
    
    readById = async (request, response) => {
        const id = request.params.id;

        let rbody = {};
        let rstatus = 200;

        try {
            const trainerDoc = await TrainerModel.findOne({ _id : id }).lean(); 

            if(!trainerDoc) {
                rbody = {
                    data : {"message" : "entry not found"},
                    isError: true
                };

                 console.log(rbody);

                rstatus = 404;
            }
            else {
                rbody = {
                    data : trainerDoc,
                    isError: false
                };

                console.log(rbody); 
            }
        }
        catch( error ) {
            rbody = {
                data : {message : `Error in reading entry.\n${error}`},
                isError: false
            };

             console.log(rbody);  

            rstatus = 500;
        }

        response.status(rstatus).send(rbody);
    }

}

module.exports = TrainerController;