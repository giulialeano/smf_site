import { useState, useEffect } from 'react'

const BinaryFloat = () => {
  const messages = [
    "01001000 01101111 01110010 01101001 01111010 01101111 01101110 01110100 01100101 01110011",
    "01001001 01001110 01010100 01000101 01001100 01001001 01000111 01000101 01001110 01000011 01001001 01000001",
    "01000010 01010101 01010010 01000001 01000011 01001111 00100000 01001110 01000101 01000111 01010010 01001111",
    "01000110 01001001 01010011 01001001 01000011 01000001 00100000 01010101 01000110 01000011 01000111"
  ]
  
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [messages.length])

  return <div className="binary-float">{messages[index]}</div>
}

export default BinaryFloat