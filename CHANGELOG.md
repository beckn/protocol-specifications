# Changelog

## Core v1.0 - 31st December 2022
###  API Changes

| API Endpoint | 0.9.3 | 1.0 |
|---------|-------|-------|
| rating | Sends a single rating | Allows multiple ratings to be sent  |
| support| Returns a ref_id | Returns a **Support** object |
| on_select| Returns a few fields from **Order** object | Returns the complete **Order** object | 
| on_init | Returns a few fields from **Order** object | Returns the complete **Order** object  |
| on_rating | Returned **RatingAck** object | Returns an **XInput** object |
| on_support | Returned phone, email and url | Returns a **Support** object |


### Schema Changes

| Schema | Added  | Removed | Modified |
|--------|--------|---------|----------|
| Ack| tags| - | - | - |
| Address| - | all named fields | Changed to string ,  entities enclosing Address have address as string and also have named city , state , area_code fields pointing to corresponding object types.|
| Agent| person , contact , organization , rating|all attributes that originally existed|
| Billing | state , city , *country*  ,  *area_code*  | created_at ,  updated_at | address | 
| Cancellation|reason , addtional_description|type , ref_id , policies , reasons , selected_reason|
| Catalog| ttl | - | Removed "bpp/" prefix from attrbutes that had them  
| Category| ttl | - | tags datatype changed to TagGroup| 
| Context|location , version|core_version , city , country|
| Descriptor||symbol , audio , 3d_render|media , additional_desc|
| Domain|name , code , additional_info|-|type changed from String to object
| Error|||type - Enum restriction removed|
| Fulfillment||provider_id , person , customer.person ,  customer.contact , start , end|rateable , stops(array of FulfillmentStop) , path , tags (TagGroup)|customer type changed to point to (Customer) |
| Image|-|-|Schema changed from string to set of properties|
| Intent|-|-|tags changed from (Tags)  to array of (TagGroup)
| ItemQuantity|unitized|-|-|
| Item|parent_item_quantity ,  manufacturer , quantity , category_ids ,  fulfillment_ids ,  location_ids ,  payment_id ,  add_ons , cancellation_terms ,  refund_terms , replacement_terms ,  return_terms , xinput ,  ttl|category_id ,  location_id ,  fulfillent_id ,  |tags 
| Location|map_url , district ,  state , area_code ,  rating|station_code|
| Offer|tags|-|-|
| Order|ref_order_ids , status ,  type , fulfillments , cancellation , cancellation_terms ,  refund_terms ,  replacement_terms ,  return_terms ,  payments ,  xinput ,  tags|state , documents , fulfillment ,  payment| items  , add_ons , offers 
| Organization|descriptor , address , city , state , contact|name , cred|
| Payment|id ,  collected_by , url , params.bank_code ,  params.bank_account_number , virtual_payment_address ,  source_bank_code ,  source_bank_account_number ,  source_virtual_payment_address , tags  | tl_method , uri , params.transaction_status| type enum changed ON_ORDER to PRE_ORDER| 
| Person | id , url , age , creds , languages , skills|cred|tags
| Provider| ttl|locations.rateable | tags
| Quotation| id  , breakup[].item| |
| Rating|| feedback_form , feedback_id|
| Scalar||| value , estimated_value ,  computed_value ,  range.min , range.max - > number to DecimalValue|
| Tracking| id , location| | |
| Vehicle| wheels_count , cargo_volumne , wheelchair_access ,  code , emmission_standard| 

### New Schemas
|Name|
|-|
|CancellationTerm| 
|Credential|
|Customer|
|Fee|
|Form|
|FulfillmentState|
|MediaFile|
|Region|
|ReplacementTerm|
|ReturnTerm|
|Stop|
|Subscription|
|Support |
|Tag|
|TagGroup|
|XInput|

### Removed Schemas
|Schema|
|-|
|Dimensions| 
|Document|
|Feedback|
|FeedbackForm|
|FeedbackFormElement|
|FeedbackUrl|
|Language|
|Subscriber|
|Tags|
|Operator|
|Page|
|Policy|
|Rateable|
|RatingAck|
|Tags|
|TrackingData|


## Core v0.9.3

### 13 July, 2021

**Changes in Context schema object**
-   Removed ack from action
-   Changed feedback to rating in action enum
-   Updated description for bap_id, bpp_id, bap_uri, bpp_uri, transaction_id, message_id
-   changed ttl as type string and updated description

**Removed context object from acknowledgement responses**

**Changes to Intent schema object**
-   removed query_string
-   removed purpose

**The following were changed to message.order**
-   select request's message.selected
-   on_select request's message.selected
-   on_init request's message.initialized

**Changes to Fulfillment schema object**
-   Added provider_id
-   Removed purpose

**Updated description of Provider.id**

**Removed tl_method from Tracking schema object**

**Removed type and ref_id from Quotation schema object**

**Added category_id to the following**
-   Provider schema object
-   Intent.provider

**Changes to Payment schema object**
- Added property transaction_status
- Added property currency

### 10 August, 2021

**Fixed inconsistencies in the required properties**
Provider was removed from required in the following places :
- Order property in /select
- Order property in /init
- Order schema object

In the following places message was made the only required property :  
- /on_search
- /on_select
- /on_init
- /on_confirm
- /on_track
- /on_cancel
- /on_update
- /on_status
- /on_rating
- /on_support

### 12 August, 2021

**Added rating property to the following schema objects**
-   Item
-   Provider
-   Fulfillment

**Fulfillment and Provider have been referenced directly in the Intent schema object**

**Security schemes cleanup**
-   Added Gateway Subscriber Auth at top level security definition.
-   Removed security from individual paths.
-   Removed Signature headers
-   Updated the format of the authorization headers

### 19 August, 2021

**Added schedule to Time schema object**
Schedule schema object was added to Time

### 19 August, 2021

**Updated the rating flow**

**Added/Edited the following schema objects :**
-   **Rating**  - Edited so that the rating_category, rating value and id is present
-   **RatingAck**  - Newly created to send acknowledgement of receival of rating and feedback
-   **FeedbackForm**  - Newly created object to represent feedback form
-   **FeedbackFormElement**  - Newly created object to represent an element in a feedback form
-   **FeedbackUrl**  - Newly created object to represent feedback URL sent by a BPP
-   **Feedback**  - Object edited to hold feedback form or feedback URL

**API endpoints edited/created :**
-   **/get_rating_categories**  : Returns the allowed categories that can be rated
-   **/get_feedback_categories**  : Returns the allowed categories that can have a feedback
-   **/get_feedback_form**  : Request the BPP to get a feedback form
-   **/feedback_form**  : Get a feedback form from the BPP. Callback response of /get_feedback_form
-   **/rating**  : Uses Rating object as message
-   **/on_rating**  : Used RatingAck as message

**Made all the meta APIs async. Created the following new meta BAP APIs :**
-   POST /cancellation_reasons
-   POST ​/return_reasons
-   POST /rating_categories
-   POST ​/feedback_categories

**Added Rateable property**
A new schema object Rateable of type boolean was added.
The same was added to the following :
- Agent
- Fulfillment
- Item
- Provider
- Location array inside Provider

### October 8, 2021

**Added descriptor to Intent schema object**

### October 11, 2021

**Removed enum in rating_category**

### October 12, 2021

**Removed required**
- Removed intent required from /search
- Removed required id and location from provider object in /select
- Removed required quantity from items in /select
- Removed required items from order object in /select
- Removed required id and location from provider object in /init
- Removed required quantity from items in /init
- Removed required items and billing from order object in /init
- Removed cancellation_reason_id from /cancel
- Removed required cred from Agent schema object
- Removed required name and phone from Billing schema object
- Removed required items, billing, quote and payment from Order schema object
- Removed required quantity from items property in Order schema object
- Removed required id and location from provider property in Order schema object

### November 24, 2021

**Added fulfillment_id in Item schema object**

### December 10, 2021

**Added new Gateway Authentication scheme with deprecation notice**

### December 13, 2021

**Changed the order object in select and init call** 

### December 14, 2021

**Authorization object in fulfillment start and end**
- New schema object Authorization added
- New property authorization added to Fulfillment schema object and refers to the newly created Authorization object.

### December 22, 2021

**Added document object array in order**