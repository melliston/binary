/**
 * Sum function that bitwise XOR to see if there should be a 1 or a 0 returned.
 * @param {int} a The 1st bit we are wanting to sum using XOR;
 * @param {int} b The 2nd bit we are wanting to sum using XOR;
 * @return {int} Returns a 1 if either a or b are present but not both. Returns 0 if both are 0 are if both a and b are 1.
 */
sum = (a,b) => {
  return a ^ b;
}

/**
 * Carry function that uses a bitwise & to see if there is a carry from the two digits we are adding.
 * @param {int} a The 1st bit we are wanting to carry.
 * @param {int} a The 1st bit we are wanting to carry.
 * @return {int} Returns 1 if a and b are both 1 or 0 in all other instances.
 */
carry = (a,b) => {
  return a & b;
}

/**
 * The half adder used to carry out the first step in the addition. Calculates the sum and the carry for the binary adder.
 * @param {int} a The first bit we want to add.
 * @param {int} b The second bit we want to add.
 * @return {Object} An object is returned with the sum and carry values that were passed to the function.
 */
halfAdder = (a,b) => {
  return {
    sum: sum(a, b),
    carry: carry(a, b),
  }
}

/**
 * The Full Adder checks to see if there is a sum and a carry bit to return.
 * Uses two half adders to perform the sum addition and the carry addition.
 * @param {int} a 1st bit To Add
 * @param {int} b 2nd bit To Add
 * @param {int} c Carry In, defaults to 0.
 * @return {Object} Returns an object with the sum and carry result from the passed.
 */
adder = (a, b, c = 0) => {
  const cA = halfAdder(a, b);
  const sA = halfAdder(c, cA.sum);
  return {
    sum: sA.sum,
    carry: sA.carry | cA.carry,
  }
}

/**
 * The add function that handles the adding of the bits.
 * @param {Array} a The first binary array we are wanting to add.
 * @param {Array} b The second binary array we are wanting to add.
 * @param {int} c The Carry In. Used from the previous add. Defaults to 0
 * @param {Array} total The current total of the addition.
 * @return {Array} Returns the total of the passed binary addition in array 
 */
add = (a, b, c = 0, total = []) => {
  const r = adder(a.pop(),b.pop(), c);
  total.unshift(r.sum);
  if (!r.carry && a.length === 0) {
    return total;
  }
  return add(a, b, r.carry, total);
}
