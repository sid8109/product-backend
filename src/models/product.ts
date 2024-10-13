import { Model, DataTypes } from 'sequelize';
import sequelize from './index';

class Product extends Model {
    public id!: number;
    public name!: string;
    public price!: number;
    public description?: string;
    public category!: string;
}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0,
            isFloat: true,
        },
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    category: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
}, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    indexes: [
        {
            fields: ['name'],
        },
        {
            fields: ['category'],
        },
    ],
    hooks: {
        beforeValidate: (product) => {
            if (typeof product.name === 'string') {
                product.name = product.name.trim();
            }
            if (typeof product.category === 'string') {
                product.category = product.category.trim();
            }
            if (typeof product.description === 'string') {
                product.description = product.description.trim();
            }
        },
    },
});

export default Product;
