import { loadData, properties, tenants } from "./data";
import { expect, describe, it, beforeAll } from 'vitest'

describe("data", () => {
    beforeAll(async () => {
        await loadData();
    });

    it("should load properties that match the schema", async () => {
        expect(properties).toBeDefined();
        expect(properties).not.toHaveLength(0);
        expect(properties).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(String),
                address: expect.any(String),
                postcode: expect.any(String),
                monthlyRentPence: expect.any(Number),
                region: expect.any(String),
                capacity: expect.any(Number),
                tenancyEndDate: expect.any(Date),
            })
        ]))
    });

    it("should load tenants that match the schema", async () => {
        expect(tenants).toBeDefined();
        expect(tenants).not.toHaveLength(0);
        expect(tenants).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(String),
                propertyId: expect.any(String),
                name: expect.any(String),
            })
        ]))
    });
});
