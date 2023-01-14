# GSG-OnlineBanking

This is a early prototype. Some things do not work as intendet and not all features are accessible with a web interface!

## Register a new User to the System

Post JSON to the `/account/register` endpoint with the data that looks like this:

`{"pin": userPin, "uuid": userUUID}`

Example: if you want to register a user with the pin `1234` and the UUID `1a2b3c` then you post this to the server: 

`{"pin": "1234", "uuid": "1a2b3c"}`

### BOTH the PIN and the UUID must be in QUOTES!

## User want to access his account

Go with your browser to `/login/login.html` and fill in the uuid and pin field. You should the be logged in and should see your balance and a graph that shows you transaction history.

## Transactions

If someone wants to transfer money, you have to post JSON data to `/account/transaction`.

If uuid `1a2b3c` wants to send `50$` to uuid `lmao`, he posts:

`{ "fromUUID": 1a2b3c, "toUUID": lmao, "fromPIN": "1234", "amount": 68.778}`

### UUID and amount doesn"t need to be in QUOTES but fromPin does