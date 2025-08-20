import { describe, it, expect } from "vitest";
import { calculateAverageRentByRegion } from "./rent";
import type { Property } from "../schemas";

describe("rent helper", () => {
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
});
