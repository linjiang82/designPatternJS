enum Size {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

enum Color {
  red = 'red',
  green = 'green',
  yellow = 'yellow',
}

class Product {
  name: string;
  color: Color;
  size: Size;

  constructor(name: string, color: Color, size: Size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

const apple = new Product('apple', Color.red, Size.small);
const tree = new Product('tree', Color.green, Size.large);
const house = new Product('house', Color.green, Size.large);

const products = [apple, tree, house];

// It is bad, because we could have more props to be filtered agaist
// and even some combination of those props
class BadFilter {
  filterByColor(products: Product[], color: Color) {
    for (let p of products.filter((item) => item.color === color)) {
      console.log(`The color of ${p.name} is ${color}`);
    }
  }
}

const bf = new BadFilter();
bf.filterByColor(products, Color.red);

interface Specification {
  isIdentified: (product: Product) => boolean;
}

class SizeSpecification implements Specification {
  size: Size;
  constructor(size: Size) {
    this.size = size;
  }
  isIdentified = (item: Product) => item.size === this.size;
}

class ColorSpecification implements Specification {
  color: Color;
  constructor(color: Color) {
    this.color = color;
  }
  isIdentified = (item: Product) => item.color === this.color;
}

class AndSpecification implements Specification {
  specs: Specification[];
  constructor(specs: Specification[]) {
    this.specs = specs;
  }
  isIdentified = (product: Product): boolean => {
    return this.specs.every((spec) => spec.isIdentified(product));
  };
}

class BetterFlter {
  filter(products: Product[], spec: Specification) {
    return products.filter(spec.isIdentified);
  }
}

const gf = new BetterFlter();
for (let p of gf.filter(products, new ColorSpecification(Color.red))) {
  console.log(`The color of ${p.name} is ${Color.red}`);
}
for (let p of gf.filter(products, new SizeSpecification(Size.large))) {
  console.log(`The Size of ${p.name} is ${Size.large}`);
}
for (let p of gf.filter(
  products,
  new AndSpecification([
    new ColorSpecification(Color.green),
    new SizeSpecification(Size.large),
  ])
)) {
  console.log(`${p.name} is ${Color.red} and ${Size.large}`);
}
