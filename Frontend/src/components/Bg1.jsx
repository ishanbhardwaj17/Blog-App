import { Children, useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  motion,
  useAnimate,
  useAnimationFrame,
} from "framer-motion"
import { v4 as uuidv4 } from "uuid"

import { useMouseVector } from "./useMouseVector"

const ImageTrail = ({
  children,
  newOnTop = true,
  rotationRange = 15,
  containerRef,
  animationSequence = [
    [{ scale: 1.2 }, { duration: 0.1, ease: "circOut" }],
    [{ scale: 0 }, { duration: 0.5, ease: "circIn" }],
  ],
  interval = 100,
}) => {
  const [trailItems, setTrailItems] = useState([])
  const lastAddedTimeRef = useRef(0)

  const fallbackRef = useRef(null)
  const actualRef = containerRef || fallbackRef

  const { position: mousePosition } = useMouseVector(actualRef)

  const lastMousePosRef = useRef(mousePosition)
  const currentIndexRef = useRef(0)

  const childrenArray = useMemo(
    () => Children.toArray(children),
    [children]
  )

  const addToTrail = useCallback(
    (mousePos) => {
      const newItem = {
        id: uuidv4(),
        x: mousePos.x,
        y: mousePos.y,
        rotation: (Math.random() - 0.5) * rotationRange * 2,
        animationSequence,
        scale: 1,
        child: childrenArray[currentIndexRef.current],
      }

      currentIndexRef.current =
        (currentIndexRef.current + 1) % childrenArray.length

      setTrailItems((prev) => 
        newOnTop ? [...prev, newItem] : [newItem, ...prev]
      )
    },
    [childrenArray, rotationRange, animationSequence, newOnTop]
  )

  const removeFromTrail = useCallback((itemId) => {
    setTrailItems((prev) => prev.filter((item) => item.id !== itemId))
  }, [])

  useAnimationFrame((time) => {
    if (
      lastMousePosRef.current.x === mousePosition.x &&
      lastMousePosRef.current.y === mousePosition.y
    ) {
      return
    }

    lastMousePosRef.current = mousePosition

    if (time - lastAddedTimeRef.current < interval) {
      return
    }

    lastAddedTimeRef.current = time
    addToTrail(mousePosition)
  })

  return (
    <div ref={actualRef} className="absolute inset-0 w-full h-full pointer-events-none">
      {trailItems.map((item) => (
        <TrailItem
          key={item.id}
          item={item}
          onComplete={removeFromTrail}
        />
      ))}
    </div>
  )
}

const TrailItem = ({ item, onComplete }) => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (!scope.current) return;

    const sequence = item.animationSequence.map((segment) => [
      scope.current,
      ...segment,
    ])

    animate(sequence).then(() => {
      onComplete(item.id)
    })
  }, [animate, item.animationSequence, item.id, onComplete, scope])

  return (
    <motion.div
      ref={scope}
      className="absolute"
      style={{
        left: item.x,
        top: item.y,
        rotate: item.rotation,
      }}
    >
      {item.child}
    </motion.div>
  )
}

export { ImageTrail }