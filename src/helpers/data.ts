import csv from 'csv-parser';
import fs from 'node:fs';
import { TenantSchema, type Property, type Tenant, PropertySchema } from '../schemas';
import { z, type ZodTypeAny } from 'zod';

const importCSVToObjects = async (filePath: string): Promise<unknown[]> => {
    return new Promise((resolve, reject) => {
        const results: unknown[] = [];

        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error))
    })
}

const parseObjectsWithSchema = <S extends ZodTypeAny>(objects: unknown[], schema: S): z.infer<S>[] => {
    return objects.map((object) => schema.parse(object))
}

export let properties: Property[] = []
export let tenants: Tenant[] = []

export const loadData = async () => {
    properties = parseObjectsWithSchema(await importCSVToObjects('src/data/properties-september-2024.csv'), PropertySchema)
    tenants = parseObjectsWithSchema(await importCSVToObjects('src/data/tenants-september-2024.csv'), TenantSchema)
}
