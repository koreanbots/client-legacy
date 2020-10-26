import Permission from './permission'

test('correct permission check', () => {
    expect(Permission.check(0x0, 0x0)).toBe(true)
    expect(Permission.check(0x1, 0x2)).toBe(false)
    expect(Permission.check(7, 'booster')).toBe(true)
    expect(Permission.check(0, 'staff')).toBe(false)
    expect(Permission.check(0x2, 'staff')).toBe(false)
})