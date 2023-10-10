"use client"

import { useI18NContext } from "./I18NProvider.client.js"
import React, { JSX } from 'react'
import { TranslateBox } from "./TranslateBox.js"

export type I18N = {
    children: string,
    html?: boolean,
    variables?: any,
    json?: { [key: string]: string }
}
export const I18N = (props: I18N) => {

    const key = props.children.trim();
    const { data, translating, language_id } = useI18NContext();
    const translated_string = data?.[language_id]?.[key] || props.json?.[language_id]
    const result = props.variables ? translated_string?.replaceAll(/\$([$a-z0-9A-Z\_]+)/g, (_, k) => props.variables[k]) : (translated_string || key);
    const is_translated = translated_string !== undefined

    if (translating) return (
        <TranslateBox
            is_translated={is_translated}
            translate_key={key}
            dynamic={props.json != undefined}
            raw_translated_string={translated_string || key}
        >
            {result}
        </TranslateBox>
    )
    return props.html ? <div dangerouslySetInnerHTML={{ __html: result }} /> : result as any as JSX.Element
}