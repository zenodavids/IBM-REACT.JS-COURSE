/** Props - short for "properties"
 * used to pass data from child to parent react components
 * props are read-only

 * * Behavior
 * Store the value of attributes a tag and work like the HTML attributes
 * function arguments can be passed to the component
 * props are immutable and cannot be modified from inside the component
 * should not be changed in a child component
 * allow child components to access methods defined in the parent component
 */

// ? ===== example of props in a class component ======

// child component
class TestComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div>Hello {this.props.name}</div>
  }
}

// passing the props as example to the Parent component
;<>
  // passing the props as example to the Parent component
  <TestComponent name='John' />
  <TestComponent name='Jim' />
</>
