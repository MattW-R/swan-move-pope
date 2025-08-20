import { describe, beforeAll, test, expect } from "vitest";
import { loadData, properties } from "../helpers/data";
import { RegionSchema } from "../schemas";
import { calculateAverageRentByRegion } from "../helpers/rent";

describe("property average rents integration tests", () => {
    beforeAll(async () => {
        await loadData();
    });

    test("should calculate average rent by region", () => {
        for (const region of RegionSchema.options) {
            const averageRent = calculateAverageRentByRegion(properties, region);

            expect(averageRent).toBeDefined();
            expect(averageRent).toBeGreaterThan(0);
        }
    });
});
