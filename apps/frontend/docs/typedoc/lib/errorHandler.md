# lib/errorHandler

## Functions

### handleError()

> **handleError**(`error`): `Promise`\<`void`\>

Defined in: [apps/frontend/src/lib/errorHandler.ts:18](https://github.com/LifelagCheats/prescript.daily/blob/d39308c072353e430f7a5a216443ce86b40d1508/apps/frontend/src/lib/errorHandler.ts#L18)

An async function responsible for sending errors to a discord webhook through an API endpoint.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`error`

</td>
<td>

`unknown`

</td>
<td>

the Error itself, if it's not a proper Error object, it'll be sent as a string.

</td>
</tr>
</tbody>
</table>

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
