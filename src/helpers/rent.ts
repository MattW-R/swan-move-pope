import type { Property, Region } from "../schemas";

export const calculateAverageRentByRegion = (
	properties: Property[],
	region: Region,
): number => {
	const propertiesInRegion = properties.filter(
		(property) => property.region === region,
	);
	if (propertiesInRegion.length === 0) {
		throw new Error(`No properties found for region ${region}`);
	}
	const totalRentPence = propertiesInRegion.reduce(
		(total, property) => total + property.monthlyRentPence,
		0,
	);
	return totalRentPence / propertiesInRegion.length;
};

export const calculateMonthlyRentPerTenant = (
	property: Property,
	numberOfTenants: number,
	outputUnits: "pounds" | "pence",
): number => {
	if (numberOfTenants <= 0) {
		throw new Error("Number of tenants must be greater than zero");
	}

	if (numberOfTenants > property.capacity) {
		throw new Error("Number of tenants exceeds property capacity");
	}

	const monthlyRentPence = property.monthlyRentPence / numberOfTenants;
	if (outputUnits === "pounds") {
		return monthlyRentPence / 100; // Convert pence to pounds
	}
	return monthlyRentPence; // Return in pence
};
