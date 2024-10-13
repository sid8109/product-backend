import { Router, Request, Response } from 'express';
import { Op } from 'sequelize';
import Product from '../models/product';
import { validateProductCreation, validateProductUpdate } from '../middlewares/validateProduct';

const router = Router();

const handleError = (res: Response, message: string, statusCode: number = 500, errorDetails?: any) => {
    console.error(errorDetails);
    res.status(statusCode).json({
        error: {
            message,
            statusCode,
        },
    });
};

router.post('/', validateProductCreation, async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, price, description, category } = req.body;

        if (!name || !price || !category) {
            handleError(res, 'Missing required fields: name, price, or category', 422);
            return;
        }

        const product = await Product.create({ name, price, description, category });
        res.status(201).json(product);
    } catch (error) {
        handleError(res, 'Failed to create product', 400, error);
    }
});

router.get('/', async (req: Request, res: Response): Promise<void> => {
    const { page = 1, limit = 10, search } = req.query;
    const where = search
        ? {
            [Op.or]: [
                { name: { [Op.iLike]: `%${search}%` } },
                { category: { [Op.iLike]: `%${search}%` } },
            ],
        }
        : {};

    try {
        const products = await Product.findAndCountAll({
            where,
            limit: parseInt(limit as string, 10),
            offset: (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10),
        });
        res.json({
            totalItems: products.count,
            totalPages: Math.ceil(products.count / parseInt(limit as string, 10)),
            currentPage: parseInt(page as string, 10),
            products: products.rows,
        });
    } catch (error) {
        handleError(res, 'Failed to fetch products', 500, error);
    }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            handleError(res, 'Product not found', 404);
            return;
        }
        res.json(product);
    } catch (error) {
        handleError(res, 'Failed to fetch product', 500, error);
    }
});

router.put('/:id', validateProductUpdate, async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            handleError(res, 'Product not found', 404);
            return;
        }

        const { name, price, description, category } = req.body;

        const updatedFields: Partial<{
            name: string;
            price: number;
            description?: string;
            category: string;
        }> = {};

        if (name) updatedFields.name = name;
        if (price) updatedFields.price = price;
        if (description) updatedFields.description = description;
        if (category) updatedFields.category = category;

        await product.update(updatedFields);
        res.json(product);
    } catch (error) {
        handleError(res, 'Failed to update product', 400, error);
    }
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            handleError(res, 'Product not found', 404);
            return;
        }
        await product.destroy();
        res.status(204).send();
    } catch (error) {
        handleError(res, 'Failed to delete product', 500, error);
    }
});

export default router;