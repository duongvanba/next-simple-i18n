"use client"

import { useI18NContext, I18nPrivateDataKey } from "./I18NProvider.client.js"
import React, { JSX } from 'react'
import { TranslateBox } from "./TranslateBox.js"

export const I18N = (props: { children: string, html?: boolean, variables?: any }) => {

    const key = props.children?.trim()
    const {
        [I18nPrivateDataKey]: { data },
        translating,
        language_id
    } = useI18NContext()
    const translated_string = data?.[language_id]?.[key]
    const is_translated = translated_string !== undefined
    const text = translated_string || key
    const result = props.variables ? text.replaceAll(/\$([a-z0-9A-Z\_]+)/g, (_, k) => props.variables[k]) : text


    if (translating.visible) return (
        <TranslateBox
            is_translated={is_translated}
            translate_key={key}
        >
            {result}
        </TranslateBox>
    )
    return props.html ? <div dangerouslySetInnerHTML={{ __html: result }} /> : result as any as JSX.Element
}