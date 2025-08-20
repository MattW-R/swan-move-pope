import { describe, it, expect } from "vitest";
import { calculateAverageRentByRegion, calculateMonthlyRentPerTenant } from "./rent";
import type { Property } from "../schemas";

describe("rent helpers", () => {
	describe("calculateAverageRentByRegion", () => {
		it("calculates average rent for region", () => {
			const properties = [
				{ region: "ENGLAND", monthlyRentPence: 10 },
				{ region: "ENGLAND", monthlyRentPence: 20 },
				{ region: "ENGLAND", monthlyRentPence: 40 },
				{ region: "ENGLAND", monthlyRentPence: 50 },
			] as Property[];

			expect(calculateAverageRentByRegion(properties, "ENGLAND")).toBe(30);
		});

		it("does not throw for regions with properties", () => {
			const properties = [
				{ region: "N.IRELAND", monthlyRentPence: 10 },
				{ region: "WALES", monthlyRentPence: 20 },
			] as Property[];

			expect(() => calculateAverageRentByRegion(properties, "N.IRELAND")).not.toThrow();
			expect(() => calculateAverageRentByRegion(properties, "WALES")).not.toThrow();
		});

		it("does throws error for regions without properties", () => {
			const properties = [
				{ region: "N.IRELAND", monthlyRentPence: 10 },
				{ region: "WALES", monthlyRentPence: 20 },
			] as Property[];

			expect(() => calculateAverageRentByRegion(properties, "ENGLAND")).toThrowError("No properties found for region ENGLAND");
		});
	})

	describe("calculateMonthlyRentPerTenant", () => {
		it("calculates monthly rent per tenant in pence", () => {
			const property = { monthlyRentPence: 1000, capacity: 4 } as Property;
			expect(calculateMonthlyRentPerTenant(property, 2, 'pence')).toBe(500);
		});

		it("calculates monthly rent per tenant in pounds", () => {
			const property = { monthlyRentPence: 1000, capacity: 4 } as Property;
			expect(calculateMonthlyRentPerTenant(property, 2, 'pounds')).toBe(5);
		});

		it("throws error if number of tenants is zero or less", () => {
			const property = { monthlyRentPence: 1000, capacity: 4 } as Property;
			expect(() => calculateMonthlyRentPerTenant(property, 0, 'pounds')).toThrowError("Number of tenants must be greater than zero");
		});

		it("throws error if number of tenants exceeds property capacity", () => {
			const property = { monthlyRentPence: 1000, capacity: 4 } as Property;
			expect(() => calculateMonthlyRentPerTenant(property, 5, 'pounds')).toThrowError("Number of tenants exceeds property capacity");
		});
	});
});
