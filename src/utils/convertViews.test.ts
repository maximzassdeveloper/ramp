import { convertViews } from './convertViews'

describe('convertViews', () => {
  test('Equal 0', () => {
    expect(convertViews(0)).toEqual('0')
  })
  test('The number is less', () => {
    expect(convertViews(-200)).toEqual('0')
  })  
  test('Equal 1', () => {
    expect(convertViews(1)).toEqual('1')
  })
  test('The number less than 1000', () => {
    expect(convertViews(330)).toEqual('330')
  })
  test('Equal 1000', () => {
    expect(convertViews(1000)).toEqual('1k')
  })
  test('The number is greater 1000', () => {
    expect(convertViews(1237)).toEqual('1.2k')
  })
  test('The number is greater 1000 (2)', () => {
    expect(convertViews(1500)).toEqual('1.5k')
  })
  test('The number is greater 10 000', () => {
    expect(convertViews(15752)).toEqual('15.7k')
  })
  test('Equal 100 000', () => {
    expect(convertViews(100000)).toEqual('100k')
  })
  test('The number is greater 100 000', () => {
    expect(convertViews(100001)).toEqual('100k+')
  })
})