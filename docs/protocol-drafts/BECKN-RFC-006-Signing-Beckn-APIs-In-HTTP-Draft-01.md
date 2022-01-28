# Signing Beckn APIs in HTTP
## Introduction
When communicating over HTTP using Beckn APIs, the subscribers need to authenticate themselves to perform transactions with other subscribers. Due to the commercial nature of the transactions, every request/callback pair is considered to be a "contract" between two parties. Therefore, it is imperative that all requests and callbacks are digitally signed by the sender and subsequently verified by the receiver.
Furthermore, it is also desirable to ensure that the message was not altered or tampered with during transit.
This document describes a way for network subscribers (BAP/BPPs) and proxy subscribers (BGs) to simultaneously add authentication and message integrity to HTTP messages by using digital signatures. How the signatures are generated and the format of those signatures is out of scope of this document and can be found in this IETF document - [Signing HTTP Messages](https://tools.ietf.org/id/draft-cavage-http-signatures-12.html).
This document specifies the algorithms used in generating the keys, how to construct the signing strings being passed in the headers. Also, it specifies clearly the format of the HTTP headers used for authenticating BAP, BPPs and BGs.

## Subscriber Authentication
The BAP and BPP subscriber is expected to send an Authorization header (as defined in [RFC 7235](https://tools.ietf.org/id/draft-cavage-http-signatures-12.html#RFC7235), [Section 4.1](https://tools.ietf.org/html/rfc7235#section-2.1)) where the "auth-scheme" is "Signature" and the "auth-param" parameters meet the requirements listed in Section 2 of [this](https://tools.ietf.org/id/draft-cavage-http-signatures-12.html) document.
The BG subscriber is expected to send a X-Gateway-Authorization header where the "auth-scheme" is "Signature" and the "auth-param" parameters meet the requirements listed in Section 2 of [this](https://tools.ietf.org/id/draft-cavage-http-signatures-12.html) document.

Below is the format of a BAP/BPP Authorization header in the typical HTTP Signature format:

`Authorization : Signature keyId="{subscriber_id}|{unique_key_id}|{algorithm}",algorithm="ed25519",created="1606970629",expires="1607030629",headers="(created) (expires) digest",signature="Base64(ed25519_sign(signing string))"`


The BG will send its signature in the X-Gateway-Authorization header in the exact same format as shown below.

`X-Gateway-Authorization:Signature keyId="{subscriber_id}|{unique_key_id}|{algorithm}" algorithm="ed25519" created="1606970629" expires="1607030629" headers="(created) (expires) digest" signature="Base64(ed25519_sign(signing string))"`

## Hashing Algorithm
For computing the digest of the request body, the hashing function will use the BLAKE-512 (2b) hashing algorithm. BLAKE is a cryptographic hash function based on Dan Bernstein's ChaCha stream cipher. For more documentation on the BLAKE-512(2b) algorithm, please go to [RFC7693](https://tools.ietf.org/html/rfc7693).

Example of [hash](https://en.wikipedia.org/wiki/BLAKE_(hash_function)#BLAKE2b_algorithm) :

`BLAKE2b-512("The quick brown fox jumps over the lazy dog") =
a8add4bdddfd93e4877d2746e62817b116364a1fa7bc148d95090bc7333b3673f82401cf7aa2e4cb1ecd90296e3f14cb5413f8ed77be73045b13914cdcd6a918`

The above hex value encoded in base64 is as below : 

`qK3Uvd39k+SHfSdG5igXsRY2Sh+nvBSNlQkLxzM7NnP4JAHPeqLkyx7NkCluPxTLVBP47Xe+cwRbE5FM3NapGA==`

## Signing Algorithm
To digitally sign the singing string, the subscribers should use the "ed25519" signature scheme.

### Example Flow (BAP <=> BG <=> BPP)

### Step 1 : BAP signs request and calls BG
Let the below be the request body in this example : 

`{"context":{"domain":"nic2004:60212","country":"IND","city":"Kochi","action":"search","core_version":"0.9.1","bap_id":"bap.stayhalo.in","bap_uri":"https://8f9f-49-207-209-131.ngrok.io/protocol/","transaction_id":"e6d9f908-1d26-4ff3-a6d1-3af3d3721054","message_id":"a2fe6d52-9fe4-4d1a-9d0b-dccb8b48522d","timestamp":"2022-01-04T09:17:55.971Z","ttl":"P1M"},"message":{"intent":{"fulfillment":{"start":{"location":{"gps":"10.108768, 76.347517"}},"end":{"location":{"gps":"10.102997, 76.353480"}}}}}}`

Let BAP’s keys be :

`signing_public_key=awGPjRK6i/Vg/lWr+0xObclVxlwZXvTjWYtlu6NeOHk=
signing_private_key=lP3sHA+9gileOkXYJXh4Jg8tK0gEEMbf9yCPnFpbldhrAY+NErqL9WD+Vav7TE5tyVXGXBle9ONZi2W7o144eQ==`

The BAP performs the following steps to create the Authorization header
1. Generate the digest of the request body using the BLAKE-512 hashing function

`b6lf6lRgOweajukcvcLsagQ2T60+85kRh/Rd2bdS+TG/5ALebOEgDJfyCrre/1+BMu5nA94o4DT3pTFXuUg7sw==`

2. Generate the created field. The `created` field expresses when the signature was created. The value MUST be a Unix timestamp integer value. A signature with a `created` timestamp value that is in the future MUST NOT be processed.

`(created): 1641287875`

3. Generate the expires field. The `expires` field expresses when the signature ceases to be valid. The value MUST be a Unix timestamp integer value. A signature with an `expires` timestamp value that is in the past MUST NOT be processed.

`(expires): 1641291475`

4. Concatenate the three values, i.e the `created`, `expires` and `digest` in the format as shown below. The below string is the signing string which the BAP is going to use to sign the request

`(created): 1641287875
(expires): 1641291475
digest: BLAKE-512=b6lf6lRgOweajukcvcLsagQ2T60+85kRh/Rd2bdS+TG/5ALebOEgDJfyCrre/1+BMu5nA94o4DT3pTFXuUg7sw==`

5. The BAP will then sign this string using it's registered signing private key via the Ed25519 Signature Scheme

7. Finally the BAP will generate a base64 encoded string of the signature and insert it into the signature parameter of the Authorization header

`cjbhP0PFyrlSCNszJM1F/YmHDVAWsZqJUPzojnE/7TJU3fJ/rmIlgaUHEr5E0/2PIyf0tpSnWtT6cyNNlpmoAQ==`

7. Finally the Authorization header will look like this. (Let's assume subscriber_id = example-bap.com, unique_key_id = bap1234)

`Signature keyId="example-bap.com|bap1234|ed25519",algorithm="ed25519",created="1641287875",expires="1641291475",headers="(created) (expires) digest",signature="cjbhP0PFyrlSCNszJM1F/YmHDVAWsZqJUPzojnE/7TJU3fJ/rmIlgaUHEr5E0/2PIyf0tpSnWtT6cyNNlpmoAQ=="`

8. Finally the BAP includes the Authorization header in the request and calls the BG API


**Note:**
1. The difference between the `created` and the `expires` field should be equal to the TTL of the request context.
2. Also, the `expires` value should not be more than the expiration time of the key used for signing the request. If the expires value appears to be going beyond the lifespan of the signing key, generate a new key and update it on the registry OR use an existing registered key with an expiry time greater than the `expires` value of the signature.



### Step 2 : BG verifies BAP signature
The BG performs the following steps to authenticate the BAP and also ensure message integrity.

1. BG gets keyId from the Authorization header

`example-bap.com|bap1234|ed25519`

2. BG splits the keyId string into subscriber ID, Unique Key ID and algorithm using the delimiter "|".
3. The keyId uses the format {subscriber id}|{unique_key_id}|{signing algorithm} . If the signing algorithm extracted from the keyId does not match the value of the algorithm parameter in the Authorization header, then the BG should return an 401 unauthorised error.
4. The keyId also contains a unique_key_id which is used when the BAP has uploaded multiple public keys to a registry OR when the same domain is being used for implementing multiple types of subscribers.
5. The BG will now look up the registry for the public key of the subscriber by sending the subscriber_id and the unique_key_id via the lookup API or by retrieving a cached copy of the subscriber's public key matching the subscriber_id and unique_key_id.It will receive the public key of the BAP :

`awGPjRK6i/Vg/lWr+0xObclVxlwZXvTjWYtlu6NeOHk=`

6. If no valid key is found, the BPP must return a NACK response with 401 Unauthorised response code.
7. BG will use the BAP's public key to verify the signature. If signature is verified, the BAP is considered to be authenticated. If not BG should return a 401 error.
8. If the signature is not verified, the BG must return a NACK response with 401 Unauthorised response code with a WWW-Authenticate header. For example, for an invalid signature, the BG must return the following:

**Headers:**

`HTTP/1.1 401 Unauthorized
WWW-Authenticate: Signature realm="example-bg.com",headers="(created) (expires) digest"
...`

**Request Body:**

`{
 "message": {
  "ack": {
"status": "NACK"
}
}
}`



### Step 3 : BG signs request before forwarding request to BPP
Let the BG’s keys be :

`signing_public_key=7YRZXVeIJ0/Va56vYgzT1Uirg6mnq3FY0MBZY9DJft0=
signing_private_key=hJ5sCmbe7s9Wateq6QAdBGloVSkLuLHWOXcRkzrMcVLthFldV4gnT9Vrnq9iDNPVSKuDqaercVjQwFlj0Ml+3Q==`

Before forwarding the request to the BPP, the BG performs the following steps to create the X-Gateway-Authorization header.

1. Generate the digest of the request body using the BLAKE-512 hashing function

`b6lf6lRgOweajukcvcLsagQ2T60+85kRh/Rd2bdS+TG/5ALebOEgDJfyCrre/1+BMu5nA94o4DT3pTFXuUg7sw==`

2. Generate the `created` field. The `created` field expresses when the signature was created. The value MUST be a Unix timestamp integer value. A signature with a `created` timestamp value that is in the future MUST NOT be processed.

`(created): 1641287885`

3. Generate the `expires` field. The `expires` field expresses when the signature ceases to be valid. The value MUST be a Unix timestamp integer value. A signature with an `expires` timestamp value that is in the past MUST NOT be processed.

`(expires): 1641291485`

4. Concatenate the three values, i.e the `created`, `expires` and `digest` in the format as shown below. The below string is the signing string which the BG is going to use to sign the request

`(created): 1641287885
(expires): 1641291485
digest: BLAKE-512=b6lf6lRgOweajukcvcLsagQ2T60+85kRh/Rd2bdS+TG/5ALebOEgDJfyCrre/1+BMu5nA94o4DT3pTFXuUg7sw==`

5. The BG will then sign this string using it's registered signing private key via the Ed25519 Signature Scheme
6. Finally the BG will generate a base64 encoded string of the signature and insert it into the signature parameter of the X-Gateway-Authorization header

`hJ5sCmbe7s9Wateq6QAdBGloVSkLuLHWOXcRkzrMcVLthFldV4gnT9Vrnq9iDNPVSKuDqaercVjQwFlj0Ml+3Q==`

7. Finally the X-Gateway-Authorization header will look like this. (Let's assume subscriber_id = example-bg.com, unique_key_id = bg3456)

`Signature keyId="example-bg.com|bg3456|ed25519",algorithm="ed25519",created="1641287885",expires="1641287885",headers="(created) (expires) digest",signature="hJ5sCmbe7s9Wateq6QAdBGloVSkLuLHWOXcRkzrMcVLthFldV4gnT9Vrnq9iDNPVSKuDqaercVjQwFlj0Ml+3Q=="`

8. Finally the BG includes the X-Gateway-Authorization header in the request and calls the BPP search API

**Note:**
3. The difference between the `created` and the `expires` field should be equal to the TTL of the request.
4. Also, the `expires` value should not be more than the expiration time of the key used for signing the request. If the expires value appears to be going beyond the lifespan of the signing key, generate a new key and update it on the registry via subscribe API OR use an existing registered key with an expiry time greater than the `expires` value of the signature



### Step 4 : BPP verifies BG signature
The BPP performs the following steps to authenticate the BAP and the BG and also ensure message integrity.

1. Get keyId from the X-Gateway-Authorization header

`example-bg.com|bg3456|ed25519`

2. Split the keyID string using the delimiter `|`. As we know, the subscriber ID is the registered domain name of the subscriber and follows the format{subdomain}.{domain}.{extension}.
3. The keyID uses the format {subscriber id}|{unique_public_key_id}|{signing algorithm} . If the signing algorithm extracted from the keyId does not match the value of the algorithm field in the X-Gateway-Authorization header, then the BPP should return an error.
4. The keyID also contains a unique_public_key_id which is used when the BG has uploaded multiple public keys to a registry OR when the same domain is being used for implementing multiple subscribers.
5. The BG will now look up the registry for the public key of the subscriber by sending the subscriber_id and the unique_key_id via the lookup API or by retrieving a cached copy of the subscriber's public key matching the subscriber_id and unique_key_id. It will get the BG’s public key :

The BG will now look up the registry for the public key of the subscriber by sending the subscriber_id and the unique_key_id via the lookup API or by retrieving a cached copy of the subscriber's public key matching the subscriber_id and unique_key_id. It will get the BG’s public key :

6. If no valid key is found, the BPP must return a NACK response with 401 Unauthorised response code.
7. BPP will use the BG's public key to verify the signature. If the signature is verified, the BG is considered to be authenticated.
8. If the signature is not verified, the BPP must return a NACK response with 401 Unauthorised response code with a Proxy-Authenticate header. For example, for an invalid BG signature, the BPP must return the following:

**Headers:**

`HTTP/1.1 401 Unauthorized
Proxy-Authenticate: Signature realm="example-bpp.com",headers="(created) (expires) digest"
...`

**Request Body:**

`{
 "message": {
    "ack": {
"status": "NACK"
}
}
}`



### Step 5 : BPP verifies BAP signature
The BPP performs the following steps to authenticate the BAP and also ensure message integrity during transit.

1. BPP gets keyId from the Authorization header.
2. BPP splits the keyID string using the delimiter `|`.
3. The keyID uses the format {subscriber id}|{unique_key_id}|{signing algorithm}. If the signing algorithm extracted from the keyId does not match the value of the algorithm field in the Authorization header, then the BPP should return an error.
4. The keyId also contains a unique_public_key_id which is used when the BAP has uploaded multiple public keys to a registry OR when the same domain is being used for implementing multiple types of subscribers.
5. The BPP will now look up the registry for the public key of the BAP by sending the subscriber_id and the unique_key_id via the lookup API or by retrieving a cached copy of the BAP's public key matching the subscriber_id and unique_key_id.
6. BG will use the BAP's public key to verify the signature. If signature is verified, the BAP is considered to be authenticated. If not BG should return a 401 error.
7. If the signature is not verified, the BG must return a NACK response with 401 Unauthorised response code with a WWW-Authenticate header. For example, for an invalid signature, the BPP must return the following:

**Headers**

`HTTP/1.1 401 Unauthorized
WWW-Authenticate: Signature realm="example-bpp.com",headers="(created) (expires) digest"
...`

**Request Body**

`{
 "message": {
    "ack": {
"status": "NACK"
}
}
}`



### Step 6 : BPP signs callback and calls BG
The BPP performs the following steps to create the Authorization header

1. Generate the digest of the request body using the BLAKE-512 hashing function.
2. Generate the created field. The `created` field expresses when the signature was created. The value MUST be a Unix timestamp integer value. A signature with a `created` timestamp value that is in the future MUST NOT be processed.
3. Generate the expires field. The `expires` field expresses when the signature ceases to be valid. The value MUST be a Unix timestamp integer value. A signature with an `expires` timestamp value that is in the past MUST NOT be processed.
4. Concatenate the three values, i.e the `created`, `expires` and `digest` in the format as shown below. The below string is the signing string which the BPP is going to use to sign the request.

`(created): 1402170695
(expires): 1402170995
digest: BLAKE-512=X48E9qOokqqrvdts8nOJRJN3OWDUoyWxBf7kbu9DBPE=`

5. Sign this string using it's registered signing private key via the ed25519 Signature Scheme.
6. Generate a base64 encoded string of the signature and insert it into the signature parameter of the Authorization header.
7. The final Authorization header will look like this. (Let's assume subscriber_id = example-bpp.com, unique_key_id = bpp5678).

`Signature keyId="example-bpp.com|bpp5678|ed25519",algorithm="ed25519",created="1641287885",expires="1641287885",headers="(created) (expires) digest",signature="hJ5sCmbe7s9Wateq6QAdBGloVSkLuLHWOXcRkzrMcVLthFldV4gnT9Vrnq9iDNPVSKuDqaercVjQwFlj0Ml+3Q=="`

9. Finally the BPP includes the Authorization header in the request and calls the BG API.



### Step 7 : BG verifies BPP signature
The BG performs the following steps to authenticate the BPP and also ensure message integrity.

1. BG gets keyId from the Authorization header.
2. BG splits the keyId string into subscriber ID, Unique Key ID and algorithm using the delimiter "|".
3. The keyId uses the format {subscriber id}|{unique_key_id}|{signing algorithm} . If the signing algorithm extracted from the keyId does not match the value of the algorithm parameter in the Authorization header, then the BG should return an 401 unauthorised error.
4. The keyId also contains a unique_key_id which is used when the BPP has uploaded multiple public keys to a registry OR when the same domain is being used for implementing multiple types of subscribers.
5. The BG will now look up the registry for the public key of the BPP by sending the subscriber_id and the unique_key_id via the lookup API or by retrieving a cached copy of the BPP's public key matching the subscriber_id and unique_key_id.
6. BG will use the BPP's public key to verify the signature. If signature is verified, the BPP is considered to be authenticated. If not BG should return a 401 error
7. If the signature is not verified, the BG must return a NACK response with 401 Unauthorised response code with a WWW-Authenticate header. For example, for an invalid signature, the BG must return the following:

**Headers**

`HTTP/1.1 401 Unauthorized
WWW-Authenticate: Signature realm="example-bg.com",headers="(created) (expires) digest"
...`

**Request Body**

`{
 "message": {
    "ack": {
"status": "NACK"
}
}
}`


### Step 8 : BG signs callback before calling BAP
Before forwarding the request to the BAP, the BG performs the following steps to create the X-Gateway-Authorization header

1. Generate the digest of the request body using the BLAKE-512 hashing function.
2. Generate the `created` field. The `created` field expresses when the signature was created. The value MUST be a Unix timestamp integer value. A signature with a `created` timestamp value that is in the future MUST NOT be processed.
3. Generate the `expires` field. The `expires` field expresses when the signature ceases to be valid. The value MUST be a Unix timestamp integer value. A signature with an `expires` timestamp value that is in the past MUST NOT be processed.
4. Concatenate the three values, i.e the `created`, `expires` and `digest` in the format as shown below. The below string is the signing string which the BG is going to use to sign the request.

`(created): 1402170695

(expires): 1402170995

digest: BLAKE-512=X48E9qOokqqrvdts8nOJRJN3OWDUoyWxBf7kbu9DBPE=`

5. The BG will then sign this string using it's registered signing private key via the ed25519 Signature Scheme.
6. Finally the BG will generate a base64 encoded string of the signature and insert it into the signature parameter of the X-Gateway-Authorization header.
7. Finally the X-Gateway-Authorization header will look like this. (Let's assume subscriber_id = example-bg.com, unique_key_id = bg3456).

`Signature keyId="example-bg.com|bg3456|ed25519",algorithm="ed25519",created="1641287885",expires="1641287885",headers="(created) (expires) digest",signature="hJ5sCmbe7s9Wateq6QAdBGloVSkLuLHWOXcRkzrMcVLthFldV4gnT9Vrnq9iDNPVSKuDqaercVjQwFlj0Ml+3Q=="`

8. Finally the BG includes the X-Gateway-Authorization header in the request and calls the BAP API.

**Note:**

1. The difference between the `created` and the `expires` field should be equal to the TTL of the request.
2. Also, the `expires` value should not be more than the expiration time of the key used for signing the request. If the expires value appears to be going beyond the lifespan of the signing key, generate a new key and update it on the registry via subscribe API OR use an existing registered key with an expiry time greater than the `expires` value of the signature.


### Step 9 : BAP verifies BG signature
The BAP performs the following steps to authenticate the BAP and the BG and also ensure message integrity.

1. Get keyId from the X-Gateway-Authorization header
2. Split the keyID string using the delimiter `|`.
3. The keyID uses the format {subscriber id}|{unique_public_key_id}|{signing algorithm} . If the signing algorithm extracted from the keyId does not match the value of the algorithm field in the X-Gateway-Authorization header, then the BPP should return an error.
4. The keyID also contains a unique_public_key_id which is used when the BG has uploaded multiple public keys to a registry OR when the same domain is being used for implementing multiple subscribers
5. The BAP will now look up the registry for the public key of the subscriber by sending the subscriber_id and the unique_key_id via the lookup API or by retrieving a cached copy of the subscriber's public key matching the subscriber_id and unique_key_id. If no valid key is found, the BPP must return
6. BPP will use the BG's public key to verify the signature. If signature is verified, the BG is considered to be authenticated.
7. If the signature is not verified, the BPP must return a NACK response with 401 Unauthorised response code with a Proxy-Authenticate header. For example, for an invalid BG signature, the BAP must return the following:

**Headers**

`HTTP/1.1 401 Unauthorized
/Proxy-Authenticate: Signature realm="example-bap.com",headers="(created) (expires) digest"
...`

**Request Body**

`{
 "message": {
    "ack": {
"status": "NACK"
}
}
}`


### Step 10 : BAP verifies BPP signature
The BAP performs the following steps to authenticate the BAP and also ensure message integrity during transit.

1. BAP gets keyId from the Authorization header
2. BAP splits the keyID string using the delimiter `|`.
3. The keyID uses the format {subscriber id}|{unique_public_key_id}|{signing algorithm} . If the signing algorithm extracted from the keyId does not match the value of the algorithm field in the Authorization header, then the BAP should return an error.
4. The keyId also contains a unique_public_key_id which is used when the BPP has uploaded multiple public keys to a registry OR when the same domain is being used for implementing multiple types of subscribers
5. The BAP will now look up the registry for the public key of the BPP by sending the subscriber_id and the unique_key_id via the lookup API or by retrieving a cached copy of the BPP's public key matching the subscriber_id and unique_key_id
6. BAP will use the BPP's public key to verify the signature. If signature is verified, the BPP is considered to be authenticated.
7. If the signature is not verified, the BAP must return a NACK response with 401 Unauthorised response code with a WWW-Authenticate header. For example, for an invalid BPP signature, the BAP must return the following:

**Headers**

`HTTP/1.1 401 Unauthorized
WWW-Authenticate: Signature realm="example-bap.com",headers="(created) (expires) digest"
...`


**Request Body:**

`{
 "message": {
    "ack": {
"status": "NACK"
}
}
}`
