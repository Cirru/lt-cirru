
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

  CodeMirror.defineMode("cirru", function(config, parserConfig) {
    return {
      startState: function() {
        return {
          head: true
        };
      },
      token: function(stream, state) {
        if (stream.sol()) {
          state.head = true;
        }
        if (stream.match("$")) {
          state.head = true;
          return "bracket";
        } else if (stream.match(',')) {
          state.head = false;
          return 'bracket';
        } else if (stream.match(/^[^\$\"\s\(\)][^\"\s\(\)]*/)) {
          if (state.head) {
            state.head = false;
            return "keyword";
          } else {
            return "variable";
          }
        } else if (stream.match(/^"([^\\\"]|(\\.))*\"/)) {
          if (state.head) {
            state.head = false;
            return "keyword";
          } else {
            return "variable";
          }
        } else if (stream.match("(")) {
          state.head = true;
          return "bracket";
        } else if (stream.match(")")) {
          state.head = false;
          return "bracket";
        } else {
          stream.next();
          return null;
        }
      }
    };
  });

  CodeMirror.defineMIME("text/x-cirru", "cirru");

});
