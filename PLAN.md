# Plan

## Decisions

- [X] Select tools for doing the tech task - Will use cursor to simulate working pattern discussed at interview
- [X] Select tools for parsing data from CSVs - Will use zod for easy TS-native schema parsing with csv-parser for csv parsing
- [X] Select method for storage of data within application - Will just store in node memory as arrays because there is not much data & it will be faster
- [X] Select a unit test framework for testing all functions to follow requirements matching guidelines - Will use vitest as is a modern maintained framework designed with TS in-mind
- [X] Select a method to validate UK postcodes - For simplicity will use [regex from the postcode npm package](https://github.com/ideal-postcodes/postcode/blob/master/lib/index.ts)

## Implementation

- [X] Initialise node-TS project with src/ directory
    - Also added .gitignore
- [X] Add input data to project
- [X] Create schemas for input (csv) data
- [X] Create helper, with tests, to parse & store in-memory csv data
- [X] Create helper, with tests, to calculate average rent of properties by region (matching requirements criteria)
- [X] Create helper, with tests, to calculate monthly rent, per tenant for a given property (matching requirements criteria)
- [ ] Create helper, with tests, to validate the postcode of all properties, per tenant for a given property (matching requirements criteria)
- [ ] Create helper, with tests, to get the 'status' of a property, per tenant for a given property (matching requirements criteria)
- [ ] Dockerise node setup for portability
- [ ] Install formatter & run over project
- [ ] Add project README
