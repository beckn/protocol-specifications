# BECKN-010:Keyword Definitions for Technical Specifications

## License:
This document is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

![Creative Commons License](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)

## Category:
Keywords for Technical Specification

## Published on:
January 21, 2022

## Last Updated on:
July 8th, 2024

## History: 
Click on this [link](https://github.com/beckn/protocol-specifications/commits/core-1.2-release/docs/BECKN-010-Keyword-Definitions-for-Technical-Specifications.md) to view the history of changes to this document

## Issues:
To view issues related to this document, click on this [link](https://github.com/beckn/protocol-specifications/issues?q=is%3Aissue+label%3ABECKN-010)

## Discussions:
To view discussions related to this document, click on this [link](https://github.com/beckn/protocol-specifications/discussions?discussions_q=label%3ABECKN-010)

## Authors:
1. [Ravi Prakash](https://github.com/ravi-prakash-v)

## Reviewers:
1. [Sujith Nair](https://github.com/sjthnrk)
2. [Pramod Varma](https://github.com/pramodkvarma)
3. [Venkatraman Mahadevan](https://github.com/venkatramanm)

# Abstract

This document outlines the definitions of key words that are commonly used in technical specifications, standards, and protocols. The aim is to provide a uniform interpretation of these terms to avoid ambiguity and misinterpretation.

# Scope

This document is intended for the following audience:

1. Anyone reading or writing beckn protocol technical specifications
2. Developers implementing beckn protocol requirements
3. Quality assurance teams testing beckn implementations
4. Technical writers creating beckn documentation

## Prerequisites

Readers of this document must:

1. Have knowledge of technical documentation standards
2. Have understanding of RFC 2119 terminology
3. Have basic knowledge of beckn protocol concepts

# Introduction

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [rfc 2119](https://datatracker.ietf.org/doc/html/rfc2119). These definitions aim to ensure that the terms are understood precisely and consistently to avoid confusion in the interpretation of standards, specifications, and protocols.

# Problem

How to ensure consistent interpretation of technical requirements and specifications across all beckn protocol implementations and documentation?

# Solution

Implement standardized keyword definitions based on RFC 2119 that provide clear, unambiguous meaning to requirement levels in technical specifications.

# Implementation Details

## Definitions

### MUST

The term "MUST" implies an absolute requirement.

### MUST NOT

The term "MUST NOT" indicates an absolute prohibition.

### REQUIRED

The term "REQUIRED" is synonymous with "MUST".

### SHALL

The term "SHALL" is equivalent to "MUST".

### SHALL NOT

The term "SHALL NOT" is equivalent to "MUST NOT".

### SHOULD

The term "SHOULD" indicates a strong recommendation.

### SHOULD NOT

The term "SHOULD NOT" indicates a strong recommendation against.

### RECOMMENDED

The term "RECOMMENDED" is synonymous with "SHOULD".

### MAY

The term "MAY" indicates that an item is truly optional.

### OPTIONAL

The term "OPTIONAL" is synonymous with "MAY".

# Examples

## Examples and Correct Usage

In this section, we provide examples that demonstrate the correct usage of the key words defined in this document. The examples are related to a hypothetical Beckn Application Platform (BAP) that interacts with a Beckn Provider Platform (BPP) using beckn protocol APIs.

### Example 1: Using "REQUIRED" and "MUST"

- REQUIRED. The BPP MUST implement the `search` endpoint to receive an `Intent` object sent by BAPs.
- REQUIRED. The BPP MUST return a catalog of products on the `on_search` callback endpoint specified in the `context.bpp_uri` field of the `search` request body.
- REQUIRED. Any provider-related information like `name`, `logo`, `short_desc` MUST be mapped to the `Provider.descriptor` schema.
- REQUIRED. If the BPP does not want to respond to a `search` request, it MUST return an `ack.status` value equal to `NACK`.

### Example 2: Using "RECOMMENDED" and "SHOULD"
- RECOMMENDED. Upon receiving a `search` request, the BPP SHOULD return a `Catalog` that best matches the `Intent`. This can be done by indexing the catalog against the various probable paths in the `Intent` schema relevant to the use case.

# Recommendations

[Recommendations section to be added with best practices for using technical keywords]

# Acknowledgements

The authors would like to thank the following people for their support and contributions to this document. 

* Pramod Varma (Beckn Foundation)
* Sujith Nair (Beckn Foundation)
* Venkataramanan Mahadevan (Humbhionline)
