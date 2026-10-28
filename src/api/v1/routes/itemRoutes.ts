import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { itemSchemas } from "../validations/itemValidation";
import * as itemController from "../controllers/itemController";
import { MiddlewareFunction } from "../types/express";

const router: Router = express.Router();

router.get("/", itemController.getAllItems);
router.post(
    "/",
    validateRequest(itemSchemas.create),
    itemController.createItem
);
router.get(
    "/:id",
    validateRequest(itemSchemas.getById),
    itemController.getItemById
);
router.put("/:id", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);

export default router;