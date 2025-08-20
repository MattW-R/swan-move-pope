import type { Property, Region } from "../schemas";

export const calculateAverageRentByRegion = (properties: Property[], region: Region): number => {
	const propertiesInRegion = properties.filter((property) => property.region === region);
	if (propertiesInRegion.length === 0) {
		throw new Error(`No properties found for region ${region}`);
	}
	const totalRentPence = propertiesInRegion.reduce((total, property) => total + property.monthlyRentPence, 0);
	return totalRentPence / propertiesInRegion.length;
};
