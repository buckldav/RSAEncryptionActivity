function gcd_two_numbers(x, y) {
  if (typeof x !== "number" || typeof y !== "number") return false;
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}

function modInverse(e, l) {
  for (let d = 0; d < l; d++) {
    if ((e * d) % l === 1) {
      return d;
    }
  }
  return NaN;
}

class RSA {
  static lcm(a, b) {
    // """
    // Returns the least common multiple of a and b
    // """

    return parseInt(Math.abs(a * b) / gcd_two_numbers(a, b));
  }

  static smallest_coprime(a) {
    // """
    // It doesn't really have to be the smallest coprime for RSA,
    // but smaller numbers make computability easier.
    // It's also okay to assume that a coprime will pop up soon because the probability of two numbers being coprime is about 61%. See
    // https://en.wikipedia.org/wiki/Coprime_integers#Probability_of_coprimality
    // https://www.geeksforgeeks.org/check-two-numbers-co-prime-not/
    // """

    if (!Number.isInteger(a) || a <= 2) {
      throw new Exception("a must be an integer greater than 2");
    }
    for (let b = 2; b < a; b++) {
      if (gcd_two_numbers(a, b) === 1) {
        return b;
      }
    }
  }

  constructor(p, q) {
    // """
    // From https://en.wikipedia.org/wiki/RSA_(cryptosystem)#Encryption
    // 1. Choose two distinct prime numbers, such as p=61 and q=53
    // 2. Compute n = pq giving n=61*53=3233
    // 3. Compute the Carmichael's totient function of the product as λ(n) = lcm(p − 1, q − 1) giving λ(3233)=lcm(60,52)=780
    // 4. Choose any number 1 < e < 780 that is coprime to 780. Choosing a prime number for e leaves us only to check that e is not a divisor of 780. Let e=17
    // 5. Compute d, the modular multiplicative inverse of e (mod λ(n)) yielding, d=413, as 1=(17*413)%780 (see https://stackoverflow.com/questions/4798654/modular-multiplicative-inverse-function-in-python)
    // """

    this.p = p;
    this.q = q;
    this.n = p * q;
    this.l = RSA.lcm(p - 1, q - 1);
    this.e = RSA.smallest_coprime(this.l);
    this.d = modInverse(this.e, this.l);
  }

  c(m) {
    // """
    // Public key (for encryption)
    // c(m) = m^e % n
    // where m is the message and c is the encrypted message
    // """

    return Math.pow(m, this.e) % this.n;
  }

  m(c) {
    // """
    // Private key (for decryption)
    // m(c) = c^d % n
    // """
    // console.log(BigInt(c) ** BigInt(this.d));
    return parseInt(BigInt(c) ** BigInt(this.d) % BigInt(this.n));
  }
}

module.exports = RSA;
// TODO: input must be an integer and less than n

rsa = new RSA(61, 53);
original = 1600; //int(input(f"what would you like to encrypt? "))
encrypted = rsa.c(original);
decrypted = rsa.m(encrypted);
console.log("original:", original);
console.log("encrypted:", encrypted);
console.log("decrypted:", decrypted);
