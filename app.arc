@app
lts-stack

@aws
region eu-central-1
profile lts-stack
bucket ek-geloets-installationen-ftw

@static
folder dist
fingerprint true

@http
get /
get /about
get /guestbook
get /guestbook/:entryId
get /site.webmanifest
get /*

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

@macros
custom-domain
herschel666-arc-macros-custom-log-groups
