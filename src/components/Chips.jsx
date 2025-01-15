import React from 'react'
import clsx from 'clsx'

export default function Chips(props) {
  const className=clsx({chips:true,lost:(props.ind<props.wrongGuessCount)})
    const styles={
        backgroundColor:props.backgroundColor,
        color:props.color,

    }
  return (
    <div className={className}style={styles} >
      {props.name}
    </div>
  )
}
