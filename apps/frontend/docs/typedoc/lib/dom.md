# lib/dom

## Functions

### waitForElement()

> **waitForElement**\<`T`\>(`selector`): `Promise`\<`T`\>

Defined in: [apps/frontend/src/lib/dom.ts:13](https://github.com/LifelagCheats/prescript.daily/blob/023c59a78a0e096580ab52e1699b520cfa71ba04/apps/frontend/src/lib/dom.ts#L13)

Replacement for the standard document.querySelector, wrapping around MutationObserver to achieve asynchronous queries and promises

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* `HTMLElement`

</td>
</tr>
</tbody>
</table>

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

`selector`

</td>
<td>

`string`

</td>
<td>

the selector tag by which the element will be queried

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`T`\>

an HTMLElement of the specified selector and a resolved promise

#### Remarks

did this because .querySelector ran instantly and the rest of the code didn't actually wait until the element appeared, as so it
would be null
