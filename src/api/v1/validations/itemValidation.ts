import Joi, { ObjectSchema } from "joi";

// Item operation schemas organized by request part
export const itemSchemas = {
    // POST /items - Create new item
    create: {
        body: Joi.object({
            name: Joi.string().required().messages({
                "any.required": "Name is required",
                "string.empty": "Name cannot be empty",
            }),
            description: Joi.string().required().messages({
                "any.required": "Description is required",
                "string.empty": "Description cannot be empty",
            }),
            price: Joi.number().optional().min(0).messages({
                "number.min": "Price must be a positive value",
            }),
        }),
    },

    // GET /items/:id - Get single item
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Item ID is required",
                "string.empty": "Item ID cannot be empty",
            }),
        }),
    },

    // DELETE etc ...
};