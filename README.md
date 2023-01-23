# GSG-OnlineBanking

This is an early prototype. Some things do not work as intended and not all features are accessible with a web interface!

## Register a new User to the system

Post JSON to the `/account/register` endpoint with the data that looks like this:

`{"PIN": userPIN, "UUID": userUUID}`

Example: If you want to register a user with the PIN `1234` and the UUID `1a2b3c` then you post this to the server: 

`{"PIN": "1234", "UUID": "1a2b3c"}`

#### BOTH the PIN and the UUID must be in QUOTES!

## User wants to access their account

Go with your browser to `/login/login.html` and fill in the UUID and PIN field. You should the be logged in and should see your balance and a graph that shows your transaction history.

## Transactions

If someone wants to transfer money, you have to post the JSON data to `/account/transaction`.

If UUID `1a2b3c` wants to send `50$` to UUID `lmao`, he posts:

`{ "fromUUID": 1a2b3c, "toUUID": lmao, "fromPIN": "1234", "amount": 68.778}`

#### UUID and amount don't need to be in QUOTES but fromPIN does

## TODO'S

- [ ] Add tests to literally everything 
- [ ] UI to transfer money and register 
- [ ] Style Landing Page
- [ ] Cookie auth for the dashboard 