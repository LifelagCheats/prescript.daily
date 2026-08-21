# lib/general

## Functions

### randomInt()

> **randomInt**(`min`, `max`): `number`

Defined in: [apps/frontend/src/lib/general.ts:16](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/lib/general.ts#L16)

A simple function that return a random number between the given floor and ceiling

#### Parameters

##### min

`number`

the minimum

##### max

`number`

the maximum

#### Returns

`number`

a number between the given minimum and maximum (inclusive meaning it can be the minimum/maximum itself)

#### Example

```ts
let num: number = randomInt(1, 1) // num = 1
num = randomInt(99, 9123919312) // a number between those two
num = randomInt(2, 1) // will error if maximum is lower than minimum
```
