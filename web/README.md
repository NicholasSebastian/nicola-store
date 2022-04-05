# TO DO LIST

- Payment System: Direct Transfer or Third-Party Handler?
  - Direct Transfer:
    - When a user checks-out, a new entry in the Sanity is created with status 'Waiting for Payment'. (+ Line Message)
    - The user has to submit their 'Bukti Pembayaran' to a form in a page.
    - This 'Bukti Pembayaran' is sent to our Email and Line.
    - We are to manually update the row's status in the Sanity to 'Processing'.
    - Once the product has arrived at the customer, we manually update the status to 'Finished'.
  - Third-Party Handler: Integrate their API as a checkout option.

- Account's past orders page.

- Use bcrypt to encrypt passwords.

## Smaller Stuff

- Component content from Sanity: Header categories(, newest collection) and Footer pages.
- Language toggle for header and footer elements.
- Footer social links.

- Sync Shopping Bag to database.

## Even Smaller, Less Important Stuff

- Remove the use of the 'fgFromBg' function.
- Product Page recommendations.
- Like the categories page, but for collections.
- Shipping prices from Sanity.
- Promo codes at checkout?
- Instagram posts on home screen.
- Home page pop-up.
- In-Website chat.
- Schema Markup for SEO.

## Known Bugs

- Mobile: Navigation drawer has a black thing when a link is tapped.
- iPad:   Weird CSS bug in GridLayout's overbar.

know yourself.
