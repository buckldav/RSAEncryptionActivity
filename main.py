import math


class RSA:
    @staticmethod
    def lcm(a, b):
        """
        Returns the least common multiple of a and b
        """

        return abs(a * b) // math.gcd(a, b)

    @staticmethod
    def smallest_coprime(a):
        """
        It doesn't really have to be the smallest coprime for RSA,
        but smaller numbers make computability easier.
        It's also okay to assume that a coprime will pop up soon because the probability of two numbers being coprime is about 61%. See
        https://en.wikipedia.org/wiki/Coprime_integers#Probability_of_coprimality
        https://www.geeksforgeeks.org/check-two-numbers-co-prime-not/
        """

        if not type(a) is int or not a > 2:
            raise ValueError("a must be an integer greater than 2")
        for b in range(2, a):
            if math.gcd(a, b) == 1:
                return b

    def __init__(self, p, q):
        """
        From https://en.wikipedia.org/wiki/RSA_(cryptosystem)#Encryption
        1. Choose two distinct prime numbers, such as p=61 and q=53
        2. Compute n = pq giving n=61*53=3233
        3. Compute the Carmichael's totient function of the product as λ(n) = lcm(p − 1, q − 1) giving λ(3233)=lcm(60,52)=780
        4. Choose any number 1 < e < 780 that is coprime to 780. Choosing a prime number for e leaves us only to check that e is not a divisor of 780. Let e=17
        5. Compute d, the modular multiplicative inverse of e (mod λ(n)) yielding, d=413, as 1=(17*413)%780 (see https://stackoverflow.com/questions/4798654/modular-multiplicative-inverse-function-in-python)
        """

        self.p = p
        self.q = q
        self.n = p * q
        self.l = self.lcm(p - 1, q - 1)
        self.e = self.smallest_coprime(self.l)
        self.d = pow(self.e, -1, self.l)

    def c(self, m):
        """
        Public key (for encryption)
        c(m) = m^e % n
        where m is the message and c is the encrypted message
        """

        return m**self.e % self.n

    def m(self, c):
        """
        Private key (for decryption)
        m(c) = c^d % n
        """

        return c**self.d % self.n


# TODO: input must be an integer and less than n
if __name__ == "__main__":
    rsa = RSA(61, 53)
    original = int(input(f"what would you like to encrypt? "))
    encrypted = rsa.c(original)
    decrypted = rsa.m(encrypted)
    print("original:", original)
    print("encrypted:", encrypted)
    print("decrypted:", decrypted)
