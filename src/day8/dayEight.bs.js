// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

var $$Array                   = require("bs-platform/lib/js/array.js");
var Caml_array                = require("bs-platform/lib/js/caml_array.js");
var Caml_format               = require("bs-platform/lib/js/caml_format.js");
var Caml_builtin_exceptions   = require("bs-platform/lib/js/caml_builtin_exceptions.js");
var CPUInstruction$Advent2017 = require("./CPUInstruction.bs.js");

function max(numbers) {
  var match = $$Array.fold_left((function (param, n) {
          var index = param[2];
          var curMax = param[0];
          var match = +(curMax >= n);
          if (match !== 0) {
            return /* tuple */[
                    curMax,
                    param[1],
                    index + 1 | 0
                  ];
          } else {
            return /* tuple */[
                    n,
                    index,
                    index + 1 | 0
                  ];
          }
        }), /* tuple */[
        Caml_array.caml_array_get(numbers, 0),
        0,
        0
      ], numbers);
  return /* tuple */[
          match[0],
          match[1]
        ];
}

function solve(input) {
  var context = CPUInstruction$Advent2017.Context[/* make */4](/* () */0);
  $$Array.iter((function (line) {
          if (line.length !== 7) {
            throw [
                  Caml_builtin_exceptions.failure,
                  "Could not parse instruction"
                ];
          } else {
            var opReg = line[0];
            var op = line[1];
            var amt = line[2];
            var match = line[3];
            if (match === "if") {
              var predReg = line[4];
              var pred = line[5];
              var predAmt = line[6];
              var amount = Caml_format.caml_int_of_string(amt);
              var predAmount = Caml_format.caml_int_of_string(predAmt);
              if (CPUInstruction$Advent2017.assertPredicate(context, predReg, pred, predAmount)) {
                return CPUInstruction$Advent2017.Context[/* set */1](context, opReg)(CPUInstruction$Advent2017.doOp(context, opReg, op, amount));
              } else {
                return /* () */0;
              }
            } else {
              throw [
                    Caml_builtin_exceptions.failure,
                    "Could not parse instruction"
                  ];
            }
          }
        }), $$Array.map((function (param) {
              return param.split(" ");
            }), input.split("\n")));
  return max(CPUInstruction$Advent2017.Context[/* values */3](context))[0];
}

var Part1_000 = /* cases : :: */[
  /* tuple */[
    "b inc 5 if a > 1\na inc 1 if b < 5\nc dec -10 if a >= 1\nc inc -20 if c == 10",
    1
  ],
  /* [] */0
];

var Part1 = /* module */[
  Part1_000,
  /* solve */solve
];

function solve$1(input) {
  var context = CPUInstruction$Advent2017.Context[/* make */4](/* () */0);
  var max = [0];
  $$Array.iteri((function (i, line) {
          if (line.length !== 7) {
            throw [
                  Caml_builtin_exceptions.failure,
                  "Could not parse instruction"
                ];
          } else {
            var opReg = line[0];
            var op = line[1];
            var amt = line[2];
            var match = line[3];
            if (match === "if") {
              var predReg = line[4];
              var pred = line[5];
              var predAmt = line[6];
              var amount = Caml_format.caml_int_of_string(amt);
              var predAmount = Caml_format.caml_int_of_string(predAmt);
              if (CPUInstruction$Advent2017.assertPredicate(context, predReg, pred, predAmount)) {
                var newValue = CPUInstruction$Advent2017.doOp(context, opReg, op, amount);
                CPUInstruction$Advent2017.Context[/* set */1](context, opReg)(newValue);
                var match$1 = +(i === 0);
                var match$2 = +(newValue > max[0]);
                if (match$1 !== 0 || match$2 !== 0) {
                  max[0] = newValue;
                  return /* () */0;
                } else {
                  return /* () */0;
                }
              } else {
                return /* () */0;
              }
            } else {
              throw [
                    Caml_builtin_exceptions.failure,
                    "Could not parse instruction"
                  ];
            }
          }
        }), $$Array.map((function (param) {
              return param.split(" ");
            }), input.split("\n")));
  return max[0];
}

var Part2_000 = /* cases : :: */[
  /* tuple */[
    "b inc 5 if a > 1\na inc 1 if b < 5\nc dec -10 if a >= 1\nc inc -20 if c == 10",
    10
  ],
  /* [] */0
];

var Part2 = /* module */[
  Part2_000,
  /* solve */solve$1
];

var part1 = solve;

var part2 = solve$1;

exports.max   = max;
exports.Part1 = Part1;
exports.Part2 = Part2;
exports.part1 = part1;
exports.part2 = part2;
/* CPUInstruction-Advent2017 Not a pure module */