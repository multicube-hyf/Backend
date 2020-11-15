import mongoose from 'mongoose';

const dbConnection =  async () => {

     try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        
        //This is just for local test
        // await mongoose.connect('mongodb://localhost:27017/nada', {
        //     useNewUrlParser: true, 
        //     useUnifiedTopology: true,
        //     useCreateIndex: true
        // });

        console.log('DB online')

     } catch (error) {
         console.log(error);
        throw new Error('Error connecting to database');
     }
};

export { dbConnection };
