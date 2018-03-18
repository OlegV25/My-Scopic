import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './SmartAvatar.styl'

class SmartAvatar extends Component {
  getMY = () => {
    const { myUser } = this.props
    const { username = '' } = myUser
    const res = username[0] + username[1] || ''
    return res.toUpperCase()
  }
  getRandomColor = () => {
    let letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }
  render () {
    const { style = {} } = this.props
    const letters = this.props.letters ? this.props.letters.slice(0, 2).toUpperCase() : ''
    return <div className='SmartAvatar-circle' style={{...style, backgroundColor: this.getRandomColor()}}>{letters || this.getMY()}</div>
  }
}

SmartAvatar.propTypes = {
  letters: PropTypes.string,
  myUser: PropTypes.object,
  style: PropTypes.object
}
const mapStateToProps = state => ({
  myUser: state.security.myUser
})
export default connect(mapStateToProps)(SmartAvatar)
