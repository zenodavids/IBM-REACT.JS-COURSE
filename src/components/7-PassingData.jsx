// ? ======= Passing data (props) and States between components =======

/* *component Lifecycle phases
 * Mounting = component creation
 * updating = component change of state or props(properties)
 * Unmounting = component removal
 * */

/* ****************** Mounting = component creation

  When a component is created, four methods are called in the exact order below;
  * 1. constructor()
  constructs the object, may call the super constructor with the props object if any specific props are being set.
  * 2. getDerivedStateFromProps()
   used only when the state depends on the changes to props
  * 3. render()
    is mandatory in a React component. This method makes the component appear. It must return a DOM element and it can return only one root element, which may or may not have many nested child elements.
  * 4. componentDidMount()
    is invoked immediately after a component is mounted or inserted into the DOM tree.

*
*/

// Example of mounting

// ================= this is invoked first ==================
class Mounting extends React.Component {
  constructor(props) {
    super(props)
    console.log('inside the constructor')
  }
  // ========== this is invoked last ==================
  componentDidMount = () => {
    console.log('inside the component Did Mount')
  }
  // ========== this is invoked second ==================
  render() {
    console.log('inside the render method')
    return <div>This component is rendered</div>
  }
}

/////////////////////////////////////////////////////////////////////////

/* ******************updating = component change of state or props(properties)
 In updating a component, five methods are called in this order.

 * getDerivedStateFromProps()
 is used only when the state depends on the changes to props.
 * shouldComponentUpdate()
returns true by default. Every time there is a change in state, this method is called to check if the component should update.
It is not called during the initial creation of the component.
! Make this method return "false" only if you don’t want to render the changes in state.
 * render()
 same render() method used in mounting, but here it updates the component.
 * getSnapshotBeforeUpdate()
 is invoked just before the changes are rendered.
 It helps keep track of what has changed.
 Any value returned by this lifecycle will be passed as a parameter to the componentDidUpdate() method
 * componentDidUpdate()
 is invoked immediately after updating occurs.
 */

// Example of updating when a button is clicked

class Updating extends React.Component {
  state = { counter: 0 }
  incrementCounter = () =>
    this.setState({ counter: parseInt(this.state.counter) + 1 })

  shouldComponentUpdate() {
    console.log('inside the shouldComponentUpdate method')
    return true
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('inside the getSnapshotBeforeUpdate method')
    console.log(`previous Counter is ${prevState.counter}`)
    console.log(`New Counter is ${this.state.counter}`)
    return prevState
  }
  componentDidUpdate() {
    console.log('inside the componentDidUpdate method')
  }

  render() {
    return (
      <div>
        <button onClick={this.incrementCounter}>Click to increment</button>
        {this.state.counter}
      </div>
    )
  }
}

/////////////////////////////////////////////////////////////////////////////////

/* ****************** Unmounting = component removal
 *  When a component is unmounted or removed from the DOM tree, the componentWillUnmount() method is called
 */

// Example of Unmounting
// here we have two components - UnmountInner and Umount
// unmount component shows its div (<div>UnmountInner</div> ) and after five seconds, UnmountInner's div (<div>Unmounting</div>) replaces unmount div

// Define a React component called UnmountInner that extends React.Component
class UnmountInner extends React.Component {
  // Define a method called componentWillUnmount that will be called when the component is about to be unmounted
  componentWillUnmount() {
    // Log a message to the console
    console.log('inside the componentWillUnmount method')
  }
  // Define a method called render that returns a <div> element with the text "Unmounting"
  render() {
    return <div>Show this div Second after 5seconds</div>
  }
}

// Define a React component called Unmount that extends React.Component
class Unmount extends React.Component {
  // Define the initial state of the component
  state = { innerComponent: <UnmountInner /> }
  // Define a method called componentDidUnmount that will be called when the component is about to be unmounted
  componentDidUnmount() {
    // Log a message to the console
    console.log('inside the componentWillUnmount method')
    // Set a timeout to change the innerComponent to a <div> element that displays the text "UnmountInner" after 5 seconds
    setTimeout(
      () => this.setState({ innerComponent: <div>Show this div first</div> }),
      5000
    )
  }
  // Define a method called render that returns a <div> element with the inner component
  render() {
    // Log a message to the console
    console.log('inside the render method')
    return <div>{this.state.innerComponent}</div>
  }
}
// !===========================================================================

// ? ====================== Passing data between components ======================

/* *  Three types of relationships when passing data;
 * parent component to child component using props,
 * child component to parent component using callbacks,
 * between siblings components using Redux.
 */

//***************** Example of "passing data from parent component to child component using props"
// inputs the color in the first input and it changes to that color in the name input

// the parent component
class ParentToChild extends React.Component {
  state = { childColor: 'green', name: 'john' }
  changeColor = () => {
    const newColor = document.getElementById('colorbox').value
    this.setState({ childColor: newColor })
  }
  changeName = () => {
    const newName = document.getElementById('namebox').value
    this.setState({ name: newName })
  }
  render() {
    console.log('Inside render')
    return (
      <div>
        Color <input type='text' onChange={this.changeColor} id='colorbox' />
        <br />
        Name <input type='text' onChange={this.changeName} id='namebox' />
        <ParentToChildInner
          color={this.state.childColor}
          name={this.state.name}
        />
      </div>
    )
  }
}

// the child component passes color and input
class ParentToChildInner extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const txtStyle = { color: this.props.color }
    return <span style={txtStyle}>{this.props.name}</span>
  }
}

// Here, you have two classes "ParentToChildInner" and "ParentToChild". The "ParentToChild" component contains the "ParentToChildInner" component. "ParentToChild" is the parent and "ParentToChildInner" is the child. "ParentToChild" sets the property color and name for "ParentToChildInner". The data is passed to the child every time a new value is entered in the input boxes in the parent.

//////////////////////////////////////////////////////////////////

// ***************** Example of passing data from child to parent using callback

// Parent Component

class ChildToParent extends React.Component {
  state = { message: '' }
  // callback function that takes a string argument
  funct1 = (childData) => {
    this.setState({ message: childData })
  }
  render() {
    return (
      <div>
        <ChildToParentInner parentCallback={this.func1} />
        <p>{this.state.message}</p>
      </div>
    )
  }
}

// child component
class ChildToParentInner extends React.Component {
  // This method invokes setInterval at a 1 second interval
  sendData = () => {
    // every 1 second, the current time is obtained and the method set as parentCallback is invoked, passing the time.
    setInterval(() => {
      const currTime = Date()
      this.props.parentCallback(currTime)
    }, 1000)
  }
  // invoke the sendData method in the parent component
  componentDidMount() {
    this.sendData()
  }
  render() {
    return <div></div>
  }
}
