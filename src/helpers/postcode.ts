import type { Property } from "../schemas";

const postcodeRegex = /^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i;

export const validatePropertiesPostcodes = (properties: Property[]) => {
	const propertiesWithValidPostcodes = [];
	const propertiesWithInvalidPostcodes = [];

	for (const property of properties) {
		const isValidPostcode = postcodeRegex.test(property.postcode);

		if (isValidPostcode) {
			propertiesWithValidPostcodes.push(property);
		} else {
			propertiesWithInvalidPostcodes.push(property);
		}
	}

	return {
		propertiesWithValidPostcodes,
		propertiesWithInvalidPostcodes,
	};
};
