# Supported Values

## Author : 
Ravi Prakash
## Organization : 
Open Shared Mobility Foundation

## Date:
November 16, 2020

## Supported Core versions
- 0.9.1

## Abstract
This document lists the reserved ennumerated values for various keys in the objects of core schema in the **Local Retail** domain (```"domain" : "local-retail"``` ) in the region of **India** (```"country" : "ind"```)

## 1. Payment

In India, payment is possible via various modes like cash, card, bank transfer, upi etc. The ```payment.params``` object is a list of key-value pairs which provide information about the payee so that the payer can initiate the payment. The following payment objects represent various forms of payment.

**Required Values**

- transaction_id
- amount

### UPI Transactions:

**Supported Params:**

- ```vpa``` : Used in UPI transactions. Describes the virtual payment address of a payee which maps to an account known only to the payee

```
{
    ...
    "params" : [
        "amount" : "example-vpa@upi",
        "transaction_id" : "klauh9soiu3hlrhfie4",
        "vpa" : "example-vpa@upi"
    ],
    ...
}
```

### Bank Transactions: 

**Supported Params:**


- ```account``` : Bank account number. This is usually send
- ```ifsc``` : IFSC code of the bank

```
{
    ...
    "params" : [
        "amount" : "example-vpa@upi",
        "transaction_id" : "klauh9soiu3hlrhfie4",
        "account" : "32720083333",
        "ifsc" ; "SBIN000075"
    ],
    ...
}
```

## 2. Category

The ```category``` keyword is used to hierarchically organize various items in a seller's catalog. 

### Category ID

This is represented by the ```category.id``` schema. Since categories can exist at the BPP level _and_ at the provider level, the ```id``` needs to be namespaced with the correct owner of that category.

For a BPP level category, the ```id``` must be namespaced in the following format
```
"id" : "<bpp-id>/category/<category-id>
```

For a provider level category, the ```id``` must be namespaced in the following format

```
"id" : "<provider-id>@<bpp-id>/category/<category-id>
```

To differentiate between various types of categories, the categories should contain some additional info to provide context to the BAP to allow easy grouping of the items. To do that, the ```category.tags``` schema has a reserved keyword called ```type``` which is namespaced with the domain and region of the implementation. The following examples explain how various grouping keywords are represented via the category keyword.

### Category Type : Brand

#### Namespace:

```
./local-retail/ind/
```
#### Schema:
```
Category
```

#### Keyword:
```
type"
```

#### Resultant Structure
```
{
    "categories" : [
       {
           "id" : "example-bpp.com/category/dabur",
           "descriptor" : {
               "name" : "Brand"
           },
           "tags" : {
               "{namespace}/{schema}/{keyword}" : "brand"
           }
       }
    ],
}
```

#### Example:

```
{
    "categories" : [
       {
           "id" : "example-bpp.com/category/dabur",
           "descriptor" : {
               "name" : "Brand"
           },
           "tags" : {
               "./local-retail/ind/category/type" : "brand"
           }
       }
    ],
}
```
