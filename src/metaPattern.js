export class MetaPattern {
  constructor(values) {
    this.values = values;
  }

  get max() {
    return this.values.reduce((max, value) => Math.max(max, value), -Infinity);
  }

  get min() {
    return this.values.reduce((min, value) => Math.min(min, value), Infinity);
  }

  get integral() {
    return this.values.reduce((integral, value) => integral + value, 0);
  }

  get avg() {
    return this.integral / this.length;
  }

  get length() {
    return this.values.length;
  }

  static prefilled(length, defaultValue = 0) {
    const values = new Array(length).fill(defaultValue);
    return new this(values);
  }

  static byFn(length, fn) {
    const pattern = this.prefilled(length);
    pattern.values = pattern.values.map((value, idx) => fn(idx));
    return pattern;
  }
  
  circularConvolve(kernel) {
    const output = MetaPattern.prefilled(this.length, 0);
    for (let i = 0; i < this.length; i++) {
      let sum = 0;
      for (let k = 0; k < kernel.length; k++) {
        const ipkm = (i - k + this.length) % this.length;
        const element1 = this.values[ipkm];
        const element2 = kernel.values[k];
        sum += element1 * element2;
      }
      output.values[i] = sum;
    }
    return output;
  }

  remap(fn) {
    const values = this.values.map((value,idx) => fn(value, idx));
    return new MetaPattern(values);
  }

  static applyScalar(a, b, fn) {
    const output = MetaPattern.prefilled(a.length);
    for (let idx = 0; idx < a.length; idx++) {
      const elementA = a.values[idx];
      output.values[idx] = fn(elementA, b, idx);
    }
    return output;
  }

  static applyVector(a, b, fn) {
    if (a.length !== b.length) {
      throw new Error('size not same');
    }
    const output = MetaPattern.prefilled(a.length);
    for (let idx = 0; idx < a.length; idx++) {
      const elementA = a.values[idx];
      const elementB = b.values[idx];
      output.values[idx] = fn(elementA, elementB, idx);
    }
    return output;
  }
  
  applyScalarOrVector(other, fn) {
    if (other instanceof MetaPattern) {
      return MetaPattern.applyVector(this, other, fn);
    } else {
      return MetaPattern.applyScalar(this, other, fn);  
    }
  }
  
  add(other) {
    return this.applyScalarOrVector(other, (a, b) => a + b);
  }

  mul(other) {
    return this.applyScalarOrVector(other, (a, b) => a * b);
  }
  
  pow(other) {
    return this.applyScalarOrVector(other, (a, b) => a ** b);
  }
  
  getAsciiGraphText() {
    let text = '';
    const height = 9;
    for (let rowIdx = 0; rowIdx <= height; rowIdx++) {
      for (let index = 0; index < this.length; index++) {
        const value = Math.round(this.values[index] * (height + 1));
        const char = (value <= 9) ? value.toString() : String.fromCharCode(65 + value - 10); // 65 charcode is the capital 'A'
        const maskedChar = (value >= height - rowIdx) ? char : ' ';
        text += maskedChar;
      }
      text += '\n';
    }
    return text;
  }
  
  logInfo(name = 'unnamed') {
    const asciiGraphText = this.getAsciiGraphText();
    const infoText = `Pattern: ${name} | Lenght: ${this.length} | Min: ${this.min.toPrecision(5)} | Max: ${this.max.toPrecision(5)} | Integral: ${this.integral.toPrecision(5)} | Avg: ${this.avg.toPrecision(5)}`;
    console.log('-'.repeat(this.length));
    console.log(infoText);
    console.log(asciiGraphText);
    console.log();
    console.log();

  }

  static random(length) {
    return this.byFn(length, () => Math.random());
  }
  
  static spiked(lengthExponent, spikeExponent = 1) {
    const length = 2 ** lengthExponent;
    return this.byFn(length, (idx)=> {
      let value = 0;
      for (let dividerExponent = lengthExponent; dividerExponent > 0; dividerExponent--) {
        const divider = 2 ** dividerExponent;
        const modulo = idx % divider;
        if (modulo === 0) {
          value = (dividerExponent / lengthExponent) ** spikeExponent;
          break;
        }
      }
      return value;
    });
  }

  static swooshed(lengthExponent, swooshExponent = 3) {
    const length = 2 ** lengthExponent;
    return this.byFn(length, (idx) => idx / length).pow(swooshExponent);
  }

}
