# Data Templater

This library is designed to take in data and format it based on a template.  for example if you had the string `1234567890` and the template `(???) ???-????`, you could easying convert the data to an from `(123) 456-7890`.  This was built because the only descent library I could find was tied to jQuery and as I use ReactJS, I don't need jQuery and want someting more generic.  This is a simplier version base off of https://github.com/RobinHerbots/jquery.inputmask and has no dependencies.

## Examples

You can look at the unit test for more examples

```javascript
dataTemplater.compile('123456789', '???-???-????');// => '123-456-789'
dataTemplater.uncompile('123-456-789', '???-???-????');// =>'123456789'
dataTemplater.compiledIndexToUncompiledIndex(11, '(???) ???-????');// => 7
dataTemplater.uncompiledIndexToCompiledIndex(6, '(???) ???-????');// => 10
```