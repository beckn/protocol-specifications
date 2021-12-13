# Beckn Protocol API Specification

This folder contains the Core API specification for Beckn Protocol. It defines interoperable API endpoints for discovery, order, fulfillment and post-fulfillment actions performed between a producer and a consumer. To improve performance and scalability, some Meta APIs are also specified. All these APIs are stateless and asynchronous. 

The current format for representing these endpoints is [Open API 3.0](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md)

# Supported Actions

## Discovery Actions

### search
This action describes how a BAP can search for products and services.  

### on_search
This action describes how a BPP can publish the catalogs of its providers.  

## Order Actions

### select
This action describes how a BAP can request a quote from a BPP

### on_select
This action describes how a BPP can provide a quote to a BAP

### init
This action describes how a BAP can request the final payment terms from a BPP

### on_init
This action describes how a BPP can provide the final payment terms to a BAP

### confirm
This action describes how a BAP can request the BPP to confirm the transaction

### on_confirm
BPP confirms the transaction

## Fulfillment Actions

### status
BAP requests the latest status of a transaction

### on_status
BAP returns the latest status of a transaction

### track
BAP requests tracking details of an order

### on_track
BPP returns the tracking details of an order

### update
BAP updates an active order

### on_update
BPP returns the latest update status of the order with terms

### cancel
BAP requests the BPP to cancel a transaction

### on_cancel
BPP returns latest cancellation status of the order with terms

## Post-fulfillment Actions

### support
BAP requests support details for an active order

### on_support
BPP returns support details for an active order

### rating
BAP rates an order

### on_rating
BPP acknowledges the rating an order

## Meta Actions

### get_rating_categories
BAP requests BPP to provide all the entities that can be rated

### rating_categories
BPP sends all the entities that can be rated

### get_cancellation_reasons
BAP requests BPP to return a list of cancellation reasons

### cancellation_reasons
BPP requests BAP to return a list of cancellation reasons
