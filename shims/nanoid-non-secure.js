// This is a simple shim for nanoid/non-secure
// Based on the original nanoid non-secure implementation

let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

function randomByte() {
  return Math.floor(Math.random() * 256);
}

export function customAlphabet(alphabet, defaultSize = 21) {
  return function (size = defaultSize) {
    let id = '';
    let bytes = new Uint8Array(size);
    for (let i = 0; i < size; i++) {
      bytes[i] = randomByte();
    }
    let j = 0;
    while (j < size) {
      id += alphabet[bytes[j] % alphabet.length];
      j++;
    }
    return id;
  };
}

export function nanoid(size = 21) {
  let id = '';
  let bytes = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    bytes[i] = randomByte();
  }
  let j = 0;
  while (j < size) {
    id += urlAlphabet[bytes[j] % 64];
    j++;
  }
  return id;
}

export default { nanoid, customAlphabet };
