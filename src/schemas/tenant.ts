import { z } from "zod";

export const TenantSchema = z
	.object({
		id: z.string().min(1, "id is required"),
		propertyId: z.string().min(1, "propertyId is required"),
		name: z.string().min(1, "name is required"),
	})
	.strict();

export type Tenant = z.infer<typeof TenantSchema>;
