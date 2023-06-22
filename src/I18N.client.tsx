"use client"

import { useI18NContext, I18nPrivateDataKey } from "./I18NProvider.client"
import React, { JSX } from 'react'

export const I18N = (props: { children: string }) => {

    const key = props.children?.trim()
    const {
        t,
        [I18nPrivateDataKey]: { set_translating },
        translating
    } = useI18NContext()
    const translated_string = t(key, false)
    const is_translated = translated_string !== undefined
    const result = translated_string || key

    if (translating.active) return (
        <span
            onClick={e => e.altKey && key && set_translating({
                active: true,
                key,
                translated_string
            })}
            style={{
                border: `1px ${is_translated ? 'solid' : 'dotted'} ${is_translated ? 'green' : 'red'}`
            }}
        >{result}</span>
    )

    return result as any as JSX.Element
}