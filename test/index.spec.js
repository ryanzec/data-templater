describe('data templater', function() {
  var dataTemplater = require('../index');
  var expect = require('chai').expect;

  describe("basic functionality", function() {
    it('should compile data', function() {
      expect(dataTemplater.compile('1', '???-???-????')).to.equal('1');
      expect(dataTemplater.compile('12', '???-???-????')).to.equal('12');
      expect(dataTemplater.compile('123', '???-???-????')).to.equal('123-');
      expect(dataTemplater.compile('1234', '???-???-????')).to.equal('123-4');
      expect(dataTemplater.compile('12345', '???-???-????')).to.equal('123-45');
      expect(dataTemplater.compile('123456', '???-???-????')).to.equal('123-456-');
      expect(dataTemplater.compile('1234567', '???-???-????')).to.equal('123-456-7');
      expect(dataTemplater.compile('12345678', '???-???-????')).to.equal('123-456-78');
      expect(dataTemplater.compile('123456789', '???-???-????')).to.equal('123-456-789');
      expect(dataTemplater.compile('1234567890', '|||-|||-||||', '|')).to.equal('123-456-7890');
    });

    it('should uncompile data', function() {
      expect(dataTemplater.uncompile('1', '???-???-????')).to.equal('1');
      expect(dataTemplater.uncompile('12', '???-???-????')).to.equal('12');
      expect(dataTemplater.uncompile('123', '???-???-????')).to.equal('123');
      expect(dataTemplater.uncompile('123-', '???-???-????')).to.equal('123');
      expect(dataTemplater.uncompile('123-4', '???-???-????')).to.equal('1234');
      expect(dataTemplater.uncompile('123-45', '???-???-????')).to.equal('12345');
      expect(dataTemplater.uncompile('123-456', '???-???-????')).to.equal('123456');
      expect(dataTemplater.uncompile('123-456-', '???-???-????')).to.equal('123456');
      expect(dataTemplater.uncompile('123-456-7', '???-???-????')).to.equal('1234567');
      expect(dataTemplater.uncompile('123-456-78', '???-???-????')).to.equal('12345678');
      expect(dataTemplater.uncompile('123-456-789', '???-???-????')).to.equal('123456789');
      expect(dataTemplater.uncompile('123-456-7890', '&&&-&&&-&&&&', '&')).to.equal('1234567890');
    });

    it('should determine as compiled', function() {
      expect(dataTemplater.isCompiled('1', '???-???-????')).to.be.true;
      expect(dataTemplater.isCompiled('12', '???-???-????')).to.be.true;
      expect(dataTemplater.isCompiled('123', '???-???-????')).to.be.true;
      expect(dataTemplater.isCompiled('123-', '???-???-????')).to.be.true;
      expect(dataTemplater.isCompiled('123-4', '???-???-????')).to.be.true;
      expect(dataTemplater.isCompiled('123-45', '???-???-????')).to.be.true;
      expect(dataTemplater.isCompiled('123-456', '???-???-????')).to.be.true;
      expect(dataTemplater.isCompiled('123-456-', '???-???-????')).to.be.true;
      expect(dataTemplater.isCompiled('123-456-7', '???-???-????')).to.be.true;
      expect(dataTemplater.isCompiled('123-456-78', '???-???-????')).to.be.true;
      expect(dataTemplater.isCompiled('123-456-789', '???-???-????')).to.be.true;
      expect(dataTemplater.isCompiled('123-456-7890', '***-***-****' , '*')).to.be.true;
    });

    it('should determine as not compiled', function() {
      expect(dataTemplater.isCompiled('1111', '???-???-????')).to.be.false;
      expect(dataTemplater.isCompiled('121-1111', '???-???-????')).to.be.false;
      expect(dataTemplater.isCompiled('123-111-11111', '???-???-????')).to.be.false;
      expect(dataTemplater.isCompiled('123-111-11111', '$$$-$$$-$$$$', '$')).to.be.false;
    });

    it('should be able to convert compiled index to uncopmpiled index', function() {
      expect(dataTemplater.compiledIndexToUncompiledIndex(0, '(???) ???-????')).to.equal(0);
      expect(dataTemplater.compiledIndexToUncompiledIndex(1, '(???) ???-????')).to.equal(0);
      expect(dataTemplater.compiledIndexToUncompiledIndex(2, '(???) ???-????')).to.equal(1);
      expect(dataTemplater.compiledIndexToUncompiledIndex(3, '(???) ???-????')).to.equal(2);
      expect(dataTemplater.compiledIndexToUncompiledIndex(4, '(???) ???-????')).to.equal(3);
      expect(dataTemplater.compiledIndexToUncompiledIndex(5, '(???) ???-????')).to.equal(3);
      expect(dataTemplater.compiledIndexToUncompiledIndex(6, '(???) ???-????')).to.equal(3);
      expect(dataTemplater.compiledIndexToUncompiledIndex(7, '(???) ???-????')).to.equal(4);
      expect(dataTemplater.compiledIndexToUncompiledIndex(8, '(???) ???-????')).to.equal(5);
      expect(dataTemplater.compiledIndexToUncompiledIndex(9, '(???) ???-????')).to.equal(6);
      expect(dataTemplater.compiledIndexToUncompiledIndex(10, '(???) ???-????')).to.equal(6);
      expect(dataTemplater.compiledIndexToUncompiledIndex(11, '(???) ???-????')).to.equal(7);
      expect(dataTemplater.compiledIndexToUncompiledIndex(12, '(???) ???-????')).to.equal(8);
      expect(dataTemplater.compiledIndexToUncompiledIndex(13, '(???) ???-????')).to.equal(9);
      expect(dataTemplater.compiledIndexToUncompiledIndex(14, '(???) ???-????')).to.equal(10);
    });

    it('should be able to convert uncompiled index to compiled index', function() {
      expect(dataTemplater.uncompiledIndexToCompiledIndex(0, '(???) ???-????')).to.equal(1);
      expect(dataTemplater.uncompiledIndexToCompiledIndex(1, '(???) ???-????')).to.equal(2);
      expect(dataTemplater.uncompiledIndexToCompiledIndex(2, '(???) ???-????')).to.equal(3);
      expect(dataTemplater.uncompiledIndexToCompiledIndex(3, '(???) ???-????')).to.equal(6);
      expect(dataTemplater.uncompiledIndexToCompiledIndex(4, '(???) ???-????')).to.equal(7);
      expect(dataTemplater.uncompiledIndexToCompiledIndex(5, '(???) ???-????')).to.equal(8);
      expect(dataTemplater.uncompiledIndexToCompiledIndex(6, '(???) ???-????')).to.equal(10);
      expect(dataTemplater.uncompiledIndexToCompiledIndex(7, '(???) ???-????')).to.equal(11);
      expect(dataTemplater.uncompiledIndexToCompiledIndex(8, '(???) ???-????')).to.equal(12);
      expect(dataTemplater.uncompiledIndexToCompiledIndex(9, '(???) ???-????')).to.equal(13);
      expect(dataTemplater.uncompiledIndexToCompiledIndex(10, '(???) ???-????')).to.equal(14);
    });
  });
});
