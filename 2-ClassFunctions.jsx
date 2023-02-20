// Object-oriented programming was made feasible in JavaScript with the introduction of class.
// Class is a template or blueprint for creating objects.
// Classes in JavaScript are built on prototypes. Prototype is a property of all JavaScript objects, including functions.

function Person(name, age) {
  this.name = name
  this.age = age
  return this
}
// Here, "this" refers to the current object which is the "Person".
let person1 = Person('Jason', 20)
// prints the entire prototype of the Person object
console.log(person1)
// prints the name
console.log(person1.name) // Jason
// prints the age
console.log(person1.age) // 20

// =============== CONSTRUCTOR ====================

// Class can have a constructor, which is a method that is called when you want to create an object of class.

// The body of the class is the part that is in curly brackets.
// Here, 'Rectangle' is the general class.
// 'Rectangle' is the blueprint
class Rectangle {
  // The height and width are the properties. When you create a rectangle object, you pass the height and width as parameters to the constructor
  constructor(height, width) {
    // The properties are set to the current object that is being created, using "this" as the keyword.
    // The keyword helps to set the properties for the 'myRectangle' object.
    this.height = height
    this.width = width
    console.log('Rectangle Created!!!')
    console.log(`Height is ${this.height}`)
    console.log(`Width is ${this.width}`)
  }
}

// MyRectangle is an object constructed with the Rectangle class.
// an object of the class can be created using the new keyword.
let myRectangle = new Rectangle(10, 5)
console.log(myRectangle) // Rectangle { height: 10, width: 5}

// =============== INHERITANCE ====================

// a class can inherit from another class.
// The class that is inheriting one other class is called the "subclass".
// The "superclass" is the class being inherited by the subclass.
// The "subclass" inherits all the "attributes" and "methods" of the superclass.
// React components use inheritance to build user-defined components.

// The subclass has a special privilege to call the superclass constructor with the "super()" method call.

//! Super() in React component
// It is used when we need to access a few variables in the parent class.
// It returns an object which represents the parent class.
// he right way to use it is when the child class and parent class are from the same field.

// A square is a rectangle with the same value for width and height.
// Here, if the height is not the same as the width specified, the width will become equal to the height.
class Square extends Rectangle {
  constructor(height, width) {
    height === width ? super(height, width) : super(height, width)
  }
}

let mySquare = new Square(5, 5)
console.log(mySquare) // Square { height: 5, width: 5}
