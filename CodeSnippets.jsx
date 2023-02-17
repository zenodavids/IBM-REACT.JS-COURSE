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
// ==============================================================================
