#!/bin/bash
set -e

if [ -f ".env" ]; then
  export $(grep -v '^#' .env | xargs)
fi

CONTAINER="stsvengrav"

echo "Uploading resources/ to $AZURE_STORAGE_ACCOUNT/$CONTAINER..."
az storage blob upload-batch \
  --account-name "$AZURE_STORAGE_ACCOUNT" \
  --account-key "$AZURE_STORAGE_KEY" \
  --destination "$CONTAINER" \
  --source ./resources \
  --overwrite

echo "Done → https://${AZURE_STORAGE_ACCOUNT}.blob.core.windows.net/${CONTAINER}/"
