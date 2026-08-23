# lib/general

## Functions

### randomInt()

> **randomInt**(`min`, `max`): `number`

Defined in: [apps/frontend/src/lib/general.ts:16](https://github.com/LifelagCheats/prescript.daily/blob/a468ae566075ac335ce0be9ad8f510ff421f830c/apps/frontend/src/lib/general.ts#L16)

A simple function that return a random number between the given floor and ceiling

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

`min`

</td>
<td>

`number`

</td>
<td>

the minimum

</td>
</tr>
<tr>
<td>

`max`

</td>
<td>

`number`

</td>
<td>

the maximum

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

a number between the given minimum and maximum (inclusive meaning it can be the minimum/maximum itself)

#### Example

```ts
let num: number = randomInt(1, 1) // num = 1
num = randomInt(99, 9123919312) // a number between those two
num = randomInt(2, 1) // will error if maximum is lower than minimum
```
