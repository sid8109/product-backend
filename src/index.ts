import express from 'express';
import productRoutes from './routes/productRoutes';
import sequelize from './models';

const app = express();
app.use(express.json());

sequelize.sync({ force: false })
    .then(() => {
        console.log('All models were synchronized successfully.');
    })
    .catch((error) => {
        console.error('Error synchronizing models:', error);
    });


app.use('/products', productRoutes);

sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Unable to connect to the database:', err));

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
