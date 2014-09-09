# React Request

HTTP request widget

## API

**<ReactRequest />**

This accepts the following props:

- `targetUrl` URL to request. E.g. "postcodes.io/postcodes/random"
- `protocol` Protocol to use. E.g. "http" or "https". Defaults to "http"
- `queryString` Query string to append to URL (also URL encodes strings). E.g. "{"key":"my_key","foo":"bar"}"
- `method` HTTP method. E.g. "GET". Defaults to GET

## Todo

- Add resource tag to targetUrl and modifier
- Add optional query string modifiers

## License

MIT