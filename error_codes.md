# Beckn Error Codes

## Response Specific Error Codes
| Code                          | Message                         | Description                                            |
|-------------------------------|---------------------------------|--------------------------------------------------------|
| NOERRS                        | No errors found                 | Success                                                |
| INVACT                        | Invalid action                  | Returned when an invalid Beckn action is called        |
| INVAUT                        | Invalid Auth                    | Authorization failed due to invalid token or signature |
| TIMOUT                        | Request timeout                 | Request has timed out                                  |
| VERNSP                        | Version not supported           | Current schema version is not supported                |
| VERDEP                        | Deprecated version              | Current schema version is deprecated                   |
| TOKEXP                        | Token expired                   | Token expired. This requires the token to be refreshed |
| PRTRES                        | Partial Response                | Partial response. Used for Lazy loading                |
| ENDRES                        | End of Response                 | End of response. Used in Lazy loading                  |
| INVDOM                        | Invalid Domain                  | When specified domain is not supported                 |

## Policy Specific Error Codes
| Code                          | Message                         | Description                                            |
|-------------------------------|---------------------------------|--------------------------------------------------------|
| LOCNAL                        | Location not allowed            | When request is outside the policy coverage area       |
| TIMNAL                        | Time not allowed                | When request is outside the policy coverage duration   |
| SERNAL                        | Service not allowed             | When service not allowed due to policy restrictions    |

## Field Specific Error Codes
| Code                          | Message                         | Description                                            |
|-------------------------------|---------------------------------|--------------------------------------------------------|
| REQFME                        | Required field missing or empty | When a required field is missing, empty or null        |
| INVPAT                        | Invalid path                    | Path to field not found                                |
| EXTNNA                        | Extension not allowed           | Returned when a non-extensible object is extended      |
| FMTERR                        | Format error                    | When field is not as per specified format              |
| RVALNA                        | Rvalue not allowed              | Returned when an RHS value is not allowed              |
| LVALNA                        | LValue not allowed              | Returned when an LHS value is not allowed              |
| NINDOM                        | Not in domain                   | When a field is not part of a domain                   |
| LIMEXD                        | Limit exceeded                  | When array limit exceeds allowed length                |