var dataMasker = {};

dataMasker.compile = function dataMaskerMask(value, mask, maskCharacter) {
  if (!value) {
    return value;
  }

  maskCharacter = maskCharacter || '?';
  var maskedValue = '';
  var maskCount = mask.length;
  var currentIndex = 0;

  for(var x = 0; x < maskCount; x += 1) {
    if (mask[x] === maskCharacter) {
      if (!value[currentIndex]) {
        break;
      }

      maskedValue += value[currentIndex];
      currentIndex += 1;
    } else {
      maskedValue += mask[x]
    }
  }

  return maskedValue;
};

dataMasker.uncompile = function dataMaskerUnmask(value, mask, maskCharacter) {
  if (!value) {
    return value;
  }

  maskCharacter = maskCharacter || '?';
  var unmaskedValue = '';
  var maskCount = mask.length;
  var currentIndex = 0;

  for(var x = 0; x < maskCount; x += 1) {
    if (mask[x] === maskCharacter) {
      if (!value[currentIndex]) {
        break;
      }

      unmaskedValue += value[currentIndex];
      currentIndex += 1;
    } else if (mask[x] === value[x]) {
      currentIndex += 1;
    }
  }

  return unmaskedValue;
};

dataMasker.isCompiled = function dataMaskerIsMasked(value, mask, maskCharacter) {
  if (!value) {
    return false;
  }

  maskCharacter = maskCharacter || '?';
  var isMasked = value.length <= mask.length;
  var maskCount = mask.length;
  var currentIndex = 0;

  for(var x = 0; x < maskCount; x += 1) {
    if (!value[x]) {
      break;
    } else if (mask[x] === maskCharacter) {
      continue;
    } else if (mask[x] !== value[x]) {
      isMasked = false;
      break;
    }
  }

  return isMasked;
};

dataMasker.compiledIndexToUncompiledIndex = function dataMaskerMaskedIndexToUnmaskedIndex(index, mask, maskCharacter) {
  maskCharacter = maskCharacter || '?';
  var newIndex = -1;
  var currentIndex = 0;
  var countDown = index;

  do {
    if (mask[currentIndex] === maskCharacter) {
      newIndex += 1;
    }

    currentIndex += 1;
    countDown -= 1;
  } while (countDown >= 0)

  if (newIndex < 0) {
    newIndex = 0;
  }

  return newIndex;
};

dataMasker.uncompiledIndexToCompiledIndex = function dataMaskerUnmaskedIndexToMaskedIndex(index, mask, maskCharacter) {
  maskCharacter = maskCharacter || '?';
  var newIndex = -1;
  var countDown = index;
  var tempBeginningIndex = 0;

  do {
    if (mask[newIndex] === maskCharacter) {
      countDown -= 1;
    }

    if (countDown >= 0) {
      newIndex += 1;
    }

    if (newIndex >= (mask.length - 1)) {
      countDown = -1;
    }
  } while (countDown >= 0)

  if (newIndex < 0) {
    newIndex = 0;
  }

  return newIndex;
};

module.exports = dataMasker;