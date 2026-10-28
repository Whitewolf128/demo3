import * as itemService from "../src/api/v1/services/itemService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";

// Mock the repository module
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Item Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create an item successfully", async () => {
        // Arrange
        const mockItemData = {
            name: "Test Item",
            description: "Test Description",
        };
        const mockDocumentId = "test-item-id";

        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
            mockDocumentId as never
        );

        // Act
        const result = await itemService.createItem(mockItemData);

        // Assert
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "items",
            expect.objectContaining({
                name: mockItemData.name,
                description: mockItemData.description,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            })
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.name).toBe(mockItemData.name);
    });
});