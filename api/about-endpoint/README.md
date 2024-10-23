### Steps to generate beckn.json file

1. install ```json-dereference-cli```

    ```npm install -g json-dereference-cli```

2. Make sure we have api/about.json.

3. Generate verifiableCredential json from schema/credential.yaml

    ```json-dereference -s schema/Credential.yaml -o api/about-endpoint/becknVerifiableCredential.json```

4. The generate document is just a json file, to make it a json schema definition, add the below lines manually in the ```api/about-endpoint/becknVerifiableCredential.json``` at the root of the object.

    ```
    "$id": "becknVerifiableCredential",
    "$schema": "https://json-schema.org/draft/2020-12/schema"
    ```

5. Genearte beckn.json using about.json

    ```
    json-dereference -s api/about-endpoint/about.json -o api/about-endpoint/beckn.json
    ```