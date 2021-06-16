import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <div>
            <Spinner
                animation="grow"
                variant="secondary"
                style={{
                  width: "50px",
                  height: "50px",
                  margin: "auto",
                  display: "block",
                }}
              />
        </div>
    )
}

export default Loader
