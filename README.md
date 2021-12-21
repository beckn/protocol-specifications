---
title: "Beckn Protocol - Core"
metaTitle: "Beckn Protocol Transaction API Core"
metaDescription: "Domain agnostic transaction specification for e-commerce"
---

## Specification Evolution

| Domain                | Version   |    Release Date       |
|-----------------------|-----------|-----------------------|
|   Core   |    0.9.3-draft      | TBA       |
|   Core   |    0.9.2      | 27 July, 2021        |
|   Core   |    0.9.1  | 09 November, 2020        |
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

# Introduction

**Beckn** is an open protocol that allows local businesses across any industry to be discovered and engaged by any beckn-enabled application. Beckn protocol helps businesses co-create solutions for the masses seamlessly, by combining services of any form or provider.

**Beckn protocol** is a collection of open specifications consisting of protocol APIs, message formats, network design and reference architectures to allow any two entities to execute commercial transactions without being on the same platform.

This server-to-server communication protocol allows any consumer facing online platform to discover and transact with any business with minimal implementation overhead. The server-to-server nature of the protocol allows rich user experiences to be built by bundling services from multiple independent platforms.

Beckn protocol decouples the demand side digital infrastructure in the form of apps and other channels from the supply side service provisioning infrastructure. It does this by making integratedservices available not just on a single platform but potentially on any online consumer interface, (online maps, messaging, wallets, voice assistant apps and devices) that have mainstream adoption in a city.

Beckn is a protocol, not a platform. It adopts a decentralized architecture that obviates the need for creating a centralised platform in order to integrate services from multiple providers simultaneously ensuring privacy and security by design by enabling secure, encrypted iteractions.

## Beckn Protocol - Core Specification

Beckn protocol - core specification defines a generic, abstracted API that when implemented allows domain-agnostic interoperable e-commerce transactions between a buyer and seller irrespective of which platform they are on. An analogy similar to this would be the case of SMTP specification that allows email communication between any two platforms that have implemented the same specification.

The core specification defines APIs for the following events in e-commerce

1. Discovery - This involves activities like platform discovery, catalog browsing, filtering and item viewing
2. Ordering - This involves activities like cart building, quote calculation, checkout & payment terms agreement, and ultimately order confirmation 
3. Fulfillment - This involves all post-order-creation activities like tracking, order update, cancellation and status updates 
4. Post-fulfillment - The involves all post-fulfillment activities like rating, feedback, support, returns and replacements

## Packet Structure

All communication using beckn protocol have the following packet structure

|  Field        |    Description                                                                                |
|---------------|-----------------------------------------------------------------------------------------------|
|  `context`    |    Contains header information that is used for packet switching, key lookup, and encryption  |
|  `message`    |    Contains transaction information that is visible only to the participants of a transaction |

## Transport Protocol

While beckn protocol it designed to be transport agnostic, it is conventional to use HTTP as the default transport protocol. Additional layers like security and trust can be layered on top of this protocol using exisiting standards like HTTPS and SSL. It is recommended that any platform implementing beckn protocol use HTTPS to secure its communication.


## Communication

Communication on beckn enabled networks is server-to-server. Server-to-server means that communication between any two systems on a beckn network does not involve the client application. The client is free to render the data in whatever form chosen by the product. Secondly, all communication is asynchronous. Asynchronous API calls do not block (or wait) for the API call to return from the receiver server in the same session. Instead, an immediate acknowledgment is sent to the sender server in the same session and the actual response from the receiver server is in the form of a callback API call to the sender server. The above two features provide a remarkable advantage as all sorts of innovations are possible in the application layer due to the experience layer being unbundled from the session and presentation layer of the application.

A beckn enabled network has multiple entities (CSF005) communicating with each other via standard protocol APIs. The following types of communication are possible.

- BAP and BG
- BAP and BPP
- BG and BPP
- BAP and Registry
- BPP and Registry
- BG and Registry

All API calls between any two entities on the beckn network are asynchronous. Meaning, an API call from a BAP server (sender) to a BPP server (receiver) does not expect an informational response from a BPP in the same session. The immediate response in the same session is merely an acknowledgment or ACK which basically means, “Hey, I have received your request and it looks okay during validation of the input. Let me call you back when I have the details you need”. The actual response is sent later in the form of a standard callback API which the sender is required to implement. 

## Communication Protocol Between 2 Entities
The sequence diagram of a typical beckn protocol API is shown in Figure 1. For example, let’s say X is the sender and Y is the receiver, and the API being called is search.

In most cases, the sender will call the API first and the receiver will respond immediately with an ACK and close the session. After an arbitrary period of time (which is dependent on the processing of the message), the receiver will respond with an API callback to the sender. The name of the callback API is the name of the sender API with an “on_” prefix. For example, if the request API is called “search” then the associated callback API will be “on_search”.

## Communication Protocol Via Beckn Gateway

Most communication in a beckn enabled network involves two entities. But sometimes, an intermediate entity like a Beckn Gateway (BG) is involved. In those cases, the flow of communication should be as follows.

If the address of the BPP is not specified in the `context` field of the request body, then the BAP should call the BG and the BG may broadcast this API to multiple BPPs. 

The BPPs immediately respond with ACKs. Soon after, the BPPs call the `on_search` API which is sent back to the BAP.

Sometimes the BG may query a Registry via the `lookup` API to get the BPP addresses and then broadcast the message to the BPPs.

The transaction via the BG is encrypted and the BG has no visibility into the transaction information contained in the `message` field and only uses the `context` header to perform BPP discovery and routing.


# Acknowledgments
The author would like to thank the following individuals for their contributions in creating the this document. (in alphabetical order):

Pramod Varma, Beckn Foundation
Sujith Nair, Beckn Foundation
