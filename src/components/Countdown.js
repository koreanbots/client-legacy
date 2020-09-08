import React, { useState, useEffect } from 'react'

function Countdown(props) {
    const [counter, setCounter] = useState(props.time)
    useEffect(() => {
        const timer =
          counter > 0 && setInterval(() => setCounter(counter - 1), 1000)
        return () => {
            clearInterval(timer)
            if(props.after) props.after()

        }
      }, [counter])
    return counter
}

export default Countdown