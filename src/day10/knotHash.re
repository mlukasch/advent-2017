let explode = (s) => {
  let rec exp = (i, l) =>
    if (i < 0) {
      l
    } else {
      exp(i - 1, [s.[i], ...l])
    };
  exp(String.length(s) - 1, [])
};

[@bs.send] external padStart : (string, ~length: int, ~padWith: string) => string = "padStart";

let xorMany = Array.fold_left((accum, n) => accum lxor n, 0);

let toHex = (n) => padStart(Printf.sprintf("%x", n), ~length=2, ~padWith="0");

let rec knot = (~lengths, ~numbers, ~position, ~skip) =>
  switch lengths {
  | [length, ...tail] =>
    let start = position;
    /* CircularArray impl in `./circularArray.re` */
    let subArray = CircularArray.rev(CircularArray.sub(numbers, ~start, ~length));
    let newNumbers = CircularArray.replace(numbers, ~start, ~withArray=subArray);
    knot(~lengths=tail, ~numbers=newNumbers, ~position=position + length + skip, ~skip=skip + 1)
  | [] => (numbers, position, skip)
  };

let rec sparse = (~lengths, ~round, ~numbers, ~position, ~skip) =>
  if (round > 0) {
    let (newNumbers, newPosition, newSkip) = knot(~lengths, ~position, ~skip, ~numbers);
    sparse(~lengths, ~round=round - 1, ~numbers=newNumbers, ~position=newPosition, ~skip=newSkip)
  } else {
    numbers
  };

let dense = (numbers) => {
  let blocks = Array.make(16, 0);
  for (blockNum in 0 to 15) {
    let block = Array.sub(numbers, blockNum * 16, 16);
    blocks[blockNum] = xorMany(block)
  };
  blocks
};

let make = (input) => {
  let ascii = explode(input) |> List.map(Char.code);
  let lengths = List.concat([ascii, [17, 31, 73, 47, 23]]);
  let numbers = Array.init(256, (i) => i);
  let sparseHash = sparse(~lengths, ~numbers, ~round=64, ~position=0, ~skip=0);
  let denseHash = dense(sparseHash);
  Array.map(toHex, denseHash) |> Js.Array.joinWith("")
};