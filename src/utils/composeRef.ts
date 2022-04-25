import type * as React from 'react'

export function fillRef<T>(ref: React.Ref<T>, node: T) {
  if (typeof ref === 'function') {
    ref(node)
  } else if (typeof ref === 'object' && ref && 'current' in ref) {
    (ref as any).current = node
  }
}

export function composeRef<T>(...refs: React.Ref<T>[]): React.Ref<T> {
  const refList = refs.filter(ref => ref)
  if (refList.length <= 1) {
    return refList[0]
  }

  return (node: T) => {
    refs.forEach(ref => {
      fillRef(ref, node)
    })
  }
}