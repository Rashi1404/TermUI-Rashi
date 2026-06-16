import { describe, it, expect } from 'bun:test'
import { render } from '@termuijs/testing'
import { Spinner } from '../../packages/widgets/src/Spinner'

describe('Spinner', () => {
  it('renders with label', () => {
    const t = render(<Spinner label="Loading" />)
    expect(t.renderToString()).toContain('Loading')
    t.unmount()
  })
})