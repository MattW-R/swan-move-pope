import { describe, expect, it } from "vitest";
import type { Property } from "../schemas";
import { validatePropertiesPostcodes } from "./postcode";

describe("postcode helpers", () => {
    describe("validatePropertiesPostcodes", () => {
        it("validates postcodes correctly", () => {
            const properties = [
                { postcode: "SW1A 1AA" },
                { postcode: "INVALID"},
            ] as Property[];

            const { propertiesWithValidPostcodes, propertiesWithInvalidPostcodes } = validatePropertiesPostcodes(properties);

            expect(propertiesWithValidPostcodes).toHaveLength(1);
            expect(propertiesWithValidPostcodes[0]?.postcode).toBe("SW1A 1AA");

            expect(propertiesWithInvalidPostcodes).toHaveLength(1);
            expect(propertiesWithInvalidPostcodes[0]?.postcode).toBe("INVALID");
        });

        it("handles empty properties array", () => {
            const properties: Property[] = [];
            
            const { propertiesWithValidPostcodes, propertiesWithInvalidPostcodes } = validatePropertiesPostcodes(properties);

            expect(propertiesWithValidPostcodes).toHaveLength(0);
            expect(propertiesWithInvalidPostcodes).toHaveLength(0);
        });
    });
});
