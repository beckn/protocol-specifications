# Sample: Layering Network Policy on the Specification

This document outlines a simple framework for creating network policies tailored to specific use cases.

For additional context on the Layering Network Policy, refer to [BECKN-001: Sample Layering Network Policy (Draft-01)](./BECKN-001-Sample-Layering-Network-Policy-Draft-01.md)


# Scope

It demonstrates one possible approach to constructing a Network Policy layer, intended as an illustrative guide rather than a prescriptive solution. Other approaches may also be viable depending on the specific requirements and constraints of the use case.


# Prerequisites

Readers of this document must:

1. Have knowledge of the core protocol specification 
2. Have the Swagger CLI installed.
3. Have knowledge of Open API 3.1 Specification

# Summary

In this approach the Network Policy is represented by an OpenAPI version 3.1 docuemnt. The final OpenAPI document is compiled from a set of smaller components defined in various yaml files. Each of these components represent specific rules. The compillation is done using a Swagger CLI command.

This is how the folder is strcutured:
```
<base-folder>/
    example-jsons/
        requests/
            search.yaml
            select.yaml
            ....
        responses/
            on_search.yaml
            on_select.yaml
            ....
    example-rules/
        requests/
          search/
              sub-rule-1.yaml
              sub-rule-2.yaml
              search.yaml
          select/
              select.yaml
              ....
          ....
        responses/
          on_serach/
          on_select/
          ....
        shared-rules/
            context-rules/
                context_rule-1.yaml
                context-rule-2.yaml
                context-rules.yaml
            fulfillment_rules/
                fulfillment-rule-1.yaml
                fulfillment-rules.yaml
            payment_rules/
            ....
        <template-network-policy-yaml>
        <final-network-policy-yaml>
```


# Details of each folder

## ``` example-jsons/ ```

This folder contains example request and response payload(represented by yaml syntax) which are going to be included in the final network policy document(yaml in this case). Corresponding to each eandpoint(search, select, on_search, on_select....), there is a yaml file in this directory. Each of those yaml files can have multiple examples for that particular API defined in it. Including these examples in the network policy yaml is not mandatory, but it helps in coveying the idea easily.

How a typical file looks like:

```
Search for services in the city of Bengaluru by pickup and drop location:
  value:
    context:
      action: search
      bap_id: example-bap.com
      bap_uri: https://api.example-bap.com/pilot/bap/cab/v1
      domain: nic2004:60221
      location:
        city:
          code: std:080
        country:
          code: IND
      message_id: 6743e9e2-4fb5-487c-92b7-13ba8018f176
      timestamp: '2023-03-23T04:41:16Z'
      transaction_id: 6743e9e2-4fb5-487c-92b7-13ba8018f176
      version: 1.1.0
    message:
      intent:
        fulfillment:
          stops:
          - location:
              gps: 12.923608703179461, 77.61462964117527
            type: start
          - location:
              gps: 12.9346302, 77.61533969999999
            type: end
Search by pickup and drop location with localization info:
  value:
    context:
      action: search
      bap_id: example-bap.com
      bap_uri: https://api.example-bap.com/pilot/bap/cab/v1
      domain: nic2004:60221
      location:
        city:
          code: std:080
        country:
          code: IND
      message_id: 6743e9e2-4fb5-487c-92b7-13ba8018f176
      timestamp: '2023-03-23T04:41:16Z'
      transaction_id: 6743e9e2-4fb5-487c-92b7-13ba8018f176
      version: 1.1.0
    message:
      intent:
        fulfillment:
          customer:
            person:
              languages:
              - code: en
                name: English
          stops:
          - location:
              gps: 12.923608703179461, 77.61462964117527
            type: start
          - location:
              gps: 12.9346302, 77.61533969999999
            type: end
```

## ``` shared-rules/ ```

This folder contains the rules that are applicable to multiple APIs. API specific rules (defined in example-rules/ folder) use these shared rules wherever applicable. For example, fulfillment, payment etc rules are common to multiple APIs.

How is a rules defined:
```
properties:
  message:
    properties:
      order:
        properties:
          payments:
            type: array
            items:
              properties:
                type:
                  type: string
                params:
                  type: object
                  properties:
                    transaction_id:
                      type: string
              required:
                - type
              allOf:
                - if:
                    properties:
                      type:
                        const: PRE-ORDER
                  then:
                    properties:
                      params:
                        required:
                          - transaction_id
```

## ``` example-rules/requests and example-rules/responses ```

This folder contains the actual rules of a network encoded using openAPI 3.1 specification. Again the rules are encoded using yaml. Corresponding to each Beckn API, there is a subfolder. Each of those subfolders have multiple yaml files. The API specific rules are defined in these yaml files. These files import the rules from the shared-rules/ folder whenever necessary.

This is how we combine multiple smaller rule to create rule for init requet.
```
allOf:
  - $ref: "./action.yaml"
  - $ref: "../../shared-rules/context_rules/context_rules.yaml"
  - $ref: "../../shared-rules/bap_order.yaml"
  - $ref: "../../shared-rules/fulfillment_rules/fulfillment_rules_wo_agent.yaml"
  - $ref: "../../shared-rules/payment_rules/simple_payment_rules.yaml"
  - $ref: "../../shared-rules/billing_rules.yaml"
```

## ``` <template-network-policy-yaml> ```

This is a template file which defines the core specification for a particular domain and use case. This file contains references to the examples defined under the example-jsons/ folder and the network rules defined under the example-jsons/ folder.

## ``` <template-network-policy-yaml> ```

This is the final network policy yaml file which gets autogenerated when we compile the ``` <template-network-policy-yaml> ``` file using a Swagger CLI command. This file will actually contain all the network rules and the example requests and responses for each APIs.

# Steps to compile the network policy yaml from the template file:

## Install Swagger CLI
Swagger CLI is needed to compile the final specification file. Install the swagger command line tool using npm (Note: you may need to use root privileges if installing it globally)

```
sudo npm install -g swagger-cli
```

## Use the Swagger CLI to compile the template into a final specification yaml
1. CD to the folder where your template file is present.
2. Run the Swagger CLI command. Command format is:
```
swagger-cli bundle <input-file-path> --outfile <output-file-path> --type yaml
```

&nbsp;&nbsp;&nbsp;&nbsp;The output file will have the final layer 2 configuration.

# Sample implementation of Beckn Mobility Domain.
  On-Demand-Ride use case: [Follow the link](https://github.com/rajaneeshk90/mobility-rk/tree/l2-config-sample/api/l2-config/oas-3.1/ondemandride)

# Learn the basic of the OpenAPI Specification version 3.1

Please refer [this](https://spec.openapis.org/oas/v3.1.0.html) OpenAPI documentation to learn about the OpenAPI 3.1 syntax.