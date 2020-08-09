---
title: "Beckn"
metaTitle: "Beckn for Developers"
metaDescription: "Documentation for developers of the Beckn ecosystem"
---

## Release History

| Domain                | Version   |    Release Date       |
|-----------------------|-----------|-----------------------|
| [Final Mile Delivery](https://developers.beckn.org/FinalMileDelivery)   |  0.7.0    |    06 July, 2020      |
| [Mobility](https://github.com/beckn/protocol-specifications/tree/master/mobility/schema/0.8.0)   |  0.8.0    |    02 July, 2020      |
| [Final Mile Delivery](https://github.com/beckn/protocol-specifications/commits/master/final-mile-delivery/schema/0.6.0)   |  0.6.0    |    02 June, 2020      |
| [Food and Beverage](https://github.com/beckn/protocol-specifications/tree/master/food-and-beverage/schema/0.4.0)     |  0.4.0    |    02 June, 2020      |
| [Final Mile Delivery](https://github.com/beckn/protocol-specifications/tree/master/final-mile-delivery/schema/0.5.1)   |  0.5.1    |    21 May, 2020       |
| [Core](https://github.com/beckn/protocol-specifications/tree/master/core/schema/0.8.0)                  |  0.8.0    |    21 May, 2020       |
| [Healthcare](https://developers.beckn.org/Healthcare)            |  0.5.0    |    02 May, 2020       |
| Food and Beverage     |  0.3.1 (depr)    |    22 April, 2020     |
| [Core](https://github.com/beckn/protocol-specifications/tree/master/core/schema/0.7.1)                  |  0.7.1    |    17 April, 2020     |
| [Mobility](https://github.com/beckn/protocol-specifications/tree/master/mobility/schema/0.7.1)              |  0.7.1    |    09 December, 2019  |
| Mobility              |  0.5.3 (depr)   |    30 October, 2019   |

## Introduction

**Beckn** is an open protocol that allows location-aware, local commerce across industries to be discovered and engaged by any Beckn enabled application. Beckn Protocol helps businesses co-create solutions for the masses seamlessly, by combining services of any form or provider.

**Beckn Protocol** is a collection of open specifications consisting of protocol APIs, message formats, network design and reference algorithms to allow multiple commercial service provider entities to bring their services together to offer one seamless integrated experience to their customers. The interoperability protocol essentially allows two entities in an integrated ecosystem to communicate with each other through structured flows and role definitions.

The server-to-server communication protocol allows any consumer facing online platform to discover and transact with location-aware remote services with minimal implementation overhead. A single message packet generated at run-time, hence, could contain services from multiple providers.

Beckn Protocol decouples the demand side digital infrastructure in the form of apps and other channels from the supply side service provisioning infrastructure. It does this by making integrated location-aware services available not just on a single platform but potentially on any online consumer interface, (online maps, messaging, wallets, voice assistant apps and devices) that have mainstream adoption in a city.

Beckn is a protocol, not a platform. It adopts a decentralized architecture that obviates the need for creating a centralised platform in order to integrate services from multiple providers simultaneously ensuring privacy and security by design by enabling secure, privacy protected iteractions.

Before we discuss the Beckn Protocol specifications, let us take a look at the actors in Beckn.

## Actors in Beckn
### Beckn App (BA)
#### What is a Beckn App ?

Beckn Apps are software application providers who intend to offer integrated services to the consumer. This refers to any software platform which has a consumer interface. Possible examples of BA User Interfaces are,

1. Mobile apps
2. Desktop application
3. Browser apps
4. Voice assistants,
5. Wearable devices,
6. NLP applications,
7. Chat-bots
8. SDKs

#### What components does a BA include ?
A Beckn App includes,

1. An API to interface with the Beckn Gateway as part of the application cloud. This API will henceforth be referred to as the **Beckn App API**.
2. The consumer user interface
3. The application cloud

A BA could be illustrated as below.

![](/Images/BecknApp.png)

#### Who can set up a BA ?
Any organization which intends to offer integrated, location-aware services to consumers.

#### How to implement the Beckn App API ?
The Beckn App API can be implemented using the specifications defined [here](/Core/API).

### Beckn Gateway (BG)
#### What is a Beckn Gateway ?

A Beckn Gateway (BG) refers to an organization which offers the following functionalities.

1. It provides request routing from Beckn Apps to Beckn Providers and vice versa.
2. It performs request optimization by filtering services based on intent.
3. It validates and filters all requests with city policy
4. It collects payments from the BA users, and settles it with the Beckn Providers through a clearing process

#### What components does a BG include ?

A BG includes,

1. A cloud infrastructure with services to implement the above functionalities
2. An API to accept requests from Beckn Apps. This API will henceforth be known as the **Beckn Gateway-App API**.
3. It validates and filters all requests based on local governance policies
4. It can also optionally collect  payments from the BA users, and settle with Beckn Providers through a clearing process

A Beckn Gateway could be illustrated as below.

![](/Images/BecknGateway.png)

#### Who can setup the Beckn Gateway ?

Any organization with infrastructure to provide the above functionalities preferably organizations who own infrastructure with high compute capability. This organization could be a regulated entity registered with the city authorities.

#### How to implement the Beckn Gateway APIs ?

The Beckn Gateway APIs can be implemented using the specifications defined [here](/Core/API).

### Beckn Provider (BP)
#### What is a Beckn Provider ?
A Beckn Provider is an organization that owns or operates or manages one or more location-aware businesses, delivering services such as mobility, food & grocery delivery, healthcare to consumers


#### What components does a Beckn Provider include ?
A Beckn Provider includes,

1. An API to accept requests from BGs as part of the application cloud. This API will henceforth be referred to as the Beckn Provider API.
2. An application cloud to store inventory data
3. An user interface for service personnel. This is optional and may not be required for all cases. For example, a bike rental might not require a user interface whereas a cab service may require a Driver app.

A Beckn Provider could be illustrated as below.

![](/Images/BecknProvider.png)

#### Who can become a Beckn Provider ?
Any organization who owns, operates or manages location-aware, capacity-limited and time-limited inventory of services can become a Beckn Provider. They may require to be registered with the city authorities and are regulated by them. Possible examples of BPs are,

1. Mass transit companies like metro services, bus services, ride hailing services
2. Restaurants
3. Final-mile delivery services for food & grocery

#### How to implement the Beckn Provider API ?
The Beckn Provider API can be implemented using the specifications defined [here](/Core/API).

## Beckn Ecosystem Architecture

To activate Beckn Protocol, the beckn ecosystem must be organized according to the architecture specifications as listed below. The architecture of a Beckn ecosystem is illustrated below,

![](/Images/PublicDigitalInfrastructure.png)

In addition to the APIs mentioned above, Beckn Protocol allows city authorities to implement a Policy API for applying smart dynamic policies across the ecosystem if needed. The city authorities can also implement a Registration API for registering Beckn ecosystem participants (BPs, and/or BGs and/or BAs) if needed.

## Communication Protocol

All messages between BAs and BPs will be routed through the BG. All request messages will be non-blocking and will be immediately acknowledged with an “ACK” or a “NACK” message in the same session.

The response message will be in the form of a callback. Each callback should also be immediately responded to with an “ACK” or a “NACK” message in the same callback session.

All messages exchanged will be serialised in JSON.

Depending on the nature of the message, the BG may broadcast the message coming from the BA to all the BPs or one specific BP.

Exception: Real time vehicle tracking data will not be routed through the Beckn Gateway. As vehicle tracking involves continuous streams of data via an open socket, it will not be routed through the BG. The same exception applies to any real-time communication between the BP and the BA like chat or cloud calling. In these cases, only the real-time data source information will be transmitted through the BG. For example, in the case of vehicle tracking, only the tracking URL will be transmitted via the BG and not the tracking data itself. More information on this will be discussed in upcoming sections.

The communication protocol can be visualized using the sequence diagram shown below.

**Example : Search request from a BA to BP**

![](/Images/ExampleDataFlow-Search.png)

Taking an example from the  mobility domain, the following events occur,

1. The BA requests BG to return journeys matching a specific intent using the *Journey/search* message. BG responds immediately with an ACK message.
2. BG broadcasts the *Trip/search* message to all the relevant BPs. All BPs respond immediately with the *ACK* messages.
3. BPs will return relevant Trips to BG using a *Trip/cb_search* callback message. BG immediately responds to BPs with the *ACK* message
4. BG performs Journey optimization  the Trips and returns the Journeys to the BA using the *Journey/cb_search* message. BA immediately responds with *ACK*.

