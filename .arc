@app
lts-stack

@aws
region eu-central-1

@static
folder dist

@http
get /
get /about
get /guestbook
get /guestbook/:entryId

post /guestbook

@tables
lts-stack
  PK *String
  SK **String
  _ttl TTL

@indexes
lts-stack
  GSI1PK *String
  GSI1SK **String
