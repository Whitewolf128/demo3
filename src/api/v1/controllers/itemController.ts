import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as itemService from "../services/itemService";
import type { Item } from "../models/itemModel";
import { successResponse } from "../models/responseModel";

/**
 * Retrieves all items
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const getAllItems = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const items: Item[] = await itemService.getAllItems();
        res.status(HTTP_STATUS.OK).json(
            successResponse(items, "Items retrieved successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves a single item by ID
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const getItemById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const item: Item = await itemService.getItemById(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(item, "Item retrieved successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Creates a new item
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const createItem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Extract validated data from request body
        const { name, description, price } = req.body;
        const itemData = { name, description, price };

        const newItem: Item = await itemService.createItem(itemData);
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newItem, "Item created successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Updates an existing item
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const updateItem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;

        // Create update data object with only the fields that can be updated
        const updateData = { name, description, price };

        const updatedItem: Item = await itemService.updateItem(id, updateData);
        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedItem, "Item updated successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Deletes an item
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const deleteItem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        await itemService.deleteItem(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(null, "Item deleted successfully")
        );
    } catch (error) {
        next(error);
    }
};