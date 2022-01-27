# Creating-Pub-Sub-Enabled Network


## ID: 
BECKN-RFC-005

## Draft ID
Draft-01

## Title:
Creating a Pub-sub enabled network.

## Category:
Network

## Status:
Protocol Draft

## Published on:
January 21, 2022

## Expires on:
April 05, 2022 or Date of publication of next draft which ever is earlier

## License:
CC-BY-ND

## Authors:
1. Venkatraman Mahadevan : venky@humbhionline.in

## Reviewers:
1. Sujith Nair : sujith@becknfoundation.org
2. Pramod Varma : pramod@ekstep.org
3. Ravi Prakash : ravi@becknfoundation.org


# Introduction
Pub Subscribe is a popular industry standard where events are published by _publishers_ to a message queue on specific topics. _Subscribers_ listening to specific topics/topic wildcards, on the queue are notified of the event. _Subscribers_ typically take actions on these events asyncronously and go back to listening for more events of interest.

The Beckn protocol as on Jan 21 2021 has been documented according to openapi spec version 3.0.0. Open Api spec, which is primary for synchronous communication over http. As Beckn is architected fundamentally to be for async communication, It was felt that a pub-sub mechanism and probably documenting through Async Api Spec would be better suited. 

# The experiment.
In [Beckn-One](https://github.com/venkatramanm/beckn-portal) (which is a reference network for Beckn applications), the following experiment was conducted. 

1. A system wide open message broker was made available for BAPs and BPPs registered on the network. (nats.io and  hivemq were tried out)
2. Topics via which communication was enabled were designed according to the following pattern

		ROOT/[Country]/[City]/[domain]/[action]/[intended_subscriber_id]/[transaction_id]/[message_id] (in hive mq) 
		AND 
		ROOT.[Country].[City].[domain].[action].[intended_subscriber_id].[transaction_id].[message_id] (in nats.io) 
		
		*Note*
		
		1. Topic level separators, single level wild cards and multilevel wild cards are different by brokers
		2. For Search requests the intended_subscriber_id  field was always "all" in BAP and BPP. 
		3. Special characters like "/" in the fields would need to be escaped so that they are not confused with level separator. For uniformity, we replaced all broker specific special characters by strings "_separator_", "_single_level_wild_card_" and "_multi_level_wild_card_" respectively
		
1. Sandbox BAP in beckn-one published a **Cloud event** to the complete  topic with no wild card. 
2. Humbhionline BPP was listening to multiple topics. Some of which were complete topic and some were wild cards. 
		
		Extract from Humbhionline  logs. 
		================================
		Subscribed to topic ROOT.*.*.nic2004:52110.confirm.mandi_separator_succinct_separator_in.>
		Subscribed to topic ROOT.*.*.nic2004:52110.cancel.mandi_separator_succinct_separator_in.>
		Subscribed to topic ROOT.*.*.nic2004:52110.init.mandi_separator_succinct_separator_in.>
		Subscribed to topic ROOT.*.*.nic2004:52110.search.all.>
		Subscribed to topic ROOT.*.*.nic2004:52110.select.mandi_separator_succinct_separator_in.>
		Subscribed to topic ROOT.*.*.nic2004:52110.update.mandi_separator_succinct_separator_in.>
		Subscribed to topic ROOT.*.*.nic2004:52110.track.mandi_separator_succinct_separator_in.>
		Subscribed to topic ROOT.*.*.nic2004:52110.status.mandi_separator_succinct_separator_in.>
	
5. On firing a test search api from the beckn-one bap, a payload was pushed to the topic ROOT.IND.std080.nic2004:52110.search.all.[a_txn_id].[a_message_id]
 
5. Humbhionline's BPP picked up the search request from the wild card topic subscription (ROOT.\*.*.nic2004:52110.search.all.>). Processed it asyncronously and pushed the response payload to the on_search queue  being listened to by the beckn-one bap. 

6. Beckn One bAP was subscribed to the following topics 

		Extract from Beckn-One Logs
		============================
		Subscribed to topic ROOT.*.*.nic2004:52110.on_search.beckn-one_separator_succinct_separator_in_separator_nic2004:52110_separator_BAP.>
		Subscribed to topic ROOT.*.*.nic2004:52110.on_select.beckn-one_separator_succinct_separator_in_separator_nic2004:52110_separator_BAP.>
		Subscribed to topic ROOT.*.*.nic2004:52110.on_init.beckn-one_separator_succinct_separator_in_separator_nic2004:52110_separator_BAP.>
		Subscribed to topic ROOT.*.*.nic2004:52110.on_confirm.beckn-one_separator_succinct_separator_in_separator_nic2004:52110_separator_BAP.>
		Subscribed to topic ROOT.*.*.nic2004:52110.on_track.beckn-one_separator_succinct_separator_in_separator_nic2004:52110_separator_BAP.>
		Subscribed to topic ROOT.*.*.nic2004:52110.on_cancel.beckn-one_separator_succinct_separator_in_separator_nic2004:52110_separator_BAP.>
		Subscribed to topic ROOT.*.*.nic2004:52110.on_update.beckn-one_separator_succinct_separator_in_separator_nic2004:52110_separator_BAP.>
		Subscribed to topic ROOT.*.*.nic2004:52110.on_status.beckn-one_separator_succinct_separator_in_separator_nic2004:52110_separator_BAP.>
		Subscribed to topic ROOT.*.*.nic2004:52110.on_rating.beckn-one_separator_succinct_separator_in_separator_nic2004:52110_separator_BAP.>
		Subscribed to topic ROOT.*.*.nic2004:52110.on_support.beckn-one_separator_succinct_separator_in_separator_nic2004:52110_separator_BAP.>
		
1. Data in the **Cloud Event** contained the regular beckn json payload as bytes. and the http headers (Authorization etc) were passed as Extension attributes on the Event)
2. 
# Observations
1. There was no ACK or NACK. Just the message was pushed successfully into the queue with message broker api.
	1. Ack and Nack in http implementation was for signature validations. Now this feedback is not being provided. no response could mean many things,
		1. Validation Failures, 
		2. Processing Errors
		3. Nothing to return.
2. Response times were a bit fast than http as there was no need for connections to be created each time. The queue was always connected. 
3. Cloud event serialization and deserialization needed to be done with content_type of "application/octet-stream" (When we tried as application/json, the jackson library used by cloud events would unescape and escaped forward slash. Meaning "\/" became "/" ). This caused payload tampering and signature verification failed. However once content_type was marked as octet-stream, jackson didnot get an oppurtunity to apply over intelligence and corrupt the payload!! 



# Conclusions, 
1. Pub sub is workable. We can start working on the Async  Api Specification..
2. Network will need to decide what broker to use and how permissioning may be done.

# Further investigations 
2. Need to figure out how we need to control the permissions of the topic. it is possible to do using some user/password or other schemes but need to find what makes sense and is easy to implement at network level. 


# How Can some one try out the pub sub gateway of beckn-one. 
1. You can mark the apitest on Beckn-One as 'via queue'. and the Sandbox tool would put the payload in an appropriate queue. 
2. Your BPP/BAP need to listen on appropriate queues to get the messages. 	
3. You would need  to support the queue based subscription as another mechanism to receive messages other than the http connection so that existing functionality is also supported.

 




