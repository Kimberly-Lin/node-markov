"use strict";

const { MarkovMachine } = require("./markov");

describe("instantiating class", function () {
    test("check instantiates properly", function () {
        let mm = new MarkovMachine("this is a test");
        expect(mm).toBeInstanceOf(MarkovMachine);
        expect(mm.words).toEqual(["this", "is", "a", "test"]);
    });
    test("pass in bad text during instantiation", function () {
        expect(() => new MarkovMachine(5)).toThrowError("text.split is not a function");
        expect(() => new MarkovMachine()).toThrowError("Cannot read property 'split' of undefined");
    });
});


describe("test markov methods", function () {
    let mm;
    beforeEach(function () {
        mm = new MarkovMachine("the cat is the hat");
    });

    test("test chain method", function () {
        expect(mm.makeChains()).toEqual({ "the": ["cat", "hat"], "cat": ["is"], "is": ["the"], "hat": [null] });
    });
    test("test getText method", function () {
        expect(mm.getText().split(" ").length).toEqual(100);
        expect(mm.getText(50).split(" ").length).toEqual(50);
        expect(mm.getText()).toEqual(expect.any(String));
        expect(mm.getText()).toEqual(expect.stringContaining("the"));
    });
});