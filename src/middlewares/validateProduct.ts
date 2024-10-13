import { Request, Response, NextFunction } from 'express';

const removeSpaces = (value: string) => value.trim();

const validateProductCreation = (req: Request, res: Response, next: NextFunction): void => {
    let { name, price, category } = req.body;

    name = name ? removeSpaces(name) : null;
    category = category ? removeSpaces(category) : null;

    if (!name) {
        res.status(422).json({ error: 'Product name is required and cannot be empty.' });
        return;
    }

    if (!price || isNaN(price) || parseFloat(price) <= 0) {
        res.status(422).json({ error: 'Valid product price is required (a positive number).' });
        return;
    }

    if (!category) {
        res.status(422).json({ error: 'Product category is required and cannot be empty.' });
        return;
    }

    req.body.name = name;
    req.body.category = category;

    next();
};

const validateProductUpdate = (req: Request, res: Response, next: NextFunction): void => {
    let { name, price, category } = req.body;

    if (!name && !price && !category) {
        res.status(422).json({ error: 'At least one field (name, price, or category) is required for updating.' });
        return
    }

    if (name) req.body.name = removeSpaces(name);
    if (category) req.body.category = removeSpaces(category);

    if (price && (typeof price !== 'number' || price <= 0)) {
        res.status(422).json({ error: 'Valid product price is required (a positive number).' });
        return
    }

    next();
};

export { validateProductCreation, validateProductUpdate };