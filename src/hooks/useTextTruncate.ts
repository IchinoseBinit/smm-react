
import { useEffect, useState, useRef } from "react"
const useIsTextTruncated = (text: string, maxWidth: number) => {
  const [isTruncated, setIsTruncated] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current
      setIsTruncated(element.scrollWidth > element.clientWidth)
    }
  }, [text, maxWidth])

  return { isTruncated, textRef }
}


export default useIsTextTruncated