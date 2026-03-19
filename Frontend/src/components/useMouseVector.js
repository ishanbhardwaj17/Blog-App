import { useEffect, useState } from "react"

export const useMouseVector = (containerRef) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [vector, setVector] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let last = { x: 0, y: 0 }

    const handleMouseMove = (e) => {
      const rect = containerRef?.current?.getBoundingClientRect()

      const x = rect ? e.clientX - rect.left : e.clientX
      const y = rect ? e.clientY - rect.top : e.clientY

      setPosition({ x, y })
      setVector({
        x: x - last.x,
        y: y - last.y,
      })

      last = { x, y }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [containerRef])

  return { position, vector }
}