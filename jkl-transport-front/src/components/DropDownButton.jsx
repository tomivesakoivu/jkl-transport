import { useState, useEffect, useRef } from 'react'
import StopsButton from './StopsButton'
import DropDownCard from './DropDownCard'

const sampleData = new Array(6).fill("meow")

const DropDownButton = () => {
  const [open, setOpen] = useState(false)
  const drop = useRef(null)
  function handleClick(e) {
    if (!e.target.closest(`.${drop.current.className}`) && open) {
      setOpen(false)
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick)
    }
  })

  return (
    <div
      className='dropdown'
      ref={drop}
    >
      <StopsButton onClick={() => setOpen(open => !open)} />
      {open && <DropDownCard data={sampleData} />}
    </div>
  )
}

export default DropDownButton
