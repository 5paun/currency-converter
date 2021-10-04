import { IconButton } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { HighlightOff } from '@mui/icons-material'
import { useSelector } from 'react-redux'

import useStyles from './styles'

const modalRoot = document.querySelector('#root')

const Modal = ({ closeModal, children }) => {
  const el = useRef(document.createElement('div'))

  const currentTheme = useSelector(state => state.general.theme)

  const classes = useStyles({ currentTheme })

  useEffect(() => {
    modalRoot.appendChild(el.current)
    return () => modalRoot.removeChild(el.current)
  }, [])

  return (
    createPortal(
      <div className={classes.container}>
        {/* <div className="sidebar-overlay" onClick={closeModal} /> */}
        <div className={classes.wrapper}>
            <IconButton
              className={classes.buttonClose}
              onClick={closeModal}
            >
              <HighlightOff fontSize="large"/>
            </IconButton>
            {children}
        </div>
      </div>,
      el.current,
    )
  )
}

export default Modal

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}
