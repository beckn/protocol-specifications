# Document Details
## Supported Protocol Version

TODO


## This version

TODO


## Latest published version

TODO


## Latest editor's draft

TODO

## Stress Test report

TODO

## Implementation report

TODO


## Editors
Ravi Prakash (Beckn Foundation)


## Authors
Ravi Prakash (Beckn Foundation)


## Feedback

Issues: TODO

Discussions : TODO

PRs : TODO


## Errata

No Errata exists as of now


# Context

Beckn protocol is a generic transaction protocol that allows any producer and consumer to interact and perform digitally signed transactions via a standard set of APIs. The schema of beckn has been abstracted to a level that allows any real-world entity to be represented as a generic object. 

Fundamentally, all transactions are the same according to beckn protocol. But practically, things are somewhat different. Sometimes, interacting entities (a.k.a Network Participants) need to send additional information related to various real-world entities to comply with policies and conventions governing the domain, network or the region of operation. Strictly speaking, this information may not be necessary to perform a transaction, but to allow an element of trust and convenience to be associated with a transaction.

A retailer selling fast moving consumer goods might be legally obligated to send nutritional information, manufacturer details, food certification details, and other relevant information related to the products they are selling. On the other hand, consumers might want to narrow their search by sending specific information about the product they want. 

A car rental provider might want to send additional information on the make, model, variant, and other features of a car that might be useful to the customer to make a decision. It is also useful to the provider to provide faster and better search results if this additional information was sent by the customer while searching for the right car to rent. 

Similarly, a hospitality service provider may want to transmit additional information related to a room like AC/Non-AC, WiFi availability, Breakfast included, etc to allow the customer to choose the right room for themselves.

As you can see from the above examples, the above information is not strictly necessary for an order to be created. But rather as metadata for display purposes, grouping, and filtering at the consumer’s end; and for enabling search optimization at the provider’s end.


# Problem

How to transmit extended metadata related to a transaction in beckn protocol without breaking interoperability across implementations.


# Solution

Beckn protocol defines three schemas, namely, **Tags, TagGroup **and** Tag**, that allow groups of key-value pairs to be transmitted between network participants as metadata. Let us look at them in more detail.


## The **Tags** schema

The Tags schema is an array of TagGroup objects. This contains all the extended metadata about the container object. The schema is represented below


```
components:
   schemas:
     Tags:
       description: An array of tag groups. This object contains all the extended metadata about the container object. This can be added to any schema to carry extended metadata.
       type: array
       items:
         $ref: "#/components/schemas/TagGroup"
```


The Tags schema is explicitly referenced in the following schemas.

* Category.tags
* Contact.tags
* Fulfillment.tags
* Intent.tags
* Item.tags
* Person.tags
* Provider.tags
* Order.tags

However, this can be added to _any_ schema to carry extended metadata under the reserved keyname “tags”.


## The **TagGroup** Schema

The TagGroup schema defines a key-value set that can be listed under a common heading. Examples of key-value sets are Nutritional Information, Technical Specifications, Manufacturer Information, etc. Each of these headings contain a set of key-value pairs that contain additional metadata specific to that heading. For example, the Tag Group named “Nutritional Content” might contain a key-value set containing _kcal = 100, carbohydrates = 11g, protein = 0.2g, fat = 0.11g,_ etc. Similarly, a Tag group named “Technical Specifications” for a mobile phone product may contain a key-value set containing _RAM = 12GB, Display Size = 6.5in, Weight = 128g, Processor = Snapdragon 855,_ and so on. 

The TagGroup schema is represented as shown below,

```
 components:
   schemas:
     TagGroup:
       description: A collection of tag objects with group level attributes
       type: object
       properties:
         code:
           description: The machine-readable name of the tag group 
         display:
           description: Indicates the display properties of the Tag Group. If display is set to none, then the group will not be displayed. If it is set to block, it should be displayed as a separate block.
           type: string
           enum:
             - none
             - block
           default:
             - block
         name:
           description: A human-readable string describing the heading under which the tags are to be displayed.
           type: string
         list:
           description: An array of Tag objects listed under this group
           type: array
           items:
             $ref: "#/components/schemas/Tag"
```


As you can see, the TagGroup is of type “object” contains four properties,


1. **code**: This contains a machine-readable name of the group. 
2. **display**: This indicates whether a particular TagGroup is for display purposes. It has been modeled after the CSS “display” property. If it is equal to block, then the respective tag group has to be rendered as a block of key-value pairs. If it is none, then this block should not be rendered and is for internal consumption between platforms only.   
3. **name**: This contains the name of the group like “Product Information”, “Technical Specifications”, etc
4. **list** : this is an array of Tag objects. (see next section)

## The **Tag** Schema

The tag schema contains a key-value pair containing the actual extended metadata to be communicated. 

The Tag schema is shown below.


```
 components:
   schemas:
     Tag:
       description: A simple read-only key-value store which is used to contain extended metadata for search optimization, recommendations, and general information display purposes. Tags are read-only can cannot be changed once set.
       type: object
       properties:
         code:
           description: The machine-readable name of the tag. Beckn protocol will reserve certain keywords from being re-defined in any namespaces.
           type: string
         name:
           description: The human-readable name of the tag. This set by the BPP and rendered as-is by the BAP
           type: string
         value:
           description: The value of the tag
           type: string
```


As you can see, the Tag schema has the following properties



1. **key** : The machine-readable name of the tag. This is generally a standard value that must be mutually agreed at a network level.  
2. **name**: The display name of the key. This is non-standard and can be set by the creator. For example, there could be two providers who sell mobile phones. One of them 
3. **value** : This contains the associated value of the key

The **Tag** schema is referenced in the **TagGroup** schema in its property - “list”.


# Recommendations

This section contains recommendations for entities using the Tag schema.  


### For BPPs

1. BPPs must group various key-value pairs under a common 
2. BPPs must mandatorily send the tags that have been mandated by the network policy
3. The value of the “key” field is recommended to be in the snake-case format. 
4. Non-standard tags must be prefixed by a namespace defined by the creator of the tags. To ensure namespace uniqueness, it is recommended that the namespace contain the FQDN of the creator of the tag. 
5. BPPs are recommended index their catalog, carts and order books using these tags to allow better searchability 


### For BAPs

1. BAPs must render or not render the tags according to the “display” property of its parent tag group. 
2. BAPs must render the tags that have been mandated by the network policy
3. BAPs can also use these tags to create recommendations or allow comparisons between items basis a specific property
4. It is recommended that BAPs have a “Report” feature that allows a user to report missing attributes. 


### For Network Facilitators

1. Certain Tag keys can be mandated to be sent by BPPs to enable compliance to statutory laws
2. Certain Tag names can also be standardized to enable BAPs to provide consistent customer experience. 
3. Certain Tag groups can be mandated to be hidden or rendered by BAPs
4. Network facilitators should refer to standard supported tags maintained by domain-specific working groups when creating tag lists. 
5. Tags not found in lists maintained by domain-specific working groups, should be namespaced with a unique network level identifier, usually the FQDN of the network facilitator. 


### For Domain-specific Working Groups

1. Domain-specific working groups should aggressively create and actively maintain an exhaustive list of standard keywords under various categories and subcategories that can be referenced by network facilitators


## Reserved Keywords

Beckn protocol reserves some values for the “key” property of the Tag schema. These values are

1. **seo** : This indicates the corresponding value is for search optimization. BAPs frequently send this as part of the Intent object
2. **url**: This indicates that that corresponding value is a clickable URL
3. **lang**: Contains a spoken language code


## Recommendations

### For BPPs

* In the Item.tags array, BPPs must send all the read-only metadata associated with an Item in the tags array. 
* Any network-level category codes must be sent in the tags array
* BPPs can use network-level standard tags to index their order book
* BPPs can use network-level standard tags to index their product catalog database


### For BAPs

* BAPs can send tags in the Intent object during search to allow BPPs to search through their catalog faster
* BAPs can use the Item.tags array to display additional information about the item like statutory fields.


### For Network Facilitators

* Network Facilitators should publish a list of supported Tags with their namespace, key, and hidden properties that BAPs and BPPs can use


# Concrete Examples

### Example 1: A retail domain-specific working group wants to publish a set of standard tags for various categories of product.  
TODO

### Example 2: A network facilitator with domain as examplenetwork.org wanted to mandate a retail-specific tag called country_of_mfg (Country of manufacture) to be sent as part of the Item. The network facilitator’s domain name is mynetwork.org. The following fields are mandated to be shown whenever packaged goods are being sold. 
TODO

It will first check with the tag list maintained by the local retail working group. If it finds the tag listed, it will simply publish that tag with a link to the source tag list. If it doesn’t find the desired tag listed, it will simply namespace and publish it as @examplenetwork/org/country_of_origin

### Example 3: A packaged food product needs to be sent in response to a search request. The network policy states that product information displayed on a BAP app must be in compliance with the statutory laws of the region. 

* nutritional_info
* additives
* ingredients
* brand_owner
* brand_owner_address

For example, if the FQDN of a network facilitator is mynetwork.org, and the key name is “fssai_license_number” then the namespace will be equal to “@mynetwork.org/fssai_license_number”. 


### Example 4: Searching for teleconsulatation services by providing symptoms and language as hindi
TODO


# Acknowledgements

The author would like to thank the following	people for their support and contributions to this document. 



1. Venkataramanan Mahadevan
2. Pramod Varma
3. Sujith Nair