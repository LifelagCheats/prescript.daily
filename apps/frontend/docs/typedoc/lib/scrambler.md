# lib/scrambler

## Functions

### revealTextScramble()

> **revealTextScramble**(`el`, `fromText`, `finalText`, `options?`, `globals?`, `controlState?`): `Promise`\<`void`\>

Defined in: [apps/frontend/src/lib/scrambler.ts:56](https://github.com/LifelagCheats/prescript.daily/blob/413cc90986f7cd6bccab3fc70836e8018dd04563/apps/frontend/src/lib/scrambler.ts#L56)

A function that takes in an HTML element and modifies its text in a way that makes it have a scrambling animation

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`el`

</td>
<td>

[`RevealElement`](../types/scrambler.md#revealelement)

</td>
<td>

`undefined`

</td>
<td>

the Element that's going to be modified. special type with the __revealTimer property. See [RevealElement](../types/scrambler.md#revealelement).

</td>
</tr>
<tr>
<td>

`fromText`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

the starting text that's going to appear as the base from which the message is going to be 'scrambled' and revealed.

</td>
</tr>
<tr>
<td>

`finalText`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

the final text that's going to be worked upon to reveal.

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`ScramblerOptions`](../types/scrambler.md#scrambleroptions)

</td>
<td>

`{}`

</td>
<td>

Optional configuration object. See [ScramblerOptions](../types/scrambler.md#scrambleroptions) for available options.

</td>
</tr>
<tr>
<td>

`globals`

</td>
<td>

[`ScramblerGlobals`](../types/scrambler.md#scramblerglobals)

</td>
<td>

`...`

</td>
<td>

Optional configuration object, defines some additional settings. See [ScramblerGlobals](../types/scrambler.md#scramblerglobals) for available globals.

</td>
</tr>
<tr>
<td>

`controlState`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
<td>

dictates whether the function itself controls the appliance and removal of the 'busy' class in the element it's editing. true by default.

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

a void Promise that resolves once the animation is complete.

#### Remarks

decides whether it should scramble with the controlState variable and if the element given contains
the 'busy' class in it, this is the reason why the 'busy' class is reserved only for cases where this function
is going to be used. use anything else to describe a state of busyness.

This function uses the blockChar as the 'default' until it is allowed to scramble the next letter,
like ($# => █# => a█ => ab), acts as a cursor of sorts.

#### Example

```ts
const el: HTMLElement = document.querySelector('element');

revealTextScramble(
 el, // the element
 '', // starting text, starts from nothing, expands into the final result
 'the prescript knows best', // final result
 {}, // can always leave it empty, which will use default options, which is fine
 {
   audioUnlocked: true, // Howl instances passed below will play
   startBeep: HowlInstance1, // remember to pass the Howl Instance itself, not a function
   Beep: HowlInstance2,
   endBeep: HowlInstance3
 },
 controlState: false // bring your own protection if you're going to do this
)
```

#### See

[ScramblerGlobals](../types/scrambler.md#scramblerglobals), [ScramblerOptions](../types/scrambler.md#scrambleroptions), [RevealElement](../types/scrambler.md#revealelement)
