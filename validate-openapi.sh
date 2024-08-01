#!/bin/bash
set -e

FILES=("api/meta/meta.yaml" "api/registry/registry.yaml" "api/transaction/transaction.yaml")

for FILE in "${FILES[@]}"; do
    if [ -f "$FILE" ]; then
        openapi validate "$FILE"
        echo "$FILE is valid"
    else
        echo "$FILE does not exist"
        exit 1
    fi
done
