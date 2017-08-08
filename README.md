## comet-spec-encoder

> WARNING: the CoMet spec isn't great (see below)

This is a simple JavaScript (de)serializer for the [CoMet specification](http://www.denvog.com/comet/comet-specification/). The CoMet specification is an attempt to create an open standard for describing comicbook metadata.

This tool is designed to serialize to or from that specification into an 'easy to use' JavaScript object. It will also validate to the specification (as far as it goes).

### Usage

```
npm install -s comet-spec-encoder
```

```javascript
const comet = require('comet-spec-encoder');

// See ./examples/ for an example for input/output

let aCometXmlString = comet.serialize(aJavaScriptObject);
let aJavaScriptObject = comet.deserialize(aCometXMlString);
```

The object is validated using [Joi and will return errors as herein described](https://github.com/hapijs/joi) if the validation fails.

### Testing

```
npm test
```

Tests will fail unless there is 100% code coverage.

### Problems with the CoMet specification

The CoMet specification is relativley simple one, but it has lots of undefined behaviour, internal and design inconsistencies, and ambiguities. An incomplete list of which follows:

* The specification 'recommends' limiting values to a length of 255 characters 'except forwith a recommended limit of 4000 characters'. It does not define which fields should have the 'recommended' 255 or the 'recommended' 4000
    * It also gives no exaplanation or rationale for the 4000 number
    * **Implementation implication:** we do not enforce any character limits
* For several fields (issue, volume, lastMark) the specification requires that they be 'positive integers'. This does not capture the use case for any of these values being zero, which is rare but not unheard of in the world of comics. It might be implying that 0 is a positive number, but it should be made explicit as in most formal specifications 0 is defined as an unsigned number and is neither positive or negative.
    * **Implementation implication:** we validate these fields `> -1`
* For one field that can contain multiple values (character) it requires they be listed not as some kind of standard/native XML method for listing multiple like values but be encoded as comma seperated values within a single node as a string
    * There 8 other fields that are 'repeatable' but the specification does not define how they should capture multiple values, an inference is that it should be done in the same way as 'character' wit encoded CSVs
    * **Implementation implication:** we automatically encode and decode CSV's from arrays; we treat the other 8 fields as having the same CSV encoding behaviour
* All fields are named as a singular (e.g. writer) when they can (and some are specified) as being treated as having multiple values (making the plural such as 'writers' more logically consistent)
    * **Implementation implication:** none, we use the singular
* 'publisher' is not a 'repeatable' field, it is not uncommon that a single comic could be published by two or more publishers (such as the famous Marvel/DC crossovers)
    * **Implementation implication:** we trea publisher as a singular field, according to the spec
* There is no currency denomination for the 'price' field. We assume USD but comics not published in the US (such as Japanes Manga) have different cover prices and the spec cannot account for that
    * Also, it does not indicate which price this field refers to e.g is it 'cover price' or 'retail price' (or some other) as those can differ substantially
    * **Implementation implication:** none, we implement the ambiguous behaviour
* The specification makes a single attempt at capturing reading state with the 'lastMark' property, but does not capture any more of the necessary state needed to capture a reading position (such as screen orientation, zoom level)
    * It feels orthoganal to the goal of capturing and defining metadata to capture state in an otherwise stateless specification
    * **Implementation implication:** we implement the spec as described
* It is unclear if 'readingDirection' specifies the direction the comicbook should be read (e.g. front to back for western comics and back to front for manga) or on the page itself. They can be synonymous but there are cases (such as English translations of Japanese Manga) where they are mixed
    * **Implementation implication:** we implement the spec as described
* 'date' is ambiguous to it's purpose. There are several dates releveant to a comic publication e.g. publish date vs release date vs original release vs rerelease date
    * **Implementation implication:** we implement the spec as described

Based on the above I've stuck to the specifcation as written and so there are idosyncracies in it's implementation.

### License

MIT