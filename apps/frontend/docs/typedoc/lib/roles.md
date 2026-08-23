# lib/roles

## Functions

### getRole()

> **getRole**(`Pcompleted`): [`Rank`](../types/rank.md#rank) \| `undefined`

Defined in: [apps/frontend/src/lib/roles.ts:34](https://github.com/LifelagCheats/prescript.daily/blob/023c59a78a0e096580ab52e1699b520cfa71ba04/apps/frontend/src/lib/roles.ts#L34)

Function responsible for returning the user's current rank/role (however you call it).

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

`Pcompleted`

</td>
<td>

`number`

</td>
<td>

takes in the number of completed prescripts as a whole integer.

</td>
</tr>
</tbody>
</table>

#### Returns

[`Rank`](../types/rank.md#rank) \| `undefined`

a Rank object containing the current rank's name and Pcompleted.

#### Remarks

compares the number of given prescripts to identify the rank sitting in between the difference.

#### Example

```ts
const currentRole: Rank = getRole(13) // returns a Rank object with the name Proselyte.
const Role1: Rank = getRole(26) // returns 'Proxy'.
```

***

### nextRole()

> **nextRole**(`rank`): [`Rank`](../types/rank.md#rank)

Defined in: [apps/frontend/src/lib/roles.ts:55](https://github.com/LifelagCheats/prescript.daily/blob/023c59a78a0e096580ab52e1699b520cfa71ba04/apps/frontend/src/lib/roles.ts#L55)

Function responsible for returning the rank right after the user's current.

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

`rank`

</td>
<td>

`string`

</td>
<td>

the name property of the current rank to be used to determine the next one.

</td>
</tr>
</tbody>
</table>

#### Returns

[`Rank`](../types/rank.md#rank)

a Rank object containing the information and properties of the next Rank after the given one's.

#### Remarks

finds the next Rank by finding the rank with the name property akin to the one given as a parameter
and adding 1 to its index.

#### Example

```ts
const nextRole: Rank = nextRole(13) // returns a Rank object with the name 'Proxy'.
const Role2: Rank = nextRole(26) // returns 'Messenger'.
```
