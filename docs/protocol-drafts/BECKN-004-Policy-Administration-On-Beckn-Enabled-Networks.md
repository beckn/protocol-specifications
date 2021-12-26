# Policy Administration on Beckn-Enabled Networks

## ID: 
BECKN-RFC-004

## Draft ID
Draft-01

## Title:
Policy Administration on Beckn-Enabled Networks

## Category:
Policy

## Status:
Protocol Draft

## Published on:
December 10, 2021

## Expires on:
December 10, 2022 or Date of publication of next draft which ever is earlier

## License:
CC-BY-ND

## Authors:
1. Ravi Prakash : ravi@becknfoundation.org
2. Sujith Nair : sujith@becknfoundation.org

## Reviewers:
1. Sujith Nair : sujith@becknfoundation.org
2. Pramod Varma : pramod@ekstep.org


# Introduction

Beckn protocol allows the creation of **Open Commerce Networks**. The primary actors on such networks are BAP, BPP, BG and Registry. Each actor implements an API that enables products and services to be discovered, ordered and fulfilled via a standard API. These API calls correspond to different interactions that happen between a buyer and a seller. 

The messages that are exchanged in these interactions belong to a standard sector-agnostic schema. The schema is very generic but is highly configurable. The configuration is done via the application of constraints and rules on the fields in various schema and subschema. 

Various use cases can be enabled by calling these APIs in different ways. These could be the order in which the APIs are called; the message fields that are mandatory to execute a specific function; the standards and formats that need to be used across all implementors to ensure data interoperability.

Each network has a logical boundary. This boundary is created by the governance of a network. They will most likely be part of a larger consortium known as a Network Facilitator Organization. The facilitators create the boundary by defining the rules and regulations for various activities that are performed by the network participants starting from implementation to run-time. These rules are published by the creators as part of a document called the **Network Policy**. 

This document contains the methodology to publish, implement and enforce the Network Policy on an Open Commerce Network. The process of publication, implementation and enforcement of network policy is known as **Network Policy Administration**.

# Network Policy Use Cases

To get a better understanding of what a network policy outlines, let us take a look at some policy use cases that a network creator might enforce on the participants. 

## Supported Industry Sectors Adaptations

While the protocol itself is sector agnostic, a network may support only a specific set of industry sectors like “Mobility”, “Retail”, or “Logistics”. These sectors may contain sub-sectors like, say, “On-demand Cab Services”, “Bike Rental”, “Metro services” under the Mobility Sector. Such sectors could be specified by allowing only certain sector codes to be transmitted in the messages. 

## Supported Fulfillment Modes
A network may support various fulfillment flows for various sectors. For example, a retail network may support "STORE-PICKUP" and "HOME-DELIVERY".  In the sector of education, a network may support "VIRTUAL-CLASS" and "PHYSICAL-CLASS". These modes may vary with the Industry Sector Adaptations of a network. 

## Catalog Restrictions
A network may place restrictions on a catalog. For example, a network may restrict certain kinds of goods like *illegal items* or *non-essential* items to be listed or searched for. 

## Policy Coverage
A policy may apply to different geo-political regions on the map. It may also apply only during certain time slots. Such spatial and temporal on the policy is called **Policy Coverage**

## Geo-Spatial Coverage
The network may place geo-spatial constraints on various activities performed on a network. For example, a network may allow certain businesses to operate only within a specific city. This rule may also include exclusion and inclusion zones within a city like containment zones, restricted areas etc. Such restrictions could be implemented by rejecting  search requests to exclusion zones.

## Temporal Coverage
The network may place temporal (time-based) constraints on various activities performed on a network. For example, a network may allow certain businesses to operate only within certain hours of the day, or only on certain days of the week. Sometimes, the network may allow specific platforms to operate for a fixed duration (like a month) as part of a pilot launch. 

# Policy Categories
Policies can be of various categories as shown below

1. Implementation
2. Registration
3. Subscription
4. Transaction
5. Payment
6. Data Transmission
7. Communication

# Problem Definition

How do we set up a digital infrastructure that achieve the following outcomes:
1. Create, view, update and delete network policies for various use cases described above
2. Create, view, update and delete subscriber policies policies of a subscriber
3. Agree or disagree to a network policy
4. View network participants that have agreed / disagreed to specific network policies
5. Dynamically apply network policies as a middleware on protocol implementations 
6. Audit network participants for compliance with a network policy

# Solution Approach

This section describes the specification to create a digital infrastructure to achieve the above outcomes. It contains
1. Implementation Process
2. Data Model
3. Policy APIs
4. Policy Agreement and Adoption Protocol
5. Reference Architecture
6. Sample Workflow

# Network Policy Design Principles

## Ensuring Interoperabililty
The guiding design principle of any network policy is to ensure interoperability at all costs. This can be achieved by publishing sector-specific codes, standards, benchmarks, data exchange mechanisms and supported use cases as Open API files, Policy Registries, Sample Flows and Certification Agencies etc. 

## Avoid Re-imposing Existing Policies
Most sector-specific regulatory policies are already enforced by the authorities of a region and do not need to be re-imposed on a network. For example, if selling unauthorised articles online is an existing policy that has been imposed by a region's authorities, it does not need to be re-imposed as a network policy. The fact that a network participant is on an Open Commerce Network does not change the rules and regulations of the region they are operating in. the Network Facilitators should strive to ensure that the relevant policies are available to the network participants easily without searching for them in various websites and possibly missing some of them. 

## Inclusiveness and Optimal Ignorance
This should be a prime directive of any Network Policy. Before designing a new policy, the policy designers must ask themselves following questions.
1. Is this needed?
2. Is this needed NOW?
3. Does this policy introduce unnecessary regulatory control over the network participants over and above the already established regulations of the industry?
4. Does this policy unnecessarily restrict NPs from registering on a network?

## API-fication
All policy documents must be available and agreeable via an API. 

## Machine Readability
All policy administrators must strive to encode all policies in a machine readable format. This is of course not mandatory but merely a principle for the administrators to adopt as much as possible. In those cases where policies are subjective and cannot be encoded, they should be present as URLs to pdf documents 

## Non-repudiability
All policies in machine-readable or document format must be accompanied with digital signatures. These signatures must be digitally verifiable by NPs using public keys. 

# Policy Workflow
Policy administrators and network participants can adopt the below workflow. This merely a reference workflow and is not a standard. Networks are free to design their own workflows to ensure better interoperability. 

![Policy Workflow](https://github.com/beckn/protocol-specifications/blob/master/docs/images/Policy-Workflow-New.png)

# Policy Framework Roles
1. Policy Adopter (BPPs, BAPs, BGs, Registries)
2. Policy Publisher (SRO or equivalent)
3. Policy Auditor (Monitoring and Reporting)

# Policy Implementation Architecture

The below diagram shows a reference policy microservice layered on the transaction layer as a middleware.

![Policy Workflow](https://github.com/beckn/protocol-specifications/blob/master/docs/images/Policy-Agreement-Implementation-Architecture.png)

# Policy Agreement and Adoption Protocol

The below diagram shows a reference dynamic policy adoption workflow via policy API calls

![Policy Workflow](https://github.com/beckn/protocol-specifications/blob/master/docs/images/Policy-Agreement-and-Adoption-Protocol.png)

# Policy Compliance Audits and Checks

## Technical Audits
The NFO can engage a testing agency to test policy compliance via an automated test suite

## Non-technical Audits
### Social Audits by External Agency: 
NFO can engage a social audit agency to test compliance of a Subscriber

### Social Audits by Users: 
NFO can mandate that all apps must have a one-click report feature by which users can report any compliance issues with the application to an ODR system. These reports can be viewed by an auditor to fetch any policy compliance violations

# Policy Layer Data Model
This section describes the minimum schema that must be implemented by any service that enables the above outcomes covering the use cases described above.

## PolicyCategory

### Description
TODO

### Type
object

### Properties
| Property | Type   | Description                 |
|----------|--------|-----------------------------|
| id       | string | ID of the policy category   |
| name     | string | Name of the policy category |

## SpatialCoverage
### Description
TODO

### Type
object

### Properties
| Property | Type     | Description                              |
|----------|----------|------------------------------------------|
| id       | string   | ID of the coverage                       |
| location | Location | Location of coverage                     |
| type     | string   | Enum ( “incl”, “excl” ), Default: “incl” |

## TemporalCoverage
### Description
TODO

### Type
object

### Properties
| Property | Type   | Description                              |
|----------|--------|------------------------------------------|
| id       | string | ID of the coverage                       |
| time     | Time   | Time of coverage                         |
| type     | string | Enum ( “incl”, “excl” ), Default: “incl” |

## SubscriberCoverage
### Description
TODO

### Type
object

### Properties
| Property      | Type    | Description                              |
|---------------|---------|------------------------------------------|
| id            | string  | ID of coverage                           |
| subscriber_id | string  | ID of the subscriber                     |
| type          | string  | Enum ( “incl”, “excl” ), Default: “incl” |

## SchemaOverride
### Description
TODO

### Type
object

### Properties
| Property        | Type   | Description                                 |
|-----------------|--------|---------------------------------------------|
| id              | string | ID of row                                   |
| target_schema   | Time   | Schema to be overriden                      |
| override_schema | string | Schema that has to override existing schema |

## Action
### Description
TODO

### Type
object

### Properties
| Property | Type   | Description             |
|----------|--------|-------------------------|
| id       | string | ID of protocol action   |
| action   | string | Name of protocol action |

## ProtocolVersion
### Description
The protocol version of the specification

### Type
string

### Properties


## Policy
### Description
TODO

### Type
object

### Properties
| Property            | Type               | Description                         |
|---------------------|--------------------|-------------------------------------|
| id                  | string             | ID of policy                        |
| category            | string             | Category ID of policy               |
| parent_policy_id    | Time               | Parent Policy                       |
| protocol_version    | ProtocolVersion    | Applicable protocol version         |
| action              | Action             | Applied to action                   |
| schema_policy       | SchemaPolicy       | ID of schema policy                 |
| spatial_coverage    | SpatialCoverage    | Spatial Coverage of policy          |
| temporal_coverage   | TemporalCoverage   | Temporal Coverage of policy         |
| subscriber_coverage | SubscriberCoverage | Subscriber Coverage                 |
| published_on        | DateTime           | Date on which this was published    |
| applicable_from     | DateTime           | Date from which this policy applies |
| expires_on          | DateTime           | Date on which this policy expires   |
| signature           | string             | Digital Signature of publisher      |
| attachment          | string             | URL of attached document            |

## PolicyManifest

### Description
The complete list of policies published by a Network Subscriber

### Type
object

### Properties
| Property  | Type           | Description         |
|-----------|----------------|---------------------|
| id        | string         | ID of manifest      |
| policies  | Array (Policy) | Array of policies   |
| Meta info | string         | Any additional info |

## PolicyDifference
### Description
This is the diff of the policy files

### Type
string

## PolicyConflict
### Description
TODO

### Type
object

### Properties
| Property  | Type             | Description                                   |
|-----------|------------------|-----------------------------------------------|
| policy_id | boolean          | Indicates if there is a conflict of interest  |
| diff      | PolicyDifference | A diff between existing and new schema        |
| reason    | ConflictReason   | Reason for the conflict of interest           |

## ConflictReason
### Description
TODO

### Type
object

### Properties
| Property | Type        | Description |
|----------|-------------|-------------|
| code     | string enum | Reason code |

#### Reason Codes Enumeration

**NETWORK_POLICY_VIOLATION**
The adopter should return this code if the new policy violates the default network policy.

**SELLER_POLICY_VIOLATION**
The adopter should return this code if the new policy violates the default seller policy, then. 




