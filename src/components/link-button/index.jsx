import React from 'react'
import './index.less'

const LinkButton = (props) =>  {
    return (
        <button {...props} className="link-button">{props.children}</button>
    )
}

export default LinkButton