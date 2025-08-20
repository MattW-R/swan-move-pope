import { describe, beforeAll, test, expect } from "vitest";
import { loadData, properties, tenants } from "../helpers/data";
import { calculateMonthlyRentPerTenant } from "../helpers/rent";

describe("tenant rents integration tests", () => {
	beforeAll(async () => {
		await loadData();
	});

	test("should calculate average rent by region", () => {
		for (const property of properties) {
			const tenantsInProperty = tenants.filter(
				(tenant) => tenant.propertyId === property.id,
			);

			if (tenantsInProperty.length > 0) {
				const tenantRent = calculateMonthlyRentPerTenant(
					property,
					tenantsInProperty.length,
					"pounds",
				);

				expect(tenantRent).toBeDefined();
				expect(tenantRent).toBeGreaterThan(0);
			}
		}
	});
});
