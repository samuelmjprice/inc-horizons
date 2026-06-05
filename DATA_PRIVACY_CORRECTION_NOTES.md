# Data Privacy Correction Notes

## People Data Privacy Pass
Active frontend data was corrected to avoid exposing sensitive personal or travel data.

## Kelechi Travel
Imported only safe operational fields:
- name
- travel dates
- route
- departure/arrival times
- airline
- flight number
- cabin
- baggage allowance

Excluded private/sensitive fields:
- date of birth
- age
- airline booking reference
- internal reference number
- passport details
- visa details
- rooming/private accommodation data
- private notes
- travel costs
- private passenger data

## Guest / Staff Records
- Kelechi is marked Email Needed and Company Needed.
- No private booking values were added to `content.json`.
- Guest records continue to show safe fields only.

## Active Search Terms
Active `content.json` no longer contains the explicit sensitive booking labels or values for Kelechi. Historical reports may name sensitive categories only to document that they were excluded.
