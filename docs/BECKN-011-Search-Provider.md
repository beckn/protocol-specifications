# BECKN-011:Search Provider

## License:
This document is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

![Creative Commons License](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)

## Category:
Search Provider

## Published on:
July 29th, 2023

## Last Updated on:
July 4th, 2024

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

# Context
When BAP fires a `/search` on the gateway, the gateway needs to `lookup` on the registry for all available BPPS that are up and running and cascade the call on to those BPPS. These BPPS in turn do the processing and respond with an `on_search` callback to the BAP. All this takes time and is fairly repetitive. To overcome this problem on the user experience, Buyer apps have arrived at several strategies like : 
1. Cache the entire catalogue of the sellers 
2. Pull incremental changes to catalogue from sellers based on timestamping. 
3. Have BPPS push  their catalogue changes to all the BAPS on the network.


# Problem <!-- Metadata: type: Note; created: 2023-07-29 23:48:05; reads: 13; read: 2023-08-05 18:51:59; revision: 3; modified: 2023-08-05 00:29:50; -->
Every new BAP addition will cause all BPPS to start sending catalogues to that BAP also. Every new BPP addition will cause all BAPS to start caching catalogues for that BPP also. This is difficult to maintain and is error prone.  
# Solution <!-- Metadata: type: Note; created: 2023-07-29 23:48:05; reads: 94; read: 2023-08-05 18:52:50; revision: 81; modified: 2023-08-05 18:37:03; -->
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
## Changes to registry spec <!-- Metadata: type: Note; created: 2023-08-05 18:12:00; reads: 26; read: 2023-08-05 18:51:54; revision: 18; modified: 2023-08-05 18:44:22; -->
1. Would need to associate a search provider id for a BPP. 
2. Search provider as a participant on the network would require a new role "SP", have its own public key and subscriber url like all BPPS. 
3. The domain would be the same as the domain of BPPS it can serve on its infrastructure.


## Gateway Changes <!-- Metadata: type: Note; created: 2023-08-05 18:25:43; reads: 22; read: 2023-08-05 18:51:56; revision: 15; modified: 2023-08-05 18:45:41; -->
Current: 

1. On receiving /search from a BAP, 
1. BG does  a lookup on the registry to get all BPPS matching the context's domain. 
1. Relay the search intent to the BPP after affixing its signature X-Gateway-Authorization.

Changed Behavior:

1. On receiving /search from a BAP, 
1. BG does  a lookup on the registry to get all BPPS and SPS matching the context's domain. 
1. Relay the search intent to each identified SP and BPP (not associated with any SP)
 
## Changes to BPP <!-- Metadata: type: Note; created: 2023-08-05 18:45:57; reads: 11; read: 2023-08-05 18:51:49; revision: 4; modified: 2023-08-05 18:51:01; -->
1. BPPS wishing to leverage a SP for fast responses to BAPS can onboard to one of the empanelled SP of their choice.
1. Make call to SP hooks to keep catalogues current.
## Changes to BAP <!-- Metadata: type: Note; created: 2023-08-05 18:51:46; reads: 7; read: 2023-08-05 18:54:09; revision: 4; modified: 2023-08-05 18:54:04; -->
1. Implement `on_collective_search` api. 
1. loop through the array in the payload and process each `on_search` request as usual. 

# Recommendations For Network <!-- Metadata: type: Note; created: 2023-07-29 23:48:05; reads: 16; read: 2023-08-05 18:57:52; revision: 14; modified: 2023-08-05 18:57:52; -->
1. Include SP specification into BG specification so that an additional network hop may be avoided
1. Cost of SP can be included in gateway fees. 
  
# Concrete Examples <!-- Metadata: type: Note; created: 2023-07-29 23:48:05; reads: 3; read: 2023-08-05 00:15:12; revision: 1; modified: 2023-07-29 23:48:05; -->


Examples to be documented here.


# Acknowledgements <!-- Metadata: type: Note; created: 2023-07-29 23:48:05; reads: 3; read: 2023-08-05 00:15:13; revision: 1; modified: 2023-07-29 23:48:05; -->

The author would like to thank the following people for their support and contributions to this document. 

1. Ravi Prakash
2. Pramod Varma
3. Sujith Nair
