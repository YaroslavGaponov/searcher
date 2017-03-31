'use strict';

const assert = require('assert');
const Searcher = require('../');

describe('Searcher', () => {

    describe('indexOf', () => {
        it('simple1', () => {
            let s = new Searcher('Hello world');
            assert.deepEqual(s.indexOf('lo'), [3]);
        });
        it('simple2', () => {
            let s = new Searcher('Helloello');
            assert.deepEqual(s.indexOf('ello'), [5, 1]);
        });
        it('simple3', () => {
            let s = new Searcher('Helloello');
            assert.deepEqual(s.indexOf('bye'), []);
        });
    });

});