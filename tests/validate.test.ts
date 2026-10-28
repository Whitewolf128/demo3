import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleware/validate";
import { itemSchemas } from "../src/api/v1/validations/itemValidation";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";

describe("Validation Middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            body: {},
            params: {},
            query: {},
        };
        mockRes = {
            status: jest.fn<(code: number) => Response>().mockReturnValue(mockRes as Response),
            json: jest.fn<(body?: any) => Response>().mockReturnValue(mockRes as Response),
        };
        mockNext = jest.fn();
    });

    it("should pass validation for valid item data", () => {
        // Arrange
        mockReq.body = {
            name: "Valid Item",
            description: "Valid description",
        };
        const middleware = validateRequest(itemSchemas.create);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });

    it("should reject item data when the name is missing", () => {
        mockReq.body = { description: "Valid description" };
        const middleware = validateRequest(itemSchemas.create);

        middleware(mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        expect(mockNext).not.toHaveBeenCalled();
    });
});