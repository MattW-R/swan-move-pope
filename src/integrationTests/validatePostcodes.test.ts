import { describe, beforeAll, test, expect } from "vitest";
import { loadData, properties } from "../helpers/data";
import { validatePropertiesPostcodes } from "../helpers/postcode";

describe("validate postcodes integration tests", () => {
	beforeAll(async () => {
		await loadData();
	});

	test("should calculate average rent by region", () => {
		const { propertiesWithValidPostcodes, propertiesWithInvalidPostcodes } =
			validatePropertiesPostcodes(properties);

		expect(propertiesWithValidPostcodes.length).toBeGreaterThan(0);
		expect(propertiesWithInvalidPostcodes.length).toBeGreaterThan(0);
	});
});
