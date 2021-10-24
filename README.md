# Next MobX Example

This project acts as an example for a project using NextJS, with MobX as the store

## Services

Services are integrations with any third party services or APIs

## Stores

Stores are the source of truth for data for data consumption. These should remain in the entity format

## View Models

View models are responsible for converting store data into a presentation format, with some examples of responsibilities being

- Flattening of data structures
- Handling optionals from a null format to a human readable format
- Conversion of data when there are many presentation formats for a single data structure

# Components

### Atomic Design

- Atoms
  - Atoms cannot contain other atoms
- Molecules
  - Molecules can contain other molecules
- Organisms
  - Organisms cannot contain other organisms
  - Organisms are only covered in page level tests
  - Organisms must not be aware of APIs and Services
  - Organisms can consume store data
  - Organisms must not imperatively fetch data
- Pages
  - Pages facilitate inter-organism communication
  - Pages can be aware of APIs and Services to fetch data
