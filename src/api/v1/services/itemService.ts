import { Item } from "../models/itemModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION = "items";

/**
 * Retrieves all items from Firestore
 * @returns Array of all items
 */
export const getAllItems = async (): Promise<Item[]> => {
    try {
        const snapshot = await getDocuments(COLLECTION);
        const items: Item[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date(),
                updatedAt: data.updatedAt?.toDate() || new Date(),
            } as Item;
        });
        return items;
    } catch (error) {
        throw error;
    }
};

/**
 * Creates a new item in Firestore
 * @param itemData - The data for the new item
 * @returns The created item with generated ID
 */
export const createItem = async (itemData: {
    name: string;
    description: string;
    price?: number;
}): Promise<Item> => {
    try {
        const now = new Date();
        const newItemData = {
            ...itemData,
            createdAt: now,
            updatedAt: now,
        };

        const id = await createDocument<Item>(COLLECTION, newItemData);
        return { id, ...newItemData } as Item;
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves a single item by ID from Firestore
 * @param id - The ID of the item to retrieve
 * @returns The item if found
 * @throws Error if item not found
 */
export const getItemById = async (id: string): Promise<Item> => {
    try {
        const doc = await getDocumentById(COLLECTION, id);
        if (!doc) {
            throw new Error(`Item with ID ${id} not found`);
        }

        const data = doc.data();
        const item: Item = {
            id: doc.id,
            ...data,
            createdAt: data?.createdAt?.toDate() || new Date(),
            updatedAt: data?.updatedAt?.toDate() || new Date(),
        } as Item;

        return item;
    } catch (error) {
        throw error;
    }
};

/**
 * Updates an existing item in Firestore
 * @param id - The ID of the item to update
 * @param itemData - The fields to update
 * @returns The updated item
 * @throws Error if item not found
 */
export const updateItem = async (
    id: string,
    itemData: Pick<Item, "name" | "description" | "price">
): Promise<Item> => {
    try {
        const updateData = {
            ...itemData,
            updatedAt: new Date(),
        };

        await updateDocument<Item>(COLLECTION, id, updateData);

        // Return the updated item
        const updatedItem = await getItemById(id);
        return updatedItem;
    } catch (error) {
        throw error;
    }
};

/**
 * Deletes an item from Firestore
 * @param id - The ID of the item to delete
 * @throws Error if item not found
 */
export const deleteItem = async (id: string): Promise<void> => {
    try {
        // Check if item exists before deleting
        const doc = await getDocumentById(COLLECTION, id);
        if (!doc) {
            throw new Error(`Item with ID ${id} not found`);
        }

        await deleteDocument(COLLECTION, id);
    } catch (error) {
        throw error;
    }
};
