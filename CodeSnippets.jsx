//! ============= Custom styling and click events using props ====================

const Styling = (props) => {
  const customStyling = {
    color: props.color,
    fontSize: `${props.size}px`,
  }
  return (
    <div>
      {/* use props with styling */}
      <span style={customStyling}>Hello World!</span>
      {/* use props with click events */}
      <button type='submit' onClick={props.clickEvent}>
        Click me
      </button>
    </div>
  )
}

// use the above component in another component,
const App = () => {
  return (
    <div>
      <Styling
        color='blue'
        size='25'
        clickEvent={() => {
          alert('You Clicked me')
        }}
      />
    </div>
  )
}
// ! ==============================================================================

//! ====== change the div container (<div>Show this div first</div>) to another (<div>Show this div Second after 5seconds</div>) after 5 sec ======

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

// ! ==============================================================================

//! inputs the color in the first input and it changes to that color in the name input

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

// ! ==============================================================================

// ! set the time to change every 1 second

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
