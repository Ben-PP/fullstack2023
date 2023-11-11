import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div className={props.className}>
      <div style={hideWhenVisible}>
        <Button
          id='new-blog'
          onClick={toggleVisibility}
          text={props.buttonLabel}
        />
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button id='#new-blog' onClick={toggleVisibility} text='cancel' />
      </div>
    </div>
  )
})
Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
