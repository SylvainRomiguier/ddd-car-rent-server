# DDD - Clean architecture - Car Rent example

> **WORK IN PROGRESS (for now you can try Console or GraphQL on Model for demo purpose)**

## Domain Driven Design

### Value Objects, Entities, Aggregate root

You will find the value objects, entities and aggregates in domain directory :

- **Booking** is an aggregate root which contains entities _Customer_, _Vehicle_;
- **Customer** is an entity with a life cycle, at first it could be a simple _Prospect (with an ip address)_ to look for a vehicule to book.
  If the _Customer_ is a _Prospect_ and wants to effectively book the _Vehicule_, he then becomes a _Professional Customer (with a siret)_ or an _Individual Customer (with an id)_;
- **Vehicle** is an entity with a registration id and has a _Model_;
- **Model** is a tuple of _name_ and _brand_.

### Use Cases

The application directory contains all the use Cases implementations :

- **createModel**, **updateModel**, **removeModel**, **getAllModels**;
- **createCustomer**, **updateCustomer**;
- **createVehicle**, **updateVehicle**;
- **checkVehicleAvailability**, **bookVehicle**, **unbookVehicle**.

For now the Model cycle is fully described, the others are in progress.

## Clean Architecture

### entities - layer 0 : depend on nothing but other entities from same layer -

See DDD above.

### Use Cases and Interfaces for Use Cases : Input Port, Output Port, Repository - layer 1 : depend only on layer 0 objects and eventually objects from same layer -

The application directory contains interfaces for Use Cases Input Ports (Use Cases interfaces to implement) and Output Ports (Presenters interfaces to implement).
The repository interfaces are also present in each entity directory under _application/interfaces_.

> **These interfaces are useful as no Use Case depends on outside implementations, just on interfaces.**
> For Use Cases implementations see DDD above.

### Presenters implementations - layer 2 : depend on Entities and implements Use Cases Output Ports -

You will find the Output Ports Interfaces implementations in the Presenters directory.

### the Infrastructure layer - layer 3 -

- Data Providers - IRepository implementations -, for now In Memory repositories for demo purpose - could be MongoDB, PostGreSQL, other API, etc. -;
- Controllers - to demonstrate purpose and benefits of this architecture you will have a Console controller and a GraphQL controller -.

## Install and run

After having downloaded the project, launch `yarn install`.

### Console

`yarn run console` : follow the console displayed menu.

### GraphQL

`yarn run graphql` : open a browser on [graphQL server](http://localhost:4000) to access playground.

## Conclusion

As you can see the business logic is completely isolated from **Console app** or **GraphQL server**.
If you want to **add new repositories implementations** - such as MongoDB, PostGreSQL, MariaDB, other API, etc. - **or new controllers** - Express, Fastify REST API, etc. -, this could be done **only in the Infrastructure Layer** without changing anything in the Business Logic Layers (Entities/Domain and Use Cases/Application).

If you want to **add new Presenters**, for example in XML or any format you need, create them without changing anything in Business Logic Layers. You will just have to **inject them in your controller**.
