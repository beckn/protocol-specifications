# Layering Network Policy on the Specification

## Draft 01

# Authors

1. Ravi Prakash : ravi@becknfoundation.org

# Reviewers
1. Sujith Nair : sujith@becknfoundation.org
2. Pramod Varma : pramod@ekstep.org


# Latest Version

Draft 01

# Previous Versions

None


# Scope

This document contains design principles and methodologies that should be used to configure beckn protocol specification for various sector-specific networks. This document is intended for the following audience.


1. Anyone who is using beckn protocol specifications to design open commerce networks  for a specific set of use cases


# Prerequisites

Readers of this document must:



1. Have knowledge of the core protocol specification
2. Have knowledge of the Architecture of Open Commerce Networks instantiated using beckn protocol. 
3. Have knowledge of Open API 3.0 Specification


# Context

Beckn protocol is a set of specifications that enables any two platforms to perform commercial transactions by implementing an API with standard action calls and schema. These specifications are by-design generic and therefore, sector agnostic. However, to establish a smart contract between a BAP and a BPP, additional domain-specific information must sometimes be transmitted between the platforms. For example, a logistics network might have different allowed values for the types of fulfillments it supports like “HOME-DELIVERY” and “STORE-PICKUP” as opposed to an education network where the allowed values may be “TELE-CONSULTATION” or “PHYSICAL-CONSULTATION''. These values are not standardized in the core schema but rather exist as _policies_ framed by the architects of a beckn-enabled open commerce network. 

Similarly, a network might put a limit on the number of matched items that can be returned in a single catalog object. To maintain interoperability but also allow its configurability, beckn protocol specification governance restricts modification of the core schema and actions. However, to allow its adaptability, instead of forcing all specification users to adhere to the core specification and, beckn protocol governance allows creation of network-specific policies. These policies allow sector-agnostic rules and validation criteria to be published along with the specification based on recommendations and comments received from various ecosystem contributors and network participants implementing the protocol. These rules and policies must be layered on the core specification and published as a separate document that can be accessed by the network participants in a machine readable manner. 


# Abstract

Beckn Protocol is an abstracted but **highly configurable** specification. A network is an **instantiation** of the core protocol specification. However, to instantiate a network, additional policies must be layered via machine-readable configuration files. These configurations vary from network to network depending upon the use cases supported by them. These configurations allow sector-specific policies to be applied on a network _without_ changing the underlying core specification. This document defines a methodology to publish these network-specific policies as machine-readable documents that can be read by network participants to create API validation middleware.


# Terminology



1. **Network : **In the context of beckn protocol, a network refers to an open commerce network formed by the instantiation of beckn protocol specification with a standard network policy
2. **Network Participant:** Any platform that has implemented beckn protocol specification and is part of an open commerce network
3. **Schema:** These are JSON Schema objects with properties as defined in 
4. **Action:** These are specific events that occur during the lifecycle of a typical commerce transaction
5. **Network Policy**: These are specific rules that apply to the implementers of a network while developing the protocol API middleware


# Problem

Given the Non-Derivative nature of the core specification, how can networks allow configurability of the core specification without disrupting global interoperability?


# Forces

Beckn protocol governance allows highly specific configurations to the core specification via network policies. These policies must be designed not to modify the underlying schema itself but rather govern the values these schema properties are allowed to take like,



1. Adding enumerations to core schema properties
2. Adding additional qualifiers like min / max and defaults
3. Adding sector-specific and region-specific standards to using regex patterns


# Expected Outcomes after reading this document

After reading this document, the reader should be able to



1. Understand how policies can be layered on the core specification
2. Understand how a machine-readable network-specific protocol can be published
3. Understand how such policies can be made available as an infrastructure on a network for dynamic network policy transmission and enforcement


# Network Policy as Code

A network policy is a set of rules that must be published by the architects of beckn-enabled open commerce networks as a machine-readable specification to allow its participants to create protocol validation middleware in their implementations. This specification should **inherit** all the attributes of the core specification along with some additional constraints on the usage of the specification during network transactions. 


## Inheritance and Polymorphism in Open API 3.0

The core specification currently exists in the form of an Open API Specification 3.0 document with some reserved modifications. To layer policy on the specification, beckn protocol governance allows layering of policies by way of configuration. This configuration is done on the core Open API document by using the inheritance and polymorphism feature of Open API Specification 3.0. Inheritance and polymorphism are terms used in Object Oriented Design and are applicable to beckn protocol specifications as well. To learn more about Inheritance and Polymorphism as a generic concept, click here. 

In Open API 3.0, inheritance and Polymorphism are enabled using the “allOf”, “oneOf” and “anyOf” keywords. 


### The allOf keyword

While implementing a protocol API, the data-model may have model schemas that share common properties. Instead of describing these properties for each schema repeatedly, it is possible to describe the schemas as a composition of the common property set and schema-specific properties. In OpenAPI version 3, we can do this with the allOf keyword[4] as shown in the example below


```
components:
  schemas:
    Tags:
      type: object

    CategoryTags:
      allOf:# Combines the basic Tags model and the inline Category Tags model
        - $ref: '#/components/schemas/Tags
        - type: object
          properties:
            brand:
              type: string
              enum:
            - brand
            - purpose
            - season
```


As shown above, the **CategoryTags** schema introduces a property called “brand” that is extended from the otherwise generic **Tags** object in the core specification.


### The oneOf keyword

This keyword allows the validator to validate a value against exactly one of the subschemas out of several schemas.


### The anyOf keyword

This keyword allows the validator to validate a value against exactly one or more of the subschemas out of several schemas.


## Applying Network-Specific Policies using Open API 3.0


### Adding enumerations, defaults and min / max values

It is possible to add **enumerations**, **defaults**, **min/max** values to any schema. For example, a network may allow only **search** and **confirm** actions. Hence the `context.action` attribute will contain an enumeration of only `search / on_search` and `confirm / on_confirm` API calls as shown below.


```
ContextPolicy1:
  description: Describes the context policy of a message on this network
  allOf:
  - $ref: '#/components/schemas/Context'
  - type: object
    properties:
        action:
           type: string
           description: Actions supported by this policy
           enum:
             - search
             - confirm
             - on_search
             - on_confirm
       core_version:
           type: string
           description: Specification versions supported by this policy
           enum:
             - '0.9.1'
             - '0.9.2'
             - '0.9.3-draft'
           default: 0.9.2
       ttl:
           type: string
           description: TTL of the message
           minimum: P0S
           maximum: P1M
```


Another example is related to the **Rating** schema


```
Rating:
      description: Describes the rating of a person or an object.
      type: object
      properties:
        rating_category:
          description: Category of the object being rated
          type: string
        id:
          description: Id of the object being rated
          type: string
        value:
          description: Rating value given to the object
          type: number
```


If a network policy requires rating to range between 1 and 10, it must create a Rating Policy schema that inherits the properties of the Core **Rating** Schema as shown below


```
RatingPolicy1:
  description: Describes the context policy of a message on this network
  allOf:
  - $ref: '#/components/schemas/Rating
  - type: object
    properties:
        value:
           type: number
           minimum: 1
           maximum: 10
```



### Adding alternative schemas

Sometimes it is possible to have requests and responses that can be described by several alternative schemas. In OpenAPI 3.0, to describe such a model, we can use the oneOf or anyOf keywords. For example, while transmitting payment terms from BPP to the BAP via the **on_init** action, multiple payment endpoints can be sent in the _params_ property of the **Payment** schema as shown below.


```
PaymentParams:
  type: object
  properties:
    transaction_id:
      type: string
    transaction_status:
      type: string
    amount:
      $ref: '#/components/schemas/Price/properties/value'
    currency:
      $ref: '#/components/schemas/Price/properties/currency'
  required:
    - currency
    - amount

PaymentParamsPolicy1:
  allOf:
    - $ref: '#/components/schemas/PaymentParams'
    - type: object
      properties:
        anyOf:
          - $ref: '#/components/schemas/BankTransfer'
          - $ref: '#/components/schemas/UnifiedPaymentInterface'
          - $ref: '#/components/schemas/PaymentGatewayParams'

BankTransfer:
  type: object
  properties:
    account_name:
      type: string
    account_id:
      type: string
    ifsc:
      type: string

UnifiedPaymentInterface:
  type: object
  properties:
    vpa:
      type: string

PaymentGatewayParams:
  type: object
  properties:
    merchant_id:
      type: string
    redirect_uri:
      type: string
```



### Adding required fields

It is also possible to add **required** properties to any attribute. For example, in the domain of mobility, the origin location’s gps coordinate must be a required field. 


```
FulfillmentPolicy1:
  description: Describes how a mobility service should be fulfilled
  type: object
  properties:
    id:
      type: string
      description: Unique reference ID to the fulfillment of an order
    type:
      type: string
      description: This describes the type of fulfillment
    provider_id:
      $ref: '#/components/schemas/Provider/properties/id'
    rating:
      $ref: '#/components/schemas/Rating/properties/value'
    state:
      $ref: '#/components/schemas/State'
    tracking:
      type: boolean
      description: Indicates whether the fulfillment allows tracking
      default: false
    customer:
      type: object
      properties:
        person:
          $ref: '#/components/schemas/Person'
        contact:
          $ref: '#/components/schemas/Contact'
    agent:
      $ref: '#/components/schemas/Agent'
    vehicle:
      $ref: '#/components/schemas/Vehicle'
    start:
      description: Details on the start of fulfillment
      type: object
      properties:
        location:
          allOf:
            - $ref: '#/components/schemas/Location'
            - required:
              - gps
        time:
          $ref: '#/components/schemas/Time'
        instructions:
          $ref: '#/components/schemas/Descriptor'
        contact:
          $ref: '#/components/schemas/Contact'
        person:
          $ref: '#/components/schemas/Person'
    end:
      description: Details on the end of fulfillment
      type: object
      properties:
        location:
          $ref: '#/components/schemas/Location'
        time:
          $ref: '#/components/schemas/Time'
        instructions:
          $ref: '#/components/schemas/Descriptor'
        contact:
          $ref: '#/components/schemas/Contact'
        person:
          $ref: '#/components/schemas/Person'
    rateable:
      $ref: '#/components/schemas/Rateable'
    tags:
      $ref: '#/components/schemas/Tags'

```



### Adding standards and formats

A network in India might choose to use the NIC 2004, Industry Classification Codes to identify the Industry Sector of a network via the **Context.domain** attribute as shown below


```
Domain:
      description: Describes the industry domain of an object in the country of India.
      type: string
      pattern: "^nic2004:(52110|52114)"
```



    The above pattern indicates that the network allows only Retail and Delivery transactions 

Adding  domain-specific, region-specific, technology-specific attributes or schema to the **Tags** object to accommodate extensions that might get abstracted and merged into core specifications in future releases. For example, a retail network should publish a list of allowed tags for various schemas used by a network.


```
Tags:
      description: Describes a tag. This is a simple key-value store which is used to contain extended metadata
      additionalProperties:
        type: string
```


All these extensions must be published as part of a separate document called **Network Implementation Policy**

It is recommended that this document be published along with the API specification of that network using the **externalDocs** attribute as defined by Open API Specification 3.0

More Examples:

The specifications allow a network to define a master list of Rating Categories that can be used by NPs. So when creating the API specification of a network, the **rating_categories ** API must define all the allowed rating categories as enums as shown below.


```
Rating:
      description: Describes the rating of an object.
      type: object
      properties:
        rating_category:
          description: Category of the object being rated
          type: string
          enum:
            - Order
            - Fulfillment
            - Item
            - Provider
            - anything else
        id:
          description: Id of the object being rated
          type: string

        value:
          description: Rating value given to the object
          type: number
          minimum: 0
        feedback_form: 
          $ref: '#/components/schemas/FeedbackForm'
          required: false
        feedback_id:
          $ref: '#/components/schemas/FeedbackUrl/properties/params/properties/feedback_id'
          required: false
```

