# The Tags Schema

## ID: 
BECKN-RFC-The-Tags-Schema

## Title:
The Tags Schema

## Category:
Schema

## Status:
Protocol Draft

## Published on:
April 03, 2023

## Expires on:
April 02, 2024 or the date of publication of next draft, which ever is earlier

## License:
CC-BY-ND

## Authors:
1. Ravi Prakash : ravi@fide.org

# Scope

This document contains recommendations that enable sector or category-specific information to be transmitted via beckn APIs. This document is intended for the following audience.

1. Anyone who is attempting to add sector-specific attributes to various core schema elements.

# Prerequisites

Readers of this document must:

1. Have knowledge of the core protocol specification
2. Have knowledge of the Architecture of Open Networks instantiated using beckn protocol. 
3. Have knowledge of Open API 3.0 Specification


# Context

Beckn protocol is a generic transaction protocol that allows any producer and consumer to interact and perform digitally signed transactions via a standard set of APIs. The schema of beckn has been abstracted to a level that allows any real-world entity to be represented as a generic object. 

Fundamentally, all transactions are the same according to beckn protocol. But practically, things are somewhat different. Sometimes, interacting entities (a.k.a Network Participants) need to send additional information related to various real-world entities to comply with policies and conventions governing the domain, network or the region of operation. Strictly speaking, this information may not be necessary to perform a transaction, but to allow an element of trust and convenience to be associated with a transaction.

A retailer selling fast moving consumer goods might be legally obligated to send nutritional information, manufacturer details, food certification details, and other relevant information related to the products they are selling. On the other hand, consumers might want to narrow their search by sending specific information about the product they want. 

A car rental provider might want to send additional information on the make, model, variant, and other features of a car that might be useful to the customer to make a decision. It is also useful to the provider to provide faster and better search results if this additional information was sent by the customer while searching for the right car to rent. 

Similarly, a hospitality service provider may want to transmit additional information related to a room like AC/Non-AC, WiFi availability, Breakfast included, etc to allow the customer to choose the right room for themselves.

As you can see from the above examples, the above information is not strictly necessary for an order to be created. But rather as metadata for display purposes, grouping, and filtering at the consumer’s end; and for enabling search optimization at the provider’s end.


# Problem

How to transmit extended metadata related to a transaction in beckn protocol without breaking interoperability across implementations.


# Solution

Beckn protocol defines a schema called **Tags**, that allows various sector-specific, network-specific key-value pairs to be transmitted between network participants. Each domain-specific adaptation of beckn protocol should publish a standard set of supported tags that all implementers should adopt. 


## The **Tags** schema

The **Tags** schema is an object. The schema is represented below.


```
components:
   schemas:
     Tags:
      description: A simple key-value store which is used to contain extended metadata.
      additionalProperties:
        type: string
```


The `Tags` schema is explicitly referenced in the following schemas.

* Category.tags
* Contact.tags
* Fulfillment.tags
* Intent.tags
* Item.tags
* Person.tags
* Provider.tags
* Support.tags

However, this can be added to _any_ schema to carry extended metadata under the reserved keyname “tags”.

## Usage

When sending tags, the implementer must perform the following steps,

1. Identify and define the domain / region / network specific attributes of each platform-specific schema that has been mapped
2. Codify the attribute
3. Add those tags in the appropriate schema with prefixes if required


## Grouped Tags

Usually extended information sent in certain schema like `Item` require tags to be grouped under specific headings. For example, A television might have its details grouped under various headings like Technical Specifications, Additional Details, warranty, Installation Guide etc. To group such information under specific headings, a certain format has to be adopted. 

### Usage
1. Create an empty tag object
2. Create a key having the following prefix 'groups/{group-index}/'. Here group-index defines the order in which these groups are defined
3. Assign it the value equal to the name of the group. 

```
{ 
    'groups/1/descriptor/name' : "Nutritional Information" 
}
```
4. If the group is a standardized group, then we can use the `descriptor/code` property add it to the tag object. For example
```
{ 
    'groups/1/descriptor/name' : "Nutritional Information",
    'groups/1/descriptor/code' : "nutritional_info"
}
```
5. If the group has to be displayed to the user, we can use the `display` property set to `true`. For example
```
{ 
    'groups/1/descriptor/name' : "Nutritional Information",
    'groups/1/descriptor/code' : "nutritional_info"
    'groups/1/display: true
}
```
6. Add the list of tags under this group using the `list` property. For example
```
{ 
    'groups/1/descriptor/name' : "Nutritional Information",
    'groups/1/descriptor/code' : "nutritional_info"
    'groups/1/display: true,
    'groups/1/list/1/descriptor/name: "Sugar",
    'groups/1/list/1/descriptor/code: "sugar",
}
```
7. Add the value of these listed tags using the `value` property. For example
```
{ 
    'groups/1/descriptor/name' : "Nutritional Information",
    'groups/1/descriptor/code' : "nutritional_info"
    'groups/1/display: true,
    'groups/1/list/1/descriptor/name: "Sugar",
    'groups/1/list/1/descriptor/code: "sugar",
    'groups/1/list/1/value: "3 g",
}
```

## Non-standard tags
In case the implementer wants to send a list of informational non-standard tags just for informational purposes, they can do so without the `descriptor/code` property. For example, 

```
{ 
    'groups/1/descriptor/name' : "Nutritional Information",
    'groups/1/display: true,
    'groups/1/list/1/descriptor/name: "Sugar",
    'groups/1/list/1/value: "3 g",
}
```

### Note:

Sending non-standard tags is allowed, however it is recommended for all platforms to standardize tags as much as possible. This will allow rich experiences to be built on the BAP like comparison, filtering, sorting etc.

At the BPP side, using standardized tags will allow for better indexing of catalogs that will ultimately result in faster search responses. 

## Nameless tag groups
In case the implementer wants to send listed information that is not in a key-value format but just a set of values, they can do so by omitting the `descriptor/name` and `descriptor/code` properties, and set just the `value` property. For example,

```
{ 
    'groups/1/descriptor/name' : "Steps to installation",
    'groups/1/display: true,
    'groups/1/list/1/value: "Insert the adaptor into the socket",
    'groups/1/list/2/value: "Switch on the power button",
    'groups/1/list/2/value: "Click the network button at least 5 times until the LED glows orange",
}
```

## Parsing tags

[TODO]

