import { assert } from 'chai';

import { MetaPattern } from '../src/metaPattern.js';

describe('MetaPattern - Basic Tests', function() {

  it('should create a pattern with correct length, integral, avg, min and max', function() {
    const pattern = new MetaPattern([1, 2, 3]);
    assert.equal(pattern.length, 3);
    assert.equal(pattern.integral, 6);
    assert.equal(pattern.avg, 2);
    assert.equal(pattern.max, 3);
    assert.equal(pattern.min, 1);
  });

  it('should create a MetaPattern with default values (all zeros)', function() {
    const pattern = MetaPattern.prefilled(5);
    assert.equal(pattern.length, 5);
    assert.deepEqual(pattern.values, [0, 0, 0, 0, 0]);
  });

  it('should create a MetaPattern with specified custom values', function() {
    const pattern = MetaPattern.prefilled(3, 2);
    assert.equal(pattern.length, 3);
    assert.deepEqual(pattern.values, [2, 2, 2]);
  });
  
  it('should create a pattern by function applied to each index', function() {
    const byFnPattern = MetaPattern.byFn(4, (i) => i * 2);
    assert.deepEqual(byFnPattern.values, [0, 2, 4, 6]);
  });

});

describe('MetaPattern - Functionality Tests', function() {
  
  // Remap
  it('should remap values based on a function applied to value and index', function() {
    const prefilled666 = MetaPattern.prefilled(3, 6);
    const remapped = prefilled666.remap((v, i) => (v + i) * 10);
    assert.deepEqual(remapped.values, [60, 70, 80]);
  });

  // Static Apply Scalar
  it('should apply a scalar function to each value', function() {
    const prefilled666 = MetaPattern.prefilled(3, 6);
    const scalarApplied = MetaPattern.applyScalar(prefilled666, 2, (a, b) => a * b);
    assert.deepEqual(scalarApplied.values, [12, 12, 12]);
  });

  // Static Apply Vector (with assertion)
  it('should throw error for applyVector with different lengths', function() {
    const prefilled666 = MetaPattern.prefilled(3, 6);
    const prefilled66 = MetaPattern.prefilled(2, 6);
    assert.throws(function() {
      MetaPattern.applyVector(prefilled66, prefilled666, (a, b) => a + b);
    });
  });

  it('should perform applyVector with vectors of same length', function() {
    const prefilled333 = MetaPattern.prefilled(3, 3);
    const prefilled666 = MetaPattern.prefilled(3, 6);
    const vectorApplied = MetaPattern.applyVector(prefilled333, prefilled666, (a, b) => a + b);
    assert.deepEqual(vectorApplied.values, [9, 9, 9]);
  });
  
  it('should apply a scalar function to each value', function() {
    const prefilled666 = MetaPattern.prefilled(3, 6);
    const scalarApplied = MetaPattern.applyScalar(prefilled666, 2, (a, b) => a * b);
    assert.deepEqual(scalarApplied.values, [12, 12, 12]);
  });

  // ApplyScalarOrVector
  it('should apply function to pattern and scalar or vector based on type', function() {
    const prefilled333 = MetaPattern.prefilled(3, 3);
    const prefilled666 = MetaPattern.prefilled(3, 6);

    const vectorApplied = prefilled333.applyScalarOrVector(prefilled666, (a, b) => a + b);
    assert.deepEqual(vectorApplied.values, [9, 9, 9]);

    const scalarApplied = prefilled333.applyScalarOrVector(6, (a, b) => a + b);
    assert.deepEqual(scalarApplied.values, [9, 9, 9]);
  });

  // Add, Mul, Pow
  it('should add, multiply and exponentiate the pattern', function() {
    const prefilled333 = MetaPattern.prefilled(3, 3);
    const prefilled666 = MetaPattern.prefilled(3, 6);
    
    const added = prefilled333.add(prefilled666);
    assert.deepEqual(added.values, [9, 9, 9]);
    const multiplied = prefilled333.mul(2);
    assert.deepEqual(multiplied.values, [6, 6, 6]);
    const powered = prefilled333.pow(2);
    assert.deepEqual(powered.values, [9, 9, 9]);
  });
});

describe('MetaPattern - Circular Convolution Tests', function() {
  it('should perform circular convolution (identity kernel)', function() {
    const pattern = new MetaPattern([1, 2, 3, 4]);
    const kernel = new MetaPattern([1, 0, 0, 0]);
    const output = pattern.circularConvolve(kernel);
    assert.equal(output.length, 4);
    assert.deepEqual(output.values, [1, 2, 3, 4]);
  });

  it('should perform circular convolution (shift left)', function() {
    const pattern = new MetaPattern([1, 2, 3, 4]);
    const kernel = new MetaPattern([0, 0, 0, 1]);
    const output = pattern.circularConvolve(kernel);
    assert.equal(output.length, 4);
    assert.deepEqual(output.values, [2, 3, 4, 1]);
  });

  it('should perform circular convolution (shift right)', function() {
    const pattern = new MetaPattern([1, 2, 3, 4]);
    const kernel = new MetaPattern([0, 1, 0, 0]);
    const output = pattern.circularConvolve(kernel);
    assert.equal(output.length, 4);
    assert.deepEqual(output.values, [4, 1, 2, 3]);
  });

  it('should perform circular convolution (complex)', function() {
    const pattern = new MetaPattern([1, 2, 3]);
    const kernel = new MetaPattern([1, 0, -1]);
    const output = pattern.circularConvolve(kernel);
    assert.equal(output.length, 3);
    assert.deepEqual(output.values, [-1, -1, 2]);
  });

});
