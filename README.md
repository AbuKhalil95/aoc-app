# Agents of Clouds Assignment App

Clone and run `npm install`, copy `.env.example` to `.env` and fill in the correct credentials plus a secret for JWT tokens.

Run the app with `npm start`.

## Problem Domain

Design and develop a solution that will allow the users ( Buyers and Sellers ) to book appointments ahead of time.

## Specifications

- Web App (buyer):
  - User should be able to view list of sellers. (Get all sellers)
  - User should be able to search sellers.  (Get one seller where name is like search)
  - User should be able to request to book and appointment. (Create new appointment with buyer and seller ID)

  
- Web App (seller):
  - User should be able receive appointment requests. (Find all appointments with seller ID)
  - User should be able to accept/reject appointment request. (Update appointment with ID to accepted)

## Possible Users

  - Buyers: Joe, Waren, Bill, Sara.
  - Sellers: Biden, Buffet, Gates

## Features

  - Ability to login with the name, automatic reroute.
  - As buyer, ability to view list of sellers, schedule appointments by day, see status, wait for approvals and search available sellers by name (press enter).
  - As seller, ability to view requests from buyers, approve appointments, and update satus.

## Possible Suggestions

- Work could use more refactor on the frontend, using more custom hooks and reuseable components.
- Backend status update should be enum.
- Multiple TODO's that expresses certain possible changes.
## Proposed Schema

![Proposed Schema](basic_api_model.png)