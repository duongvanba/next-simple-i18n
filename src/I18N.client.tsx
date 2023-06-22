"use client"

import { useI18NContext } from "./I18NProvider.client"
import React, { JSX } from 'react'

export const I18N = (props: { children: string }) => {

    const key = props.children?.trim()
    const { set_translating, t, is_translating_mode } = useI18NContext()
    const translated_string = t(key, false)
    const is_translated = translated_string !== undefined
    const result = translated_string || key

    if (is_translating_mode) return (
        <span
            onClick={e => e.altKey && key && set_translating({ key, translated_string })}
            style={{
                border: `1px ${is_translated ? 'solid' : 'dotted'} ${is_translated ? 'green' : 'red'}`
            }}
        >{result}</span>
    )

    return result as any as JSX.Element
}