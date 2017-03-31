'use strict';

const TYPE = Object.freeze({
    Less: -1,
    Greater: 1,
    Equal: 0
});

class Searcher {

    constructor(text) {
        this.text = text;
        this.index = this._indexer(text);
    }

    _compare(a, b, flag) {
        let length = Math.min(a.length, b.length);
        for (let i = 0; i < length; i++) {
            if (a.charAt(i) !== b.charAt(i)) {
                return a.charAt(i) < b.charAt(i) ? TYPE.Less : TYPE.Greater;
            }
        }
        if (flag) {
            return TYPE.Equal;
        }
        if (a.length === b.length) {
            return TYPE.Equal;
        }
        return a.length < b.length ? TYPE.Less : TYPE.Greater;
    }

    _indexer(text) {
        return Array(text.length)
            .fill()
            .map((_, i) => {
                return {
                    index: i,
                    text: text.substring(i)
                };
            })
            .sort((a, b) => {
                return this._compare(a.text, b.text, false);
            })
            .map(e => e.index)
    }

    indexOf(s) {
        const positions = [];
        let start = 0;
        let end = this.index.length - 1;
        while (start <= end) {
            let mid = (start + end) >> 1;
            let compr = this._compare(this.text.substring(this.index[mid]), s, true);
            switch (compr) {
                case TYPE.Less:
                    start = mid + 1
                    break;
                case TYPE.Greater:
                    end = mid - 1;
                    break;
                case TYPE.Equal:
                    positions.push(this.index[mid]);
                    for(let i=mid+1; i<=end; i++) {
                        if (this._compare(this.text.substring(this.index[i]), s, true) === TYPE.Equal) {
                            positions.push(this.index[i]);
                        } else {
                            return positions;
                        }
                    }                    
            }
        }        
        return positions;
    }
}

module.exports = Searcher;
