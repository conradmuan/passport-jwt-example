# Simple Token Auth Strat

JWT strategy for token based authentication.

```
npm i
cp .env.example .env
# fill out the .env file and then build
tsc -p ./tsconfig.json
```


Todo and other considerations:

- [ ] basic login (so that we're not POSTing in the payload)
- [ ] `expiresIn` field
- [ ] refresh token endpoint
- [ ] token blacklist?
# curls

```
curl -d '{"user": "conradmuan", "password": "my-new-pass"}' -H "Content-Type: application/json" -X POST http://localhost:3000/auth
```

```
# This should fail
curl -X GET http://localhost:3000/user
```

```
curl -H "Authorization: Bearer put a token here" -X GET http://localhost:3000/user
```