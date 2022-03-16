# TO DO LIST

- Home page content. (Home Page schema in Sanity)
- Home page pop-up.
- Component content from Sanity: Header categories(, newest collection) and Footer pages.
- Item component has 2 images: one default and one on hover.
- Grid Layout sorting functionality.
- User Authentication: Next Auth + Google Cloud Firestore.
- Header shows current logged-in / logged-out status.
- Payment System: Direct Transfer or Third-Party Handler?
  - Direct Transfer:
    - When a user checks-out, a new entry in the Google Sheets is created with status 'Waiting for Payment'.
    - The user has to submit their 'Bukti Pembayaran' to a form in a page.
    - This 'Bukti Pembayaran' is sent to our Email and Telegram.
    - We are to manually update the row's status in the Google Sheets to 'Processing'.
    - Once the product has arrived at the customer, we manually update the status to 'Finished'.
  - Third-Party Handler: Integrate their API as a checkout option.
- Footer social links.

## Smaller, Less Important Stuff

- Mobile view: Navigation drawer has a black thing when a link is tapped.
- Mobile view: Navigation drawer should close when navigating to a new page.
- Like the categories page, but for collections.
