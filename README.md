# Iterator Join

A proposal to add to JavaScript a means to concatenate the contents of an iterator into a string.

## Status

Authors: Kevin Gibbons

Champions: Kevin Gibbons

This proposal is at stage 0 of [the TC39 process](https://tc39.es/process-document/): it has not yet been presented to the committee.

## Motivation

Joining a list of strings into a single string for display or other reasons is a [very](https://github.com/search?q=%2FArray%5C.from%5C%28%5Cw%2B%5C.keys%5C%28%5C%29%5C%29%5C.join%5C%28%2F+%28lang%3Ajs+OR+lang%3Ats%29+-is%3Afork&type=code) [common](https://github.com/search?q=%2FArray%5C.from%5C%28%5Cw%2B%5C.values%5C%28%5C%29%5C%29%5C.join%5C%28%2F+%28lang%3Ajs+OR+lang%3Ats%29+-is%3Afork&type=code) [operation](https://github.com/search?q=%2FArray%5C.from%5C%28%5Cw%2B%5C.entries%5C%28%5C%29%5C%29%5C.map%5C%28.*%5C.join%5C%28%2F+%28lang%3Ajs+OR+lang%3Ats%29+-is%3Afork&type=code). If you have an array, it's trivial: just call `.join(sep)`. If you have any other iterable, you can either do `Iterator.from(it).reduce((a, b) => a + sep + b)` (and pay the cost of allocating all the intermediate strings, plus this breaks on empty iterators), or `Array.from(it).join(sep)` (and pay the cost of converting the whole thing to an Array).

We should make that easier.

This came up [during the original iterator helpers proposal](https://github.com/tc39/proposal-iterator-helpers/issues/294) and later on [the Discourse](https://es.discourse.group/t/iterator-prototype-join/2453).

## Proposal

While in principle there are various ways to solve this problem, the obvious one is to add `Iterator.prototype.join` which works exactly like `Array.prototype.join` except that it operates on its receiver as an iterator rather than as an Array. That is what is [currently specified](https://bakkot.github.io/proposal-iterator-join/).
