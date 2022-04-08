# TO DO LIST

- Payment System
  - When a user checks-out, a new entry in Sanity is created with status 'Waiting for Payment'. (+ Line Message)
  - The user has to submit their 'Bukti Pembayaran' to a form in a page.
  - This 'Bukti Pembayaran' is sent to our Email and Line.
  - We are to manually update the row's status in the Sanity to 'Processing'.
  - Once the product has arrived at the customer, we manually update the status to 'Finished'.

- Account's past orders page.

know yourself.

## Even Smaller, Less Important Stuff

- Custom 404 and 500 page.
- Product Page recommendations.
- Like the categories page, but for collections.
- Shipping prices from Sanity.
- Promo codes at checkout?
- Instagram posts on home screen.
- Home page pop-up.
- Schema Markup for SEO.

## The Problem

The fact that there are too many different sources of data.
There isn't one single source of control.

Currently:

- Content is stored in Sanity CMS.
- User Accounts and Shopping Bag data are stored in Firestore.
- Product Inventory, Customer Orders and Newsletter registrants are stored in Google Sheets.

This works, but can be quite a pain in the ass.

Ideally, in the end, everything in Sanity should be migrated to Firestore.
Build a completely customized admin dashboard.
Then after all that is done, maybe slowly migrate Google Sheets to Firestore and the dashboard too.
