import { describe, beforeAll, test, expect } from "vitest";
import { loadData, properties, tenants } from "../helpers/data";
import { getPropertyStatus } from "../helpers/property";

describe("get property statuses integration tests", () => {
    beforeAll(async () => {
        await loadData();
    });

    test("should calculate average rent by region", () => {
        for (const property of properties) {
            const propertyStatus = getPropertyStatus(property, tenants);

            expect(propertyStatus).toBeDefined();
            expect(["PROPERTY_VACANT", "PARTIALLY_VACANT", "PROPERTY_ACTIVE", "PROPERTY_OVERDUE"]).toContain(propertyStatus);
        }
    });
});
