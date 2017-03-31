# Searcher
    
    Just my IndexOf method
    
## Usage

```js
const search = require('searcher');
let s = new Searcher('If you want something done right, you have to do it yourself.');
console.log(s.indexOf('do')); // print [ 46, 22 ]
console.log(s.indexOf('done')); // print [ 22 ]
````