import { describe, expect, it } from "vitest";
import { getPropertyStatus } from "./property";
import type { Property, Tenant } from "../schemas";

describe("property helpers", () => {
	describe("getPropertyStatus", () => {
		it("should return PROPERTY_VACANT if no tenants", () => {
			const property = { capacity: 4 } as Property;
			const allTenants = [{ propertyId: "1" }, { propertyId: "2" }] as Tenant[];

			expect(getPropertyStatus(property, allTenants)).toBe("PROPERTY_VACANT");
		});

		it("should return PARTIALLY_VACANT if some tenants but not full capacity", () => {
			const property = { id: "1", capacity: 2 } as Property;
			const allTenants = [{ propertyId: "1" }, { propertyId: "2" }] as Tenant[];

			expect(getPropertyStatus(property, allTenants)).toBe("PARTIALLY_VACANT");
		});

		it("should return PROPERTY_ACTIVE if all tenants and tenancy is active", () => {
			const property = {
				id: "1",
				capacity: 2,
				tenancyEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
			} as Property;
			const allTenants = [{ propertyId: "1" }, { propertyId: "1" }] as Tenant[];

			expect(getPropertyStatus(property, allTenants)).toBe("PROPERTY_ACTIVE");
		});

		it("should return PROPERTY_OVERDUE if tenancy end date is in the past", () => {
			const property = {
				id: "1",
				capacity: 2,
				tenancyEndDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
			} as Property;
			const allTenants = [{ propertyId: "1" }, { propertyId: "1" }] as Tenant[];

			expect(getPropertyStatus(property, allTenants)).toBe("PROPERTY_OVERDUE");
		});

		it("should return PROPERTY_OVERDUE if tenancy end date is in the past, even if partually vacant", () => {
			const property = {
				id: "1",
				capacity: 2,
				tenancyEndDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
			} as Property;
			const allTenants = [{ propertyId: "1" }, { propertyId: "2" }] as Tenant[];

			expect(getPropertyStatus(property, allTenants)).toBe("PROPERTY_OVERDUE");
		});
	});
});
