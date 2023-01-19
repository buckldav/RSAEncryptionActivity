const RSA = require("./index");
const fs = require("fs");
// import multiprocessing as mp
// import time
// import traceback

function test_smallest_coprime() {
  console.assert(RSA.smallest_coprime(4) === 3);
  console.assert(RSA.smallest_coprime(100) === 3);
  console.assert(RSA.smallest_coprime(2 ** 100) === 3);
}

// def test_lcm():
//     pass
//     # TODO write some assertions for LCM

function test_encryption_boundary() {
  p = 13;
  q = 29;
  rsa = new RSA(p, q);
  // TODO demonstrate the boundary cases
  // Example assertions (replace 10 and 500 with boundary values)
  console.assert(10 === rsa.c(rsa.m(10)));
  console.assert(500 != rsa.c(rsa.m(500)));
}

function test_rsa(prm) {
  p = prm[0];
  q = prm[1];
  rsa = new RSA(p, q);
  start = Date.now();
  num = 20;
  console.assert(num === rsa.m(rsa.c(num)));
  console.log(`RSA for ${p}, ${q} PASSED in ${Date.now() - start}ms`);
}

function test_encryption_big() {
  // """
  // See https://www.machinelearningplus.com/python/parallel-processing-python/ for more on parallel processing.
  // This function compares sequential and parallel processing for the same test cases.
  // """

  filename = "bigPrimes.txt";
  // f = fs.readFileSync(filename)
  var lineReader = require("readline").createInterface({
    input: require("fs").createReadStream(filename),
  });

  let i = 0;
  primeTuple = [];
  primes = [];

  lineReader.on("line", function (line) {
    p = parseInt(line);
    if (!isNaN(p)) {
      if (i % 2 === 0) {
        if (primeTuple.length === 2) primes.push(primeTuple);
        primeTuple = [];
      }
      primeTuple.push(p);
      //console.log("Line from file:", i, p);
      i++;
    }
  });

  lineReader.on("close", function () {
    // Sequential execution
    console.log("Sequential execution tests");
    start = Date.now();
    for (const prm of primes) test_rsa(prm);
    end = Date.now();
    console.log((end - start) / 100 + "s");
  });
}

test_smallest_coprime();
test_lcm();
test_encryption_boundary();
test_encryption_big();
console.log("All tests passed");
