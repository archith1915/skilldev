class AppModel {
    TrainerModel = () => {
        const collection_name = 'trainer';
        const collection_fields = {
            name: String, 
            author: String,
            publisher: String, 
            number_of_copies: Number,
            price : Number
        };
        const collection_config = {
            timestamps: false
        };
        
        const schema = mongoose.Schema(collection_fields, collection_config);
        const Model = mongoose.model(collection_name, schema);
    
        return Model;
    }
}

module.exports = AppModel;