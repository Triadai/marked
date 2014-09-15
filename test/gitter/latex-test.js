/*jslint node: true */
/*global describe:true, it: true, beforeEach:true, afterEach:true */
"use strict";

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var util = require('util');
var marked = require('../..');

function getDefaultOptions() {
  return { headerPrefix: 'test', gfm: true, tables: true, sanitize: true, breaks: true, linkify: true };
}

describe('latext', function() {
  it('should handle inline latex', function() {
    var text = 'this is $$latex$$';
    var options = getDefaultOptions();

    var lexer = new marked.Lexer(options);
    var renderer = new marked.Renderer();
    renderer.latex = function(x) {
      return '$-$' + x + '$-$';
    };
    var tokens = lexer.lex(text);
    options.renderer = renderer;

    var parser = new marked.Parser(options);
    var html = parser.parse(tokens);

    assert.equal(html, '<p>this is $-$latex$-$</p>\n');
  });

  it('should handle multi-line latex', function() {
    var text = 'this is $$lat\nex$$';
    var options = getDefaultOptions();

    var lexer = new marked.Lexer(options);
    var renderer = new marked.Renderer();
    renderer.latex = function(x) {
      return '$-$' + x + '$-$';
    };
    var tokens = lexer.lex(text);
    options.renderer = renderer;

    var parser = new marked.Parser(options);
    var html = parser.parse(tokens);

    assert.equal(html, '<p>this is $-$lat\nex$-$</p>\n');
  });

});
