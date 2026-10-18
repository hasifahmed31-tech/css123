/** @jest-environment node */
import { rateLimit, requireSameOrigin, safeExternalUrl } from '@/lib/security'

describe('API security helpers', () => {
  it('rejects unsafe requests that omit an Origin header', async () => {
    const response = requireSameOrigin(new Request('http://localhost:3000/api/contact', { method: 'POST' }))
    expect(response?.status).toBe(403)
  })

  it('accepts same-site requests during local development', () => {
    const response = requireSameOrigin(new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    }))
    expect(response).toBeNull()
  })

  it('limits repeated requests and keeps unsafe external URLs out', async () => {
    const key = `security-test-${Date.now()}`
    const request = new Request('http://localhost/api/test', { headers: { 'x-real-ip': `test-${Date.now()}` } })
    expect(rateLimit(request, { key, limit: 1 })).toBeNull()
    expect(rateLimit(request, { key, limit: 1 })?.status).toBe(429)
    expect(safeExternalUrl('javascript:alert(1)')).toBeNull()
    expect(safeExternalUrl('//attacker.example')).toBeNull()
  })
})
