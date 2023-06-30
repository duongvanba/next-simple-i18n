"use client"

import { useI18NContext, I18nPrivateDataKey } from "./I18NProvider.client"
import React, { JSX } from 'react'
import { TranslateBox } from "./TranslateBox"

export const I18N = (props: { children: string }) => {

    const key = props.children?.trim()
    const {
        is_translating,
        [I18nPrivateDataKey]: { data }
    } = useI18NContext()
    const translated_string = data?.[key]
    const is_translated = translated_string !== undefined
    const result = translated_string || key


    if (is_translating) return (
        <TranslateBox
            is_translated={is_translated}
            translate_key={key}
        >
            {result}
        </TranslateBox>
    )

    return result as any as JSX.Element
}