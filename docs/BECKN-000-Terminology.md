# BECKN-000: Terminology

## License:
This document is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

![Creative Commons License](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)

## Category:
Terminology

## Published on:
Sept 9th, 2025

## Last Updated on:
Sept 16th, 2025

## History: 
Click on this [link](https://github.com/beckn/protocol-specifications/commits/core-1.2-release/docs/BECKN-000-Terminology.md) to view the history of changes to this document

## Issues:
To view issues related to this document, click on this [link](https://github.com/beckn/protocol-specifications/issues?q=is%3Aissue+label%3ABECKN-000)

## Discussions:
To view discussions related to this document, click on this [link](https://github.com/beckn/protocol-specifications/discussions?discussions_q=label%3ABECKN-000)

## Authors:
1. [Ravi Prakash](https://github.com/ravi-prakash-v)

## Reviewers:
1. [Sujith Nair](https://github.com/sjthnrk)
2. [Pramod Varma](https://github.com/pramodkvarma)
3. [Venkatraman Mahadevan](https://github.com/venkatramanm)

# Abstract

This document provides a comprehensive glossary of terms and definitions used across the Beckn Protocol specifications. It serves as a reference for network participants, implementers, and stakeholders to ensure consistent understanding of key concepts and terminology.

# Scope

This document defines the standard terminology used across all Beckn Protocol specifications and related documents. It is intended for:

1. Network participants implementing Beckn Protocol
2. Developers building on Beckn-enabled networks
3. Policy makers and governance bodies
4. Technical writers and documentation maintainers

## Prerequisites

Readers of this document should have:

1. Basic understanding of distributed systems and API protocols
2. Familiarity with commerce and transaction terminology
3. Knowledge of the Beckn Protocol architecture

# Introduction

The Beckn Protocol ecosystem involves multiple stakeholders, technical concepts, and domain-specific terminology. This document establishes a common vocabulary to ensure clear communication and consistent implementation across all Beckn-enabled networks.

# Terminology

1. **Network :** In the context of beckn protocol, a network refers to an open commerce network formed by the instantiation of beckn protocol specification with a standard network policy
2. **Network Participant:** Any platform that has implemented beckn protocol specification and is part of an open commerce network
3. **Schema:** These are JSON Schema objects with properties as defined in the core specification
4. **Action:** These are specific events that occur during the lifecycle of a typical commerce transaction
5. **Network Policy**: These are specific rules that apply to the implementers of a network while developing the protocol API middleware
6. **BAP (Beckn Application Platform)**: A platform that enables buyers to discover and transact with sellers on a Beckn-enabled network
7. **BPP (Beckn Provider Platform)**: A platform that enables sellers to list their services and fulfill orders on a Beckn-enabled network
8. **BG (Beckn Gateway)**: A network infrastructure component used for provider discovery; it routes discovery requests from BAPs to relevant BPPs and enforces basic routing and validation policies
9. **Registry**: A centralized directory service that maintains information about network participants, their capabilities, and network policies

# Examples

## Common Usage Examples

- **Network**: "The mobility network in Bangalore uses Beckn Protocol with specific policies for ride-sharing and public transport"
- **Network Participant**: "Uber and Ola are both network participants in the mobility network"
- **Schema**: "The Order schema defines the structure for transaction data"
- **Action**: "The search action initiates the discovery of available services"
- **Network Policy**: "The network policy requires all transactions to include location data"
- **BAP**: "The Swiggy app acts as a BAP, allowing users to discover and order food from restaurants"
- **BPP**: "Restaurant partners use a BPP platform to list their menus and manage orders"
- **BG**: "The beckn gateway is used for provider discovery and routes search requests from BAPs to relevant BPPs in the food delivery network"
- **Registry**: "The registry maintains a directory of all food delivery BPPs and their service capabilities"

# Recommendations

- Use terminology consistently across all documentation and implementations
- Refer to this document when introducing new terms or concepts
- Update this document when new terminology is introduced in the protocol
- Cross-reference related terms to maintain clarity

# Acknowledgements

The authors would like to thank the following people for their support and contributions to this document.

* Pramod Varma (Beckn Foundation)
* Sujith Nair (Beckn Foundation)
* Venkataramanan Mahadevan (Humbhionline)
