# Keyword Definitions for Technical Specifications

#### CWG Working Draft - September 01, 2023

## Document Details
### This version
https://github.com/beckn/protocol-specifications/blob/release-1.x/docs/BECKN-010-Keyword-Definitions-for-Technical-Specifications.md

### Latest published version
None

### Latest editor's draft
https://github.com/beckn/protocol-specifications/blob/release-1.x/docs/BECKN-010-Keyword-Definitions-for-Technical-Specifications.md

### Implementation report
TODO

### Editors
Ravi Prakash (FIDE)

### Authors
Ravi Prakash (FIDE)

### Feedback

Issues: TODO
Discussions: TODO
PRs: TODO

### Errata
No Errata exists as of now

## Abstract

This document outlines the definitions of key words that are commonly used in technical specifications, standards, and protocols. The aim is to provide a uniform interpretation of these terms to avoid ambiguity and misinterpretation.

## Introduction

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described below. These definitions aim to ensure that the terms are understood precisely and consistently to avoid confusion in the interpretation of standards, specifications, and protocols.

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

## Examples and Correct Usage

In this section, we provide examples that demonstrate the correct usage of the key words defined in this document. The examples are related to a hypothetical Beckn Application Platforms (BAPs) that interacts with a Beckn Provider Platform (BPP) using beckn protocol APIs.

### Example 1: Using "REQUIRED" and "MUST"

- REQUIRED. The BPP MUST implement the `search` endpoint to receive an `Intent` object sent by BAPs.
- REQUIRED. The BPP MUST return a catalog of products on the `on_search` callback endpoint specified in the `context.bpp_uri` field of the `search` request body.
- REQUIRED. Any provider-related information like `name`, `logo`, `short_desc` MUST be mapped to the `Provider.descriptor` schema.
- REQUIRED. If the BPP does not want to respond to a `search` request, it MUST return an `ack.status` value equal to `NACK`.

### Example 2: Using "RECOMMENDED" and "SHOULD"
- RECOMMENDED. Upon receiving a `search` request, the BPP SHOULD return a `Catalog` that best matches the `Intent`. This can be done by indexing the catalog against the various probable paths in the `Intent` schema relevant to the use case.

## Conclusion

The definitions provided in this document are intended to clarify the interpretation of key terms used in technical specifications, standards, and protocols. Adherence to these definitions will ensure a consistent understanding and implementation of such documents.

> Note : This document is subject to change and may be updated to include additional terms or to refine existing definitions.


