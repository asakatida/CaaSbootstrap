# CaaSbootstrap

A single service API that takes a resource expected to contain a PEG grammar
and returns a syntax tree for that grammar.

run `npm install && npm start`

open `curl
http://localhost:8080/api/peg/peg?src=http%3A%2F%2Flocalhost%3A8080%2Fresources%2Fpeg%2Epeg`
for output matching [static.json](static.json) and validating against
[peg.schema](peg.schema)
