import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  // css inline styles
  /*
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  */

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      { !visible ?
        (
          <div>
            <button onClick={toggleVisibility}>{props.buttonLabel}</button>
          </div>
        ) :
        (
          <div>
            {props.children} {/* referencing the child components of the component */}
            <button onClick={toggleVisibility}>cancel</button>
          </div>
        )
      }
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable