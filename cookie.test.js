const test = require('node:test');
const assert = require('node:assert');
const { parse, serialize } = require('./node_modules/cookie/dist/index.js');

test('Cookie Utility Suite', async (t) => {
  
  await t.test('parse() should handle standard cookie headers', () => {
    const header = 'session_id=abc-123; user=guest; theme=dark';
    const result = parse(header);
    
    assert.strictEqual(result.session_id, 'abc-123');
    assert.strictEqual(result.user, 'guest');
    assert.strictEqual(result.theme, 'dark');
  });

  await t.test('parse() should handle URL encoded values', () => {
    const result = parse('data=%7B%22id%22%3A1%7D');
    assert.strictEqual(result.data, '{"id":1}');
  });

  await t.test('serialize() should generate valid Set-Cookie strings with attributes', () => {
    const result = serialize('token', 'secret', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 3600,
      path: '/api'
    });
    
    assert.match(result, /^token=secret;/);
    assert.match(result, /HttpOnly/);
    assert.match(result, /Secure/);
    assert.match(result, /SameSite=Strict/);
    assert.match(result, /Max-Age=3600/);
    assert.match(result, /Path=\/api/);
  });

  await t.test('serialize() should throw when name contains invalid characters', () => {
    assert.throws(() => serialize('invalid=name', 'value'), {
      name: 'TypeError',
      message: /argument name is invalid: invalid=name/
    });
  });

  await t.test('NullObject should protect against prototype pollution', () => {
    const result = parse('__proto__=polluted');
    // The NullObject implementation should not allow overwriting the actual prototype
    assert.strictEqual(Object.prototype.polluted, undefined);
    assert.strictEqual(result['__proto__'], 'polluted');
  });
});