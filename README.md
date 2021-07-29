---
title: "Beckn"
metaTitle: "Beckn for Developers"
metaDescription: "Documentation for developers of the Beckn ecosystem"
---

## Release History

| Domain                | Version   |    Release Date       |
|-----------------------|-----------|-----------------------|
| [Final Mile Delivery](https://github.com/beckn/protocol-specifications/tree/fd154368c4670218ce6ad0fc8ee4ada5c401b485/final-mile-delivery/v0)   |  0.8.3  |    10 October, 2020      |
| [Final Mile Delivery](https://github.com/beckn/protocol-specifications/tree/ba54b53aa341d6d0bc0f65633b0a33ff75b628ab/final-mile-delivery/v0)   |  0.8.2  |    21 August, 2020      |
| [Final Mile Delivery](https://github.com/beckn/protocol-specifications/tree/029496c7e969fc322f654e19ee4ae7299c25fdb5/final-mile-delivery/v0)   |  0.8.1  |    19 August, 2020      | 
| [Final Mile Delivery](https://github.com/beckn/protocol-specifications/tree/83006c82ae1f7069f6b609211245e651d21d90ab/final-mile-delivery/v0)   |  0.8.0    |    10 August, 2020      |
| [Core](https://github.com/beckn/protocol-specifications/tree/83006c82ae1f7069f6b609211245e651d21d90ab/final-mile-delivery/v0)   |  0.8.2    |    10 August, 2020      |
| [Final Mile Delivery](https://github.com/beckn/protocol-specifications/tree/83006c82ae1f7069f6b609211245e651d21d90ab/final-mile-delivery/archives/schema/0.7.0)   |  0.7.0    |    06 July, 2020      |
| [Mobility](https://github.com/beckn/protocol-specifications/tree/master/mobility/schema/0.8.0)   |  0.8.0    |    02 July, 2020      |
| Final Mile Delivery   |  0.6.0 (depr)   |    02 June, 2020      |
| [Food and Beverage](https://github.com/beckn/protocol-specifications/tree/master/food-and-beverage/schema/0.4.0)     |  0.4.0    |    02 June, 2020      |
| Final Mile Delivery   |  0.5.1 (depr)    |    21 May, 2020       |
| [Core](https://github.com/beckn/protocol-specifications/tree/master/core/schema/0.8.0)                  |  0.8.0    |    21 May, 2020       |
| [Healthcare](https://developers.beckn.org/Healthcare)            |  0.5.0    |    02 May, 2020       |
| Food and Beverage     |  0.3.1 (depr)    |    22 April, 2020     |
| [Core](https://github.com/beckn/protocol-specifications/tree/master/core/schema/0.7.1)                  |  0.7.1    |    17 April, 2020     |
| [Mobility](https://github.com/beckn/protocol-specifications/tree/master/mobility/schema/0.7.1)              |  0.7.1    |    09 December, 2019  |
| Mobility              |  0.5.3 (depr)   |    30 October, 2019   |

### Recent Updates

- Repository structure changes
	- Added major version ( v0 ) folder in core, mobility, final-mile-delivery, food-and-beverage and healthcare
	- Added sub-folders schema and api which contain the schema and api of version 0.x.y
	- v0 folder will remain until v1 is released which will result in a new v1 folder
	- Created *archives* folder containing older 0.x versions which will be deprecated after release of v1.x
- Added release tags
- Updates to $refs
	- For Non Release Versions
		- All complex core schemas having references ($ref) to other core schemas will point to latest version of master branch
		- All complex domain schemas having references to other domain and/or core schemas will point to latest version of master branch
		- All (core and domain) schemas which have references ($ref) to themselves in a recursive fashion should point to latest version of master branch
	- For Release Versions
		- All core schemas having references ($ref) to other core schemas will point to the commit id of latest stable version of core
		- All domain schemas having references ($ref) to core schemas will point to the commit id of latest stable version of core
		- All domain schemas having references ($ref) to other (same or cross-) domain  schemas will point to the latest stable release version of the referred domain 
		- No release version of core or domain will have $refs without commit ids
		- All domain schema having references ($ref) to core schemas must point to a stable core release version commit that is the same or earlier than the current version of domain
		- Any changes to the core schema references in any domain schema must result in a new release version of that domain schema
		- All complex domain schemas having references to other domain and/or core schemas will point to latest version of master branch
		- All domain schemas in a release version having references to core schemas  pointing to the same release version commit of core
		- All (core and domain) schemas which have references ($ref) to themselves in a recursive fashion should point to latest stable release version commit of master branch


## Introduction

**Beckn** is an open protocol that allows local businesses across any industry to be discovered and engaged by any beckn-enabled application. Beckn protocol helps businesses co-create solutions for the masses seamlessly, by combining services of any form or provider.

**Beckn protocol** is a collection of open specifications consisting of protocol APIs, message formats, network design and reference architectures to allow any two entities to execute commercial transactions without being on the same platform.

This server-to-server communication protocol allows any consumer facing online platform to discover and transact with any business with minimal implementation overhead. The server-to-server nature of the protocol allows rich user experiences to be built by bundling services from multiple independent platforms.

Beckn protocol decouples the demand side digital infrastructure in the form of apps and other channels from the supply side service provisioning infrastructure. It does this by making integratedservices available not just on a single platform but potentially on any online consumer interface, (online maps, messaging, wallets, voice assistant apps and devices) that have mainstream adoption in a city.

Beckn is a protocol, not a platform. It adopts a decentralized architecture that obviates the need for creating a centralised platform in order to integrate services from multiple providers simultaneously ensuring privacy and security by design by enabling secure, encrypted iteractions.

Before we discuss beckn protocol specification, let us take a look at the actors in Beckn.

## Actors in Beckn
### Beckn Application Platform (BAP)
#### What is a Beckn Application Platform?

Beckn Application Platforms are businesses who intend to offer integrated services to the consumer via a application. BAPs do not manage any inventory of businesses or services but are merely experience providers. The goal of BAPs is to onboard users on their application and generate transactions. Possible examples of BAP User Interfaces are,

1. Consumer Facing Mobile apps
2. Consumer Facing Desktop application providers
3. Consumer Facing Browser apps
4. Consumer Facing Voice assistants,
5. Consumer Facing Wearable devices,
6. Consumer Facing NLP applications,
7. Consumer Facing Chat-bots

#### What components does a BAP include ?
A Beckn Application Platform includes,

1. An API to interface with the Beckn Gateway as part of the application cloud. This API will henceforth be referred to as the **Beckn Application Platform API**.
2. The consumer user interface
3. The application cloud

A BAP could be illustrated as below.

![](/Images/BecknApp.png)

#### Who can set up a BAP ?
Any organization which intends to offer rich integrated services to consumers. 

### Beckn Gateway (BG)
#### What is a Beckn Gateway ?

A Beckn Gateway (BG) refers to an infrastructure which offers the following functionalities.

1. Encrypted Request routing from Beckn Application Platformlication Platforms to Beckn Providers and vice versa.
2. Proxy signature validation

#### What components does a BG include ?

A BG includes,

1. A cloud infrastructure with services to implement the above functionalities
2. An API to accept requests from BAPs. This API will henceforth be known as the **Beckn Gateway-App API**.
4. It can also optionally collect  payments from the BAP users, and settle with Beckn Providers through a clearing process

A Beckn Gateway could be illustrated as below.

![](/Images/BecknGateway.png)

#### Who can setup the Beckn Gateway ?

Any organization with infrastructure to provide the above functionalities preferably organizations who own infrastructure with high compute capability. This organization could be a regulated entity registered with the city authorities.

#### How to implement the Beckn Gateway APIs ?

The Beckn Gateway APIs can be implemented using the specifications defined [here](/Core/API).

### Beckn Provider (BPP)
#### What is a Beckn Provider ?
A Beckn Provider is an organization that owns or operates or manages one or more  businesses, delivering services such as mobility, food & grocery delivery, healthcare to consumers


#### What components does a Beckn Provider include ?
A Beckn Provider includes,

1. An API to accept requests from BGs as part of the application cloud. This API will henceforth be referred to as the Beckn Provider API.
2. An application cloud to store inventory data
3. An user interface for service personnel. This is optional and may not be required for all cases. For example, a bike rental might not require a user interface whereas a cab service may require a Driver app.

A Beckn Provider could be illustrated as below.

![](/Images/BecknProvider.png)

#### Who can become a Beckn Provider ?
Any organization who owns, operates or manages , capacity-limited and time-limited inventory of services can become a Beckn Provider. They may require to be registered with the city authorities and are regulated by them. Possible examples of BPPs are,

1. Mass transit companies like metro services, bus services, ride hailing services
2. Restaurants
3. Final-mile delivery services for food & grocery

#### How to implement the Beckn Provider API ?
The Beckn Provider API can be implemented using the specifications defined [here](/Core/API).

## Beckn Ecosystem Architecture

To activate Beckn protocol, the beckn ecosystem must be organized according to the architecture specifications as listed below. The architecture of a Beckn ecosystem is illustrated below,

![](/Images/PublicDigitalInfrastructure.png)

In addition to the APIs mentioned above, Beckn protocol allows city authorities to implement a Policy API for applying smart dynamic policies across the ecosystem if needed. The city authorities can also implement a Registration API for registering Beckn ecosystem participants (BPPs, and/or BGs and/or BAs) if needed.

## Communication Protocol

All messages between BAs and BPPs will be routed through the BG. All request messages will be non-blocking and will be immediately acknowledged with an “ACK” or a “NACK” message in the same session.

The response message will be in the form of a callback. Each callback should also be immediately responded to with an “ACK” or a “NACK” message in the same callback session.

All messages exchanged will be serialised in JSON.

Depending on the nature of the message, the BG may broadcast the message coming from the BAP to all the BPPs or one specific BPP.

Exception: Real time vehicle tracking data will not be routed through the Beckn Gateway. As vehicle tracking involves continuous streams of data via an open socket, it will not be routed through the BG. The same exception applies to any real-time communication between the BPPP and the BAP like chat or cloud calling. In these cases, only the real-time data source information will be transmitted through the BG. For example, in the case of vehicle tracking, only the tracking URL will be transmitted via the BG and not the tracking data itself. More information on this will be discussed in upcoming sections.

The communication protocol can be visualized using the sequence diagram shown below.

**Example : Search request from a BAP to BPPP**

![](/Images/ExampleDataFlow-Search.png)

Taking an example from the  mobility domain, the following events occur,

1. The BAP requests BG to return journeys matching a specific intent using the *Journey/search* message. BG responds immediately with an ACK message.
2. BG broadcasts the *Trip/search* message to all the relevant BPPs. All BPPs respond immediately with the *ACK* messages.
3. BPPs will return relevant Trips to BG using a *Trip/cb_search* callback message. BG immediately responds to BPPs with the *ACK* message
4. BG performs Journey optimization  the Trips and returns the Journeys to the BAP using the *Journey/cb_search* message. BAP immediately responds with *ACK*.

