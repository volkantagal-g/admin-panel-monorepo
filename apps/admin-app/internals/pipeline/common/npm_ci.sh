#!/bin/bash

node --version
aws s3 cp s3://getir-devops/npmjs/.npmrc .npmrc
# don't install husky for ci steps
npm set-script prepare ""
npm ci
