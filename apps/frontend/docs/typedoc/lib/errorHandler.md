# lib/errorHandler

## Functions

### handleError()

> **handleError**(`error`): `Promise`\<`void`>\>

Defined in: [apps/frontend/src/lib/errorHandler.ts:18](https://github.com/LifelagCheats/prescript.daily/blob/bb88f75dbd2fda6a878caf3e0d6b7e39852dc8ed/apps/frontend/src/lib/errorHandler.ts#L18)

An async function responsible for sending errors to a discord webhook through an API endpoint.

#### Parameters

##### error

`unknown`

the Error itself, if it's not a proper Error object, it'll be sent as a string.

#### Returns

`Promise`\<`void`\>

#### Remarks

Sends the Error message itself, along with the stack trace (if it carries one)
and the browser and platform the user is using at the moment of the error. All of this
is sent through a POST request to an API endpoint.

#### Example

```ts
handleError("ERROR!!!") \\ will send a discord embed with 'ERROR!!!' as its message body through the webhook
```
