# Payments on Beckn-Enabled Networks


## ID: 
BECKN-RFC-002

## Draft ID
Draft-01

## Title:
Payments on Beckn-Enabled Networks

## Category:
Payments

## Status:
Protocol Draft

## Published on:
December 10, 2021

## Expires on:
April 05, 2022 or Date of publication of next draft which ever is earlier

## License:
CC-BY-ND

## Authors:
1. Ravi Prakash : ravi@becknfoundation.org

## Reviewers:
1. Sujith Nair : sujith@becknfoundation.org
2. Pramod Varma : pramod@ekstep.org

# Introduction
In beckn-enabled networks, payments are expected to be settled outside the network. Meaning, the implementers of beckn-enabled applications are expected to use existing payment infrastructures in their region(s) of operation to collect, process and settle payments. Since payments is a highly regulated industry across the world, different geo-political regions may choose different standards and modalities to enable digital payments.  Therefore, it is left to the implementer to templatize such region-specific payment modalities and dynamically enable them on the respective user applications of both the payer and payee, based on their respective geo-political locations. 


*it is left to the implementer to templatize such region-specific payment modalities and dynamically enable them on the respective user applications of both the payer and payee, based on their respective geo-political locations...*
==

# Payment Infrastructure on a Beckn-enabled Network

![alt text](https://github.com/beckn/protocol-specifications/blob/master/docs/images/Payment-Contract-Infrastructure.png)

# Payment Contract Agreement

On the protocol layer, only the terms of payment and the proof of payment are exchanged between the BAP and the BPP. Together, the exchange of terms; and the agreement of those terms between the payer and the payee are together known as a **Payment Contract Agreement**. 

It is important to note that beckn protocol only supports the Payment Contract Agreement. The actual act of payment and settlements like charging a card, source bank account debit and destination account remittance are performed asynchronously by integrating with the already established payment infrastructure available in the region of operation like banking APIs, payment gateway / aggregator services, payment processors, open payment protocols etc.

# Payment Contract Roles
There are two roles that participate in a payment contract agreement on beckn protocol. They are

- Payer (belongs to BAP): The entity that pays for an order.  
- Payee (belongs to BPP): The entity that receives payment for the order

# Payment Terms

The money transfer from a Payer to a Payee may go via different channels and modes. For example, a customer may use his credit card to pay the BAP say, at time T=0. The BAP may pay the BPP on T=1 as part of a bulk settlement. The BPP may pay the provider on T=2. And finally the provider may settle the money to the store owner or agent at T=3. At each stage, the intermediary may charge a small transaction fee to process that payment. In beckn protocol, only the settlement terms between the BAP and the BPP are considered. All other payment terms are outside the scope of beckn protocol and are strictly within the scope of the business partnership agreement between the respective parties. 

## BAP Terms
During a transaction, a BAP can inform the BPP its terms and conditions about collecting the payment.
- If it is going to collect the money first

## BPP Payment Terms
The BPP must send its terms to the BAP . These terms contain the following information:
- The amount that needs to be paid in a specific currency
- The payment endpoint in url format. The supported url schemes are
1.  https:// - For payment gateway endpoints
2.  payto:// - For all other endpoints as defined in [RFC8095](https://datatracker.ietf.org/doc/html/rfc8905)
- The stage of the order lifecycle when the payment must be made
- When the payment must be settled with the Payee
- Status of the payment

# Payment Contract Sequence 

![alt text](https://github.com/beckn/protocol-specifications/blob/master/docs/images/Payment-Contract.png)

# Payment Scenarios on beckn-enabled Networks

An end-to-end payment flow between a BAP and a BPP comprises of the following activities

1. Payment collection from buyer: The activity where the money is collected from the buyer
2. Payment settlement with seller: The activity where the money is settled with the seller

From the buyer to the seller, money may flow through different payment intermediaries. Each intermediary may collect a small transaction fee for processing the transaction. Some common flows are shown below

## Flow 1: BAP Collects Payment from Buyer

1. BAP informs BPP that it will be collecting the payment first and then settling it with BPP via beckn protocol APIs
2. BPP agrees to BAP’s terms and allows BAP to collect the payment from the buyer via beckn protocol APIs 
3. The BAP shows a payment interface to the buyer and the buyer makes the payment. The money gets deposited into the BAP’s bank account. This is NOT done via any beckn protocol APIs
4. BAP pays BPP : The BAP transfers the amount to the BPP’s bank account
5. BPP pays the Seller

![alt text](https://github.com/beckn/protocol-specifications/blob/master/docs/images/Payment-Settlement-Flow-1.png)

## Flow 2: BPP collects payment from Buyer

1. BAP informs BPP that it will NOT be collecting the payment and the BPP should provide the payee details for collection
2. BPP agrees to BAP’s terms and provides the payee details. These details can include a link to the BPP’s payment interface; bank account details or a virtual payment address (in case of UPI)
3. BPP renders the payment interface or other payment details on the BAP’s UI
4. The BAP user makes the payment directly to the BPP
5. BAP queries the BPP for the status of the transaction by providing the proof of payment via beckn protocol APIs
6. BPP periodically checks for transaction success from its Payment Service Provider
7. If payment is successful, the BPP returns the transaction status

![alt text](https://github.com/beckn/protocol-specifications/blob/master/docs/images/Payment-Settlement-Flow-2.png)

# Invoking the Payment Flow on the BAP app

Whenever a BAP user wants to checkout an order, the BAP should call the init action on the BPP’s API. The init message contains the final draft of the order that contains the items selected, billing and fulfillment details, or any other information the BPP might need to checkout the order. By calling this action, the BAP should expect the BPP to send the terms of payment along with any additional information needed to make the payment. 

Once the BPP receives the init message, it should send the acknowledgement that it has received the message. The BPP should then send the terms of payment by calling the on_init action on the BAP’s API. Upon receipt of the on_init API call, The BAP must invoke the payment flow on its app to collect the payment from the buyer and asynchronously settle the money with the BPP according to those terms. 

# Payment Object

| Property  | Description                                                                                                                                                             |
|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| url       | Payment endpoint URL as defined in “BAP Terms”                                                                                                                          |
| tl_method | Method to call the API URL. supported values are 1. HTTP/GET 2. HTTP/POST 3. PAYTO 4. UPI                                                                               |
| params    | Parameters associated with that URL like 1. amount 2. currency Any other parameters required to authorize the payment like 1. ifsc 2. account 3. vpa (In case of UPI)   |
| type      | Stage at which the payment should happen. Supported values are: 1. ON-ORDER,  2. PRE-FULFILLMENT,  3. ON-FULFILLMENT, 4. POST-FULFILLMENT                               |
| time      | If the type is “POST_FULFILLMENT”, this field contains the time related information at which the payment must be made                                                   |

# Runtime Payment Object Examples

## Example 1
Payment Collection by a BAP and settled at the end of the month to a bank account before 30th of November 2021

```
{
    "collected_by": "bap",
    "uri": "payto://bank/98273982749428?amount=$currency:$value&ifsc=$ifsc&message=hello",
    "method": "PAYTO",
    "type": "POST_FULFILLMENT",
    "status": "NOT-PAID",
    "params": {
        "ifsc": "SBIN0000575",
        "value": "200",
        "currency": "INR"
    },
    "time": {
        "range": {
            "end": "2021-11-30 00:00:00"
        }
    }
}
```

## Example 2
Immediate payment on order placement to a UPI Endpoint

```
{
    "uri": "payto://upi/example@upi?amount=$currency:$value&message=hello",
    "method": "PAYTO",
    "type": "ON-ORDER",
    "status": "NOT-PAID",
    "params": {
        "value": "200",
        "currency": "INR"
    }
}
```

## Example 3
Transfer to a Payment Gateway Endpoint

```
{
    "uri": "https://pay.example.com?amount=$value&cur=$currency",
    "method": "PAYTO",
    "type": "ON-ORDER",
    "status": "NOT-PAID",
    "params": {
        "value": "200",
        "currency": "INR"
    }
}
```








