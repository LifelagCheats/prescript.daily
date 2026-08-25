# types/scrambler

## Interfaces

### ScramblerOptions

Defined in: [apps/frontend/src/types/scrambler.d.ts:14](https://github.com/LifelagCheats/prescript.daily/blob/413cc90986f7cd6bccab3fc70836e8018dd04563/apps/frontend/src/types/scrambler.d.ts#L14)

Represents the settings that can be submitted into the [lib/scrambler.revealTextScramble](../lib/scrambler.md#revealtextscramble) function.

#### See

[lib/scrambler.revealTextScramble](../lib/scrambler.md#revealtextscramble)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-fps"></a> `fps?`

</td>
<td>

`number`

</td>
<td>

frames per second, remember that the equation is 1000 / fps.

</td>
<td>

[apps/frontend/src/types/scrambler.d.ts:15](https://github.com/LifelagCheats/prescript.daily/blob/413cc90986f7cd6bccab3fc70836e8018dd04563/apps/frontend/src/types/scrambler.d.ts#L15)

</td>
</tr>
<tr>
<td>

<a id="property-scramblechars"></a> `scrambleChars?`

</td>
<td>

`string`

</td>
<td>

a string with a list of all the characters available to be chosen each time a singular scramble is made before revealing the character. no spaces between characters.

</td>
<td>

[apps/frontend/src/types/scrambler.d.ts:16](https://github.com/LifelagCheats/prescript.daily/blob/413cc90986f7cd6bccab3fc70836e8018dd04563/apps/frontend/src/types/scrambler.d.ts#L16)

</td>
</tr>
<tr>
<td>

<a id="property-blockchar"></a> `blockChar?`

</td>
<td>

`string`

</td>
<td>

the character that's going to be used as the block character in the sequence.

</td>
<td>

[apps/frontend/src/types/scrambler.d.ts:17](https://github.com/LifelagCheats/prescript.daily/blob/413cc90986f7cd6bccab3fc70836e8018dd04563/apps/frontend/src/types/scrambler.d.ts#L17)

</td>
</tr>
<tr>
<td>

<a id="property-revealspeed"></a> `revealSpeed?`

</td>
<td>

`number`

</td>
<td>

time before each individual character is revealed, in the time it has not reached that time, the scrambling animation for that character will happen.

</td>
<td>

[apps/frontend/src/types/scrambler.d.ts:18](https://github.com/LifelagCheats/prescript.daily/blob/413cc90986f7cd6bccab3fc70836e8018dd04563/apps/frontend/src/types/scrambler.d.ts#L18)

</td>
</tr>
<tr>
<td>

<a id="property-blockchance"></a> `blockChance?`

</td>
<td>

`number`

</td>
<td>

the chance of the block character appearing that frame.

</td>
<td>

[apps/frontend/src/types/scrambler.d.ts:19](https://github.com/LifelagCheats/prescript.daily/blob/413cc90986f7cd6bccab3fc70836e8018dd04563/apps/frontend/src/types/scrambler.d.ts#L19)

</td>
</tr>
<tr>
<td>

<a id="property-beepchanceperframe"></a> `beepChancePerFrame?`

</td>
<td>

`number`

</td>
<td>

the chance of the respective beep sound being played that frame.

</td>
<td>

[apps/frontend/src/types/scrambler.d.ts:20](https://github.com/LifelagCheats/prescript.daily/blob/413cc90986f7cd6bccab3fc70836e8018dd04563/apps/frontend/src/types/scrambler.d.ts#L20)

</td>
</tr>
<tr>
<td>

<a id="property-minbeepgapms"></a> `minBeepGapMs?`

</td>
<td>

`number`

</td>
<td>

minimum time that needs to have passed between beeps for them to be played.

</td>
<td>

[apps/frontend/src/types/scrambler.d.ts:21](https://github.com/LifelagCheats/prescript.daily/blob/413cc90986f7cd6bccab3fc70836e8018dd04563/apps/frontend/src/types/scrambler.d.ts#L21)

</td>
</tr>
</tbody>
</table>

***

### ScramblerGlobals

Defined in: [apps/frontend/src/types/scrambler.d.ts:34](https://github.com/LifelagCheats/prescript.daily/blob/413cc90986f7cd6bccab3fc70836e8018dd04563/apps/frontend/src/types/scrambler.d.ts#L34)

Represents the core settings and objects used in the [lib/scrambler.revealTextScramble](../lib/scrambler.md#revealtextscramble) function.

#### See

[lib/scrambler.revealTextScramble](../lib/scrambler.md#revealtextscramble)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-audiounlocked"></a> `audioUnlocked`

</td>
<td>

`boolean`

</td>
<td>

boolean property that dictates whether the next audio properties will be executed.

</td>
<td>

[apps/frontend/src/types/scrambler.d.ts:35](https://github.com/LifelagCheats/prescript.daily/blob/413cc90986f7cd6bccab3fc70836e8018dd04563/apps/frontend/src/types/scrambler.d.ts#L35)

</td>
</tr>
<tr>
<td>

<a id="property-startbeep"></a> `startBeep?`

</td>
<td>

`Howl`

</td>
<td>

Howl instance that will be played at the start of the sequence.

</td>
<td>

[apps/frontend/src/types/scrambler.d.ts:36](https://github.com/LifelagCheats/prescript.daily/blob/413cc90986f7cd6bccab3fc70836e8018dd04563/apps/frontend/src/types/scrambler.d.ts#L36)

</td>
</tr>
<tr>
<td>

<a id="property-beep"></a> `Beep?`

</td>
<td>

`Howl`

</td>
<td>

Howl instance that will be played as the beep sound in the sequence.

</td>
<td>

[apps/frontend/src/types/scrambler.d.ts:37](https://github.com/LifelagCheats/prescript.daily/blob/413cc90986f7cd6bccab3fc70836e8018dd04563/apps/frontend/src/types/scrambler.d.ts#L37)

</td>
</tr>
<tr>
<td>

<a id="property-endbeep"></a> `endBeep?`

</td>
<td>

`Howl`

</td>
<td>

Howl instanc that will be played once the animation ends.

</td>
<td>

[apps/frontend/src/types/scrambler.d.ts:38](https://github.com/LifelagCheats/prescript.daily/blob/413cc90986f7cd6bccab3fc70836e8018dd04563/apps/frontend/src/types/scrambler.d.ts#L38)

</td>
</tr>
</tbody>
</table>

***

### RevealElement

Defined in: [apps/frontend/src/types/scrambler.d.ts:52](https://github.com/LifelagCheats/prescript.daily/blob/413cc90986f7cd6bccab3fc70836e8018dd04563/apps/frontend/src/types/scrambler.d.ts#L52)

An interface representing the type of element going to be revealed by the [lib/scrambler.revealTextScramble](../lib/scrambler.md#revealtextscramble) function.

#### Remarks

It is a normal HTMLElement, only differing because of its __revealTimer property.

#### See

[lib/scrambler.revealTextScramble](../lib/scrambler.md#revealtextscramble)

#### Extends

- `HTMLElement`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-__revealtimer"></a> `__revealTimer?`

</td>
<td>

`Timeout` \| `null`

</td>
<td>

time between each reveal sequence done by the function, attached directly to the element.

</td>
<td>

[apps/frontend/src/types/scrambler.d.ts:53](https://github.com/LifelagCheats/prescript.daily/blob/413cc90986f7cd6bccab3fc70836e8018dd04563/apps/frontend/src/types/scrambler.d.ts#L53)

</td>
</tr>
</tbody>
</table>

***

### Prescript

Defined in: [apps/frontend/src/types/scrambler.d.ts:67](https://github.com/LifelagCheats/prescript.daily/blob/413cc90986f7cd6bccab3fc70836e8018dd04563/apps/frontend/src/types/scrambler.d.ts#L67)

Interface represeting a prescript.

#### Remarks

The Prescript knows best.

#### See

[lib/scrambler.revealTextScramble](../lib/scrambler.md#revealtextscramble)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-id"></a> `id`

</td>
<td>

`number`

</td>
<td>

the prescript's ID in the Supabase database.

</td>
<td>

[apps/frontend/src/types/scrambler.d.ts:68](https://github.com/LifelagCheats/prescript.daily/blob/413cc90986f7cd6bccab3fc70836e8018dd04563/apps/frontend/src/types/scrambler.d.ts#L68)

</td>
</tr>
<tr>
<td>

<a id="property-instruction"></a> `instruction`

</td>
<td>

`string`

</td>
<td>

a string that contains the Prescript's instructions as per the database.

</td>
<td>

[apps/frontend/src/types/scrambler.d.ts:69](https://github.com/LifelagCheats/prescript.daily/blob/413cc90986f7cd6bccab3fc70836e8018dd04563/apps/frontend/src/types/scrambler.d.ts#L69)

</td>
</tr>
</tbody>
</table>
