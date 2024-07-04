# BECKN-008:Rating and Reputation on Beckn Protocol

## Published on:
January 21, 2022

## Last Updated on:
July 4th, 2024

## License:
This document is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

![Creative Commons License](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)

## Authors:
1. Ravi Prakash : ravi@becknprotocol.io

## Reviewers:
1. Sujith Nair : sujith@becknprotocol.io
2. Pramod Varma : pramod@ekstep.org
3. Venkatraman Mahadevan : venkatramanm@gmail.com


Scope
=====

This document is intended for anyone wishing to design a Rating and Reputation system for beckn protocol enabled Open Networks. This specification is agnostic of any implementation technology but contains examples of run-time JSON objects for the sake of clarity. 

Context
=======

Customers expect quality in any products and services they have bought. To ensure such quality is maintained, providers usually expect their customers to rate their services and products based on how satisfied they are with the product consumed or service rendered. Most e-commerce systems nowadays implement an online rating system that allows their users to rate the products and services bought on that platform.

Platforms selling physical products usually allow their users to rate the quality of their products and sometimes, the delivery. Business aggregators allow their users to also rate businesses as a whole. Businesses allow their customers to rate the customer support they received. There are many more such entities that can be rated based on the customer's level of satisfaction.

Typically, a rating system allows the consumer to provide a rating value from 1 to 5 where 1 represents lowest quality of service and 5 represents the highest quality of service. In some cases, fractional ratings are also used for further granularity; and in other cases non-numeric values like "Good" or "Bad''; and Ratings from 1 to 10 are also used. The rating value of a particular product or service is typically made visible to the public. A rating system is expected to be fair and transparent to its users, both customers and providers.

In the case of beckn protocol, many such platforms connect to each other via beckn and thus present a new challenge of managing rating and reputation on a decentralized network. (Talk about the challenge presented) due to open commerce networks and the purpose of this document.

For platforms connected to each other in an open commerce network, an interoperable and shared rating and reputation system must be implemented that allows users to rate various entities on the network. The rating system must adhere to the following design principles

1.  Non-repudiability

2.  Privacy protected

3.  Cross-platform compatibility

Abstract
========

This document defines design specifications to create an interoperable, secure and non-repudiable system for managing Rating and Reputation of various physical and virtual entities on beckn-enabled Open Commerce Networks. It describes the various roles involved in the system and their respective functions. It also describes the format in which rating must be transmitted and stored on the network. There are multiple approaches to design a system, each approach has its advantages and limitations.

Terminology
===========

1.  **Rating Category**: For example: Agent, Fulfillment, Provider

2.  **Rateable Object**: The runtime object of a Rating Category that can be rated

3.  **Rating Sender**: The actor that rates a Rateable Object

4.  **Rating Receiver**: The actor that receives the rating for a Rateable Object

Problem
=======

How to ensure that the customers receive quality services rendered from different providers on an open network?

Forces
======

1.  Same Rateable Objects may exist on more than one BPP under different names

Expected Outcomes after reading this document
=============================================

After reading this document, the reader should be able to

1.  Understand how ratings work on Open Commerce Networks enabled by beckn protocol

2.  Understand how to connect their platforms to the Rating and Reputation system on open commerce networks. 

Rating using Beckn Protocol
===========================

In beckn, **rating** is done via the rating action. This action allows any NP to rate a Rateable Object of another NP according to the rating policy of the NP. The rating policy of an NP defines,

1.  What can be rated

2.  How to rate

Communication Protocol for Rating
---------------------------------

### Rating Policy Handshake

Before a NP rates another NP's service, an agreement must be reached between both NPs regarding the rating policy. The agreement is done via the Rating Policy agreement handshake. The sequence of messages to be exchanged in this handshake is shown below.

1.  The Rating Sender should call the **get_rating_categories** action on the Rating Receiver's protocol API.

2.  The Rating receiver must immediately respond with an ACK. 

3.  The Rating Receiver should then send back a list of Rating Categories by calling the **rating_categories** callback action on the Rating Sender's protocol API. The **rating_categories** message should contain the following information

    1.  Name of the Rateable Category. This name should be the same as the name of the Schema from Core Specification. For example, "Agent", or "Provider"

    2.  The equivalent real-world name of the Schema. For example,
    `{ "Agent" : "Delivery Rider" }`

    3.  The rating conditions that must be fulfilled before rating that object. Meaning, the message must contain attributes that must be set and what their expected values must be before rating that Object. The attributes must be in the form of a runtime schema path.  For example,
    `{ "conditions" : [ { "order.id" : "true", "fulfillment.status" : "COMPLETE"}, { x : y}  ] }`

    4.  The rating conditions must be an array where a single element of that array represents all the conditions that must be fulfilled simultaneously. (AND function). 

    5.  The OR conditions are expressed as the separation between individual elements of the array. Example needed. 

    6.  Post-rating effects such as links to feedback forms

        1.  Feedback_form_url

        2.  Callbacks

        3.  ...

    7.  Rating level type 

4.  The Rating sender must respond with an ACK.

The Rating Sender must design their business logic to accept rating from the user only when the Rating Receiver's rating conditions are matched during a transaction.

### Rating Call

Once the rating handshake is complete, the Rating should happen via the following process.

1.  The Rating Sender should call the rating action on the Rating Receiver's API. The rating message should contain the following information as key/value pairs

1.  The name of the Rating Category: "rating_category" : "Agent"

2.  The UUID of the Rateable Object: "id" : "2324-35454-2324"

3.  The rating value: "value" : "4"

4.  Additional data collected via the feedback form (if required)* 

3.  The Rating Receiver must send an ACK

4.  The Rating Receiver must call the on_rating action on the Rating Sender's API. the message must contain any additional information that may be required after the rating is complete. (Requires further elaboration)


### Communication Sequence


<figure>
<img align="center" src="https://github.com/beckn/protocol-specifications/blob/draft/docs/images/rating%20handshake.png">
</figure>

Rating Ledger Architecture
==========================

The Rating Ledger is a table containing records with the following fields. This table can be implemented on a centralized database or a decentralized database like a blockchain.

|Attribute|Description|Example|
|---------|-----------|-------|
|id|Primary key |`<Some UUID>`|
|rateable_object_id|This is a UUID generated by the BPP that is mapped against a unique ID.||
|total_rating_value|Total Rating Value|4350|
|total_rating_count|Total number of ratings|1000|

This table can be accessed by implementing the same rating action on its API. It is capable of receiving bulk rating information and publishing the information for all network participants to view without revealing confidential information regarding a rateable entity.

When a Rating Sender wants to rate a Rateable Object, it must first call the rating action on the Rating Receiver's API.

At the end of a periodic cycle, say at the end of every day, the Rating Sender must send all the ratings done for the day in bulk.

The Rating Ledger should compute the cumulative rating value of the Rateable Object by adding the sent value to the last calculated value and updating the record of that rateable object.

When a Rating Sender wants to verify the rating of a Rateable Entity, it should call the lookup action on the Rating Ledger's API by sending the id of the Rateable Entity. This requires the Rateable Entity's ID and it's average rating to be sent in the catalog during the on_search action.

To verify the rating of a Rateable Object in the catalog, the Rating Sender must calculate the average rating by dividing the total_rating_value with the total_rating_count.

`Average Rating Value = total_rating_value / total_rating_count`

If this value matches the rating value sent in the catalog, then the rating is accurate. A margin of error may be introduced in the Network Rating Policy  specifying the number of significant digits to be used while comparing the average rating with the received rating.

If the rating value does not match or is not within the margin of error, then the Rating Sender should report the error to the Network Facilitator.
