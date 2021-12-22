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
This action describes how a BPP can return a confirmed transaction

## Fulfillment Actions

### status
This action describes how a BAP can request the latest status of a transaction

### on_status
This action describes how a BPP can return the latest status of a transaction

### track
This action describes how a BAP can request tracking information of an order

### on_track
This action describes how a BPP can return the tracking information of an order

### update
This action describes how a BAP can request the BPP to update an active order

### on_update
This action describes how a BPP can return an updated order

### cancel
This action describes how a BAP can request the BPP to cancel a transaction

### on_cancel
This action describes how a BPP can return a cancelled order

## Post-fulfillment Actions

### support
This action describes how a BAP can request support information for a transaction

### on_support
This action describes how a BPP can return support information for a transaction

### rating
This action describes how a BAP can provide rating for a Rateable Entity of a BPP

### on_rating
This action describes how a BPP can acknowledge the rating provided by a BAP for a Rateable Entity of a BPP

## Meta Actions

### get_rating_categories
This action describes how a BAP requests a BPP to provide all the Rateable Entities

### rating_categories
This action describes how a BPP returns all the Rateable Entities to a BAP

### get_cancellation_reasons
This action describes how a BAP requests a BPP to provide a list of cancellation reasons

### cancellation_reasons
This action describes how a BPP returns the list of cancellation reasons to a BAP

### get_feedback_categories
This action describes how a BAP requests a BPP to provide a list of categories for which feedback can be given

### feedback_categories
This action describes how a BPP returns the list of categories for which feedback can be given

### get_feedback_form
This action describes how a BAP requests a BPP to provide a feedback form for a particular rating category and value

### feedback_form
This action describes how a BPP returns a feedback form for a particular rating category and value
