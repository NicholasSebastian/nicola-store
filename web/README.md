# TO DO LIST

- Home page content. (Home Page schema in Sanity)
- Home page pop-up.
- Component content from Sanity: Header categories(, newest collection) (Language toggleable) and Footer pages.
- Header useEffect: if Shopping Bag gets new item added, display a popover.
- Footer social links.
- Links page. (Like linktree)

- User Authentication: Next Auth + Google Cloud Firestore.
- Header shows current logged-in / logged-out status.

- Payment System: Direct Transfer or Third-Party Handler?
  - Direct Transfer:
    - When a user checks-out, a new entry in the Google Sheets is created with status 'Waiting for Payment'. (+ Telegram Message)
    - The user has to submit their 'Bukti Pembayaran' to a form in a page.
    - This 'Bukti Pembayaran' is sent to our Email and Telegram.
    - We are to manually update the row's status in the Google Sheets to 'Processing'.
    - Once the product has arrived at the customer, we manually update the status to 'Finished'.
  - Third-Party Handler: Integrate their API as a checkout option.

## Smaller, Less Important Stuff

- Mobile view: Navigation drawer has a black thing when a link is tapped.
- Like the categories page, but for collections.
- In-Website chat.
- Weird CSS bug in GridLayout's overbar on iPad.
