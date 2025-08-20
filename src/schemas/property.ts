import { z } from "zod";

export const RegionSchema = z.enum(
	["ENGLAND", "SCOTLAND", "WALES", "N.IRELAND"],
	{
		invalid_type_error:
			"Region must be one of ENGLAND, SCOTLAND, WALES, N.IRELAND",
	},
);

export type Region = z.infer<typeof RegionSchema>;

export const PropertySchema = z
	.object({
		id: z.string().min(1, "id is required"),
		address: z.string().min(1, "address is required"),
		postcode: z.string().min(1, "postcode is required"),
		monthlyRentPence: z
			.union([z.string(), z.number()])
			.transform((value) =>
				typeof value === "string" ? parseInt(value, 10) : value,
			)
			.pipe(
				z
					.number({ invalid_type_error: "monthlyRentPence must be a number" })
					.int("monthlyRentPence must be an integer")
					.nonnegative("monthlyRentPence must be >= 0"),
			),
		region: RegionSchema,
		capacity: z
			.union([z.string(), z.number()])
			.transform((value) =>
				typeof value === "string" ? parseInt(value, 10) : value,
			)
			.pipe(
				z
					.number({ invalid_type_error: "capacity must be a number" })
					.int("capacity must be an integer")
					.nonnegative("capacity must be >= 0"),
			),
		tenancyEndDate: z
			.union([z.string().min(1, "tenancyEndDate is required"), z.date()])
			.transform((value) =>
				typeof value === "string" ? new Date(value) : value,
			)
			.pipe(
				z
					.date({ invalid_type_error: "tenancyEndDate must be a date" })
					.refine(
						(d) => !Number.isNaN(d.getTime()),
						"tenancyEndDate must be a valid date",
					),
			),
	})
	.strict();

export type Property = z.infer<typeof PropertySchema>;
