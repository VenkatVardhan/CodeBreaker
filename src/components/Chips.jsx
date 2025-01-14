import React from 'react'

export default function Chips(props) {
    const styles={
        backgroundColor:props.backgroundColor,
        color:props.color,

    }
  return (
    <div className='chips'style={styles} >
      {props.name}
    </div>
  )
}
