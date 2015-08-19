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
  var newIndex = 0;
  var currentIndex = 0;
  var countDown = index;
  var decreaseIndex = false;

  while (countDown >= 0) {
    if (mask[currentIndex] === maskCharacter) {
      newIndex += 1;
      decreaseIndex = false;
    //NOTE: need to account for end of string index finding
    } else if (mask[currentIndex] === undefined) {
      newIndex += 1;
      countDown = 0;
      decreaseIndex = false;
    } else {
      //NOTE
      decreaseIndex = true;
    }

    currentIndex += 1;
    countDown -= 1;
  }

  if(decreaseIndex === false) {
    newIndex -= 1;
  }

  if (newIndex < 0) {
    newIndex = 0;
  }

  return newIndex;
};

dataMasker.uncompiledIndexToCompiledIndex = function dataMaskerUnmaskedIndexToMaskedIndex(index, mask, maskCharacter) {
  maskCharacter = maskCharacter || '?';
  var newIndex = 0;
  var countDown = index;
  var tempBeginningIndex = 0;

  while (countDown >= 0) {
    if (mask[newIndex] === maskCharacter) {
      countDown -= 1;
    }

    if (countDown >= 0) {
      newIndex += 1;
    }

    if (newIndex >= mask.length) {
      countDown = -1;
    }
  }

  if (newIndex < 0) {
    newIndex = 0;
  }

  return newIndex;
};

module.exports = dataMasker;