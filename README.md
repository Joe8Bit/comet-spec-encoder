## comet-specification-serializer

> WARNING: the CoMet spec is pretty terrible (lots of bugs and undefined behaviour [see below])

This is a simple (de)serializer for the [CoMet specification](http://www.denvog.com/comet/comet-specification/). The CoMet specification is an attempt to create an open standard for describing comicbook metadata.

This tool is designed to serialize to or from that specification into an 'easy to use' JavaScript object. It will also validate the into to the specification (as far as it goes).

### Usage

```javascript
const comet = require('comet-specification-serializer');

let aCometXmlString = comet.serialize(aJavaScriptObject);
let aJavaScriptObject = comet.deserialize(aCometXMlString);
```

The object is validated using [Joi and will return errors as herein described](https://github.com/hapijs/joi) if the validation fails.

### Testing

```
npm test
```

### Problems with the CoMet specification

The CoMet specification is relativley simple one, but it is still somewhat riddled with undefined behaviour and inconsistencies, an incomplete list of which follows:

* The spec 'recommends' limiting values to a length of 255 characters 'except forwith a recommended limit of 4000 characters'. It does not define which fields should have the recommended 255 of the recommended 4000
    * It also gives no exaplanation or rationale for the 4000 number
* For several fields (issue, volume, lastMark) the specification requires that they be 'positive integers'. This does not capture the use case for any of these values being zero, which is rare but not unheard of in the world of comics. It might be implying that 0 is a positive number, but it should be made explicit as in most formal specifications 0 is defined as an unsigned number and is neither positive or negative.
* For one field that can contain multiple values (character) it requires they be listed not as some kind of standard/native XML method for listing multiple like values but as comma seperated values within a single node as a string.
    * There 8 other fields that are 'repeatable' but the specification does not define how that should happen, an inference is that it should be done in the same way as 'character'
* All fields are named as a singular (e.g. writer) when they can (and some are specified) as being treated as habving multiple values (making 'writers' more applicable)
* 'publisher' is not a 'repeatable' field when it is not uncommon that a single comic could be published by two publishers (such as the famous Marvel/DC crossovers)
* There is no currency denomination for the 'price' field, we assume USD but comics not published in the US (such as Japanes Manga) have different cover prices and the spec cannot account for that
* The specification makes a single attempt at also caturing reading state with the 'lastMark' property, but does not capture any more of the necessary state needed to capture a reading position (such as screen orientation, zoom level). It feels strange to capture state in an otherwise stateless specification
* It is unclear if 'readingDirection' specifies the direction the comicbook should be read (e.g. front to back for western comics and back to front for manga) or on the page itself. They can be synonymous but there are cases (such as English translations of Japanese Manga) where they are mixed
* The specification makes no mention of naming conventions for CoMet XML files

Based on the above I've stuck to the specifcation as written and so there are idosyncracies.

### License

MIT