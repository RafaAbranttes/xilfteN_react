import React from 'react'

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const value= props.valor
    console.log(value)

    return (
        <div>
            {value}
        </div>
    )
}
