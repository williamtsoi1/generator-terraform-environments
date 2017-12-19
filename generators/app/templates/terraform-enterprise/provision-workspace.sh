#!/bin/sh
if [ -z $(which curl) ]
then
    echo 'Please install curl in your system and have it available in your $PATH'
    exit 1
fi
if [ -z "${ATLAS_TOKEN}" ]
then
    echo 'Please add your atlas token in the $ATLAS_TOKEN environment variable'
    exit 1
fi

curl \
  --header "Authorization: Bearer $ATLAS_TOKEN" \
  --header "Content-Type: application/vnd.api+json" \
  --request POST \
  --data @workspace-payload.json \
  https://atlas.hashicorp.com/api/v2/organizations/<%= backendAtlasOrganisationName %>/workspaces

curl \
  --header "Authorization: Bearer $ATLAS_TOKEN" \
  --header "Content-Type: application/vnd.api+json" \
  --request POST \
  --data @variable-component-payload.json \
  https://atlas.hashicorp.com/api/v2/vars

curl \
  --header "Authorization: Bearer $ATLAS_TOKEN" \
  --header "Content-Type: application/vnd.api+json" \
  --request POST \
  --data @variable-environment-payload.json \
  https://atlas.hashicorp.com/api/v2/vars