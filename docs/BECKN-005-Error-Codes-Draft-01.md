# Error Codes for BPP

## ID: 
BECKN-005

## Draft ID
Draft-01

## Title:
Error Codes

## Status:
Protocol Draft

## Published on:
January 21, 2022

## Expires on:
January 20, 2023 or Date of publication of next draft which ever is earlier

## License:
CC-BY-ND

## Authors:
1. Ravi Prakash : ravi@becknfoundation.org

## Introduction
  This document outlines the error codes which must be returned by a BPP. 

  ## Error Codes
  |**Code**|**Message**|**Description**|
  |---|---|---|
  |30000|Invalid request error|Generic invalid request error|
  |30001|Provider not found|When BPP is unable to find the provider id sent by the BAP|
  |30002|Provider location not found|When BPP is unable to find the provider location id sent by the BAP|
  |30003|Provider category not found|When BPP is unable to find the provider category id sent by the BAP|
  |30004|Item not found|When BPP is unable to find the item id sent by the BAP|
  |30005|Category not found|When BPP is unable to find the category id sent by the BAP|
  |30006|Offer not found|When BPP is unable to find the offer id sent by the BAP|
  |30007|Add on not found|When the BPP is unable to find the add on id sent by the BAP|
  |30008|Fulfillment unavailable|When BPP is unable to find the fulfillment id sent by the BAP|
  |30009|Fulfilment provider unavailable|When the BPP is unable to find fulfilment provider id sent by the BAP|
  |30010|Order not found|When the BPP is unable to find the order id sent by the BAP|
  |30011|Invalid cancellation reason|When the BPP is unable to find the cancellation reason in cancellation_reason_id|
  |30012|Invalid update_target|When the BPP is unable to find the update_target in the order object|
  |30013|Update inconsistency|When the BPP finds changes in the order object other than the update_target|
  |30014|Entity to rate not found|When the BPP is unable to find the entity to rate in id|
  |30015|Invalid rating value|When the BPP receives an invalid value as the rating value in value|
  |40000|Business Error|Generic business error|
  |40001|Action not applicable|When an API endpoint is not implemented by the BPP as it is not required for their use cases and a BAP calls one of these endpoints|
  |40002|Item quantity unavailable|When the BPP is unable to select the specified number in order.items[].quantity|
  |40003|Quote unavailable|When the quote sent by the BAP is no longer available from the BPP|
  |40004|Payment not supported|When the payment object sent by the BAP is not supported by the BPP|
  |40005|Tracking not supported|When the BPP does not support tracking for the order in order_id|
  |40006|Fulfilment agent unavailable|When an agent for fulfilment is not available|
  |50000|Policy Error|Generic Policy Error|
  |50001|Cancellation not possible|When the BPP is unable to cancel the order due to it's cancellation policy|
  |50002|Updation not possible|When the BPP is unable to update the order due to it's updation policy|
  |50003|Unsupported rating category|When the BPP receives an entity to rate which is not supported|
  |50004|Support unavailable|When the BPP receives an object if for which it does not provide support|

  ## Acknowledgements
  The author would like to thank the following individuals for their contributions in creating the first draft of this document (in alphabetical order):

1. Pramod Varma, Beckn Foundation
2. Sujith Nair, Beckn Foundation
3. Supriyo Ghosh, ONDC

*Copyright (c) 2022 Beckn Foundation. All rights reserved.*
