# BECKN-011:Search Provider

## License:
This document is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

![Creative Commons License](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)

## Category:
Search Provider

## Published on:
July 29th, 2023

## Last Updated on:
July 8th, 2024

## History: 
Click on this [link](https://github.com/beckn/protocol-specifications/commits/core-1.2-release/docs/BECKN-011-Search-Provider.md) to view the history of changes to this document

## Issues:
To view issues related to this document, click on this [link](https://github.com/beckn/protocol-specifications/issues?q=is%3Aissue+label%3ABECKN-011)

## Discussions:
To view discussions related to this document, click on this [link](https://github.com/beckn/protocol-specifications/discussions?discussions_q=label%3ABECKN-011)

## Authors:
1. [Ravi Prakash](https://github.com/ravi-prakash-v)

## Reviewers:
1. [Sujith Nair](https://github.com/sjthnrk)
2. [Pramod Varma](https://github.com/pramodkvarma)
3. [Venkatraman Mahadevan](https://github.com/venkatramanm)

# Abstract

When BAP fires a `/search` on the gateway, the gateway needs to `lookup` on the registry for all available BPPS that are up and running and cascade the call on to those BPPS. These BPPS in turn do the processing and respond with an `on_search` callback to the BAP. All this takes time and is fairly repetitive. This document defines a new kind of participant on the network called Search Engine (or Search Provider) that can optimize search performance by maintaining current catalog information and serving search requests more efficiently.

# Scope

This document is intended for the following audience:

1. Anyone implementing beckn protocol search optimization systems
2. Network facilitators designing search infrastructure
3. BPP developers looking to optimize search performance
4. BAP developers implementing search functionality

## Prerequisites

Readers of this document must:

1. Have knowledge of the core beckn protocol specification
2. Have understanding of search systems and indexing
3. Have knowledge of beckn gateway and registry functionality

# Introduction

When BAP fires a `/search` on the gateway, the gateway needs to `lookup` on the registry for all available BPPS that are up and running and cascade the call on to those BPPS. These BPPS in turn do the processing and respond with an `on_search` callback to the BAP. All this takes time and is fairly repetitive. To overcome this problem on the user experience, Buyer apps have arrived at several strategies like : 
1. Cache the entire catalogue of the sellers 
2. Pull incremental changes to catalogue from sellers based on timestamping. 
3. Have BPPS push  their catalogue changes to all the BAPS on the network.

# Problem

Every new BAP addition will cause all BPPS to start sending catalogues to that BAP also. Every new BPP addition will cause all BAPS to start caching catalogues for that BPP also. This is difficult to maintain and is error prone.

# Solution

Have a new kind of participant on the network called Search Engine ( or if you will Search Provider).  BPPS can onboard onto any search provider of their choice. The search provider spec would ensure that BPPS can push enabled/disabled catalogue items in manageable chunks onto these search providers so that the most current catalogue is always served on the network. 

For Eg...
1. Subset of enabled items
    * Re-indexing only these added/modified items
1. Subset of disabled items
    * To remove the items from being served on the network.

When BAPS fire `search` on the bg, it is cascaded to `search providers` associated with the BPPS, rather than the BPPS themselves. If multiple BPPS use the same provider, the BG can optimally send just one `/search` request to the search provider on behalf of all its serviced BPPS. 

The Search provider would then compute `on_search` responses for each of its  BPP and fire `on_collective_search` to the BAP. The payload for this new api would contain an array of `on_search` payloads corresponding to each BPP on-boarded on the search provider. The message_id , transaction_id etc would be same in all the returned elements.

```
 [ {"context":".. bpp context", "message" : "on_search response of the bpp_"}]
```

BAPS can validate the authenticity of the search provider (Based on usual signatures) and simple loop through the payload  array and process as if each element was returned by the corresponding  bpp on their `on_search`.

** NOTE ** The search provider can make multiple `/on_collective_search` calls to a bap to chunk the payloads by bpps to avoid sending large payloads.

# Implementation Details

## Changes to registry spec

1. Would need to associate a search provider id for a BPP. 
2. Search provider as a participant on the network would require a new role "SP", have its own public key and subscriber url like all BPPS. 
3. The domain would be the same as the domain of BPPS it can serve on its infrastructure.

## Gateway Changes

Current: 

1. On receiving /search from a BAP, 
1. BG does  a lookup on the registry to get all BPPS matching the context's domain. 
1. Relay the search intent to the BPP after affixing its signature X-Gateway-Authorization.

Changed Behavior:

1. On receiving /search from a BAP, 
1. BG does  a lookup on the registry to get all BPPS and SPS matching the context's domain. 
1. Relay the search intent to each identified SP and BPP (not associated with any SP)

## Changes to BPP

1. BPPS wishing to leverage a SP for fast responses to BAPS can onboard to one of the empanelled SP of their choice.
1. Make call to SP hooks to keep catalogues current.

## Changes to BAP

1. Implement `on_collective_search` api. 
1. loop through the array in the payload and process each `on_search` request as usual.

## Recommendations For Network

1. Include SP specification into BG specification so that an additional network hop may be avoided
1. Cost of SP can be included in gateway fees.

# Examples

Examples to be documented here.

# Recommendations

[Recommendations section to be added with best practices for search provider implementation]

# Acknowledgements

The author would like to thank the following people for their support and contributions to this document. 

1. Ravi Prakash
2. Pramod Varma
3. Sujith Nair
