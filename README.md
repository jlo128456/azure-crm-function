# Azure CRM Function App

Live Azure Function App deployed to Australia East — built as part of Microsoft Azure skill development.

## Live endpoint
https://jlo128456crm-f5hvczhrh0dcbqg5.australiaeast-01.azurewebsites.net/api/job-status?job_id=JOB-001

## What it does
HTTP trigger function that returns job status by job_id — mirrors the integration pipeline pattern from my production CRM (Prefect Agencies Job Management System).

## Tech stack
- Azure Function App (Consumption plan)
- Node.js / JavaScript
- Deployed via Azure Portal
- Region: Australia East

## Example response
{
  "job_id": "JOB-001",
  "status": "in_progress",
  "technician": "Jeffrey Lo",
  "venue": "Demo Site - Brisbane",
  "created_at": "2026-06-04T09:11:14.000Z",
  "source": "Azure Function App - jlo128456crm"
}

## Context
Built to demonstrate Azure Function App skills transferable to Microsoft ecosystem development.
Equivalent pattern to Azure Logic Apps and API Management integration pipelines.

## Related projects
- [Job Management CRM](https://padigital.com.au) — live production SaaS application
- [GitHub](https://github.com/jlo128456)
