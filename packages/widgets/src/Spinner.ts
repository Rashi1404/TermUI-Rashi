import { useEffect, useState } from '@termuijs/jsx'
import { caps } from '@termuijs/core'
import { Text } from './Text'

export interface SpinnerProps {
  speed?: number
  label?: string
  color?: string
}

const FRAMES_UNICODE = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
const FRAMES_ASCII = ['|', '/', '-', '\\']

export function Spinner({ speed = 80, label = '', color = 'cyan' }: SpinnerProps) {
  const [frame, setFrame] = useState(0)
  const frames = caps.unicode ? FRAMES_UNICODE : FRAMES_ASCII

  useEffect(() => {
    if (caps.noMotion) return

    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % frames.length)
    }, speed)

    return () => clearInterval(interval)
  }, [speed, frames.length])

  const spinnerChar = frames[frame]
  const display = label ? `${spinnerChar} ${label}` : spinnerChar

  return <Text color={color}>{display}</Text>
}