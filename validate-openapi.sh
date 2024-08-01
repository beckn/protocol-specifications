#!/bin/bash
set -e

FILES=("./api/meta/build/meta.yaml" "./api/registry/build/registry.yaml" "./api/transaction/build/transaction.yaml")

for FILE in "${FILES[@]}"; do
    if [ -f "$FILE" ]; then
        openapi lint "$FILE"  
        echo "$FILE is valid"
    else
        echo "$FILE does not exist"
        exit 1
    fi
done