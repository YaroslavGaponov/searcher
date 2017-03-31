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

    _compare(a, b) {
        let length = Math.min(a.length, b.length);
        for (let i = 0; i < length; i++) {
            if (a.charAt(i) !== b.charAt(i)) {
                return a.charAt(i) < b.charAt(i) ? TYPE.Less : TYPE.Greater;
            }
        }
        return TYPE.Equal;
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
                return this._compare(a.text, b.text)
            })
            .map(e => e.index)
    }

    indexOf(s) {
        const positions = [];
        let start = 0;
        let end = this.index.length - 1;
        while (start <= end) {
            let mid = (start + end) >> 1;
            let compr = this._compare(this.text.substring(this.index[mid]), s);
            switch (compr) {
                case TYPE.Less:
                    start = mid + 1
                    break;
                case TYPE.Greater:
                    end = mid - 1;
                    break;
                case TYPE.Equal:
                    positions.push(this.index[mid]);
                    let left = mid;
                    while (start <= left && this._compare(this.text.substring(this.index[--left]), s) === TYPE.Equal) {
                        positions.push(this.index[left]);
                    }
                    let right = mid;
                    while (right <= end && this._compare(this.text.substring(this.index[++right]), s) === TYPE.Equal) {
                        positions.push(this.index[right]);
                    }
                    return positions;
            }
        }        
        return positions;
    }
}

module.exports = Searcher;
