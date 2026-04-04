#!/bin/bash
set -e

APP_NAME="svengrav-web"
RESOURCE_GROUP="rg-svengrav-web"
SUBSCRIPTION_ID="68b0dd0c-4183-414d-9e25-7cf8faa43717"

if [ -f ".env" ]; then
  export $(grep -v '^#' .env | xargs)
fi

echo "Building..."
npm run build

echo "Copying SWA config..."
cp static/staticwebapp.config.json dist/

echo "Deploying to Azure Static Web Apps..."
swa deploy ./dist \
  --app-name "$APP_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --subscription-id "$SUBSCRIPTION_ID" \
  --env production

BUILD_NUMBER=$(git rev-list --count HEAD)
TAG="v${VITE_APP_VERSION}+${BUILD_NUMBER}"

echo "Tagging release as $TAG..."
git tag "$TAG"
git push origin "$TAG"

echo "Done → https://www.svengrav.de ($TAG)"
