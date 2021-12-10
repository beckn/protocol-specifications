# Beckn Protocol Communication

## ID: 
BECKN-RFC-003

## Draft ID
Draft-01

## Title:
Beckn Protocol Communication

## Category:
Communication

## Status:
Protocol Draft

## Published on:
December 10, 2021

## Expires on:
December 10, 2021 or Date of publication of next draft which ever is earlier

## License:
CC-BY-ND

## Authors:
1. Ravi Prakash : ravi@becknfoundation.org

## Reviewers:
1. Sujith Nair : sujith@becknfoundation.org
2. Pramod Varma : pramod@ekstep.org

# Abstract

Communication on beckn enabled networks is server-to-server. Server-to-server means that communication between any two systems on a beckn network does not involve the client application. The client is free to render the data in whatever form chosen by the product. Secondly, all communication is asynchronous. Asynchronous API calls do not block (or wait) for the API call to return from the receiver server in the same session. Instead, an immediate acknowledgment is sent to the sender server in the same session and the actual response from the receiver server is in the form of a callback API call to the sender server. The above two features provide a remarkable advantage as all sorts of innovations are possible in the application layer due to the experience layer being unbundled from the session and presentation layer of the application.

# Introduction
A beckn enabled network has multiple entities communicating with each other via standard protocol APIs. The following types of communication are possible.

1. BAP and BG
2. BAP and BPP
3. BG and BPP
4. BAP and Registry
5. BPP and Registry
6. BG and Registry

All API calls between any two entities on the beckn network are asynchronous. Meaning, an API call from a BAP server (sender) to a BPP server (receiver) does not expect an informational response from a BPP in the same session. The immediate response in the same session is merely an acknowledgement or ACK which basically means, “_Hey, I have received your request and it looks okay during validation of the input. Let me call you back when I have the details you need_”. The actual response is sent later in the form of a standard callback API which the sender is required to implement. 

# Communication Protocol Between 2 Entities

The sequence diagram of a typical beckn protocol API is shown in Figure 1. For example, let’s say X is the sender and Y is the receiver, and the API being called is **search.**

In most cases, the sender will call the API first and the receiver will respond immediately with an ACK and close the session. After an arbitrary period of time (which is dependent on the processing of the message), the receiver will respond with an API callback to the sender. The name of the callback API is the name of the sender API with an “on_” prefix. For example, if the request API is called “**search**” then the associated callback API will be “**on_search**”.

<figure>
<img src="https://github.com/beckn/protocol-specifications/blob/master/docs/images/Async-Communication.png">
<figcaption align = "center"><b>Figure 1: </b></figcaption>
</figure>

# Communication Protocol for Search Via Beckn Gateway

Most communication in a beckn enabled network involves two entities. But sometimes, an intermediate entity like a Beckn Gateway (BG) is involved. In those cases, the flow of communication should be as follows.

If the address of the BPP is not specified in the context of the API call, then the BAP should call the BG and the BG may multicast this API to multiple BPPs. 
The BPPs synchronously respond with ACKs. The BPPs then asynchronously call the **on_search** API which is sent back to the BAP. 

<figure>
<img src="https://github.com/beckn/protocol-specifications/blob/master/docs/images/Search-Multicast.png">
<figcaption align = "center"><b>Figure 2: </b></figcaption>
</figure>

# Communication Protocol for Search Via Beckn Gateway with Registry Lookup

Sometimes the BG may query a Registry via the **lookup** API to get the BPP addresses and then multicast the message to the BPPs. See Figure 3.
<figure>
<img src="https://github.com/beckn/protocol-specifications/blob/master/docs/images/Search-Multicast-with-Reg.png">
<figcaption align = "center"><b>Figure 3: </b></figcaption>
</figure>

# Communication Protocol during status updates

During the status and on_status calls, the BAP first initiates the transaction by calling **status**. The BAP responds with an **on_status **API call to the BPP just like any other beckn API. However, in the case of the **status** API call, the BPP can asynchronously send multiple **on_status** calls to the BAP after the first call. The BAP does not have to poll the BPP to get an on_status callback. See Figure 4.

<figure>
<img src="https://github.com/beckn/protocol-specifications/blob/master/docs/images/Status.png">
<figcaption align = "center"><b>Figure 4: </b></figcaption>
</figure>
