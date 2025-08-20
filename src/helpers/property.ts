import type { Property, Tenant } from "../schemas";
import type { PropertyStatus } from "../types/PropertyStatus";

export const getPropertyStatus = (
	property: Property,
	allTenants: Tenant[],
): PropertyStatus => {
	const tenantsInProperty = allTenants.filter(
		(tenant) => tenant.propertyId === property.id,
	);

	if (tenantsInProperty.length === 0) {
		return "PROPERTY_VACANT";
	}

	if (property.tenancyEndDate < new Date()) {
		return "PROPERTY_OVERDUE";
	}

	if (tenantsInProperty.length < property.capacity) {
		return "PARTIALLY_VACANT";
	}

	return "PROPERTY_ACTIVE";
};
