'use client'

import React, { useRef } from 'react'
import { PropsWithChildren } from "react";
import { I18nPrivateDataKey, useI18NContext } from './I18NProvider.client.js';

export type TranslateBox = {
    is_translated: boolean
    translate_key: string
}


export const TranslateBox = (props: PropsWithChildren<TranslateBox>) => {
    const {
        [I18nPrivateDataKey]: {
            set_translating_key
        },
        language_id,
        prompt_for_translating,
        translator
    } = useI18NContext()
    const border = `1px ${props.is_translated ? 'solid' : 'dotted'} ${props.is_translated ? 'green' : 'red'}`
    const last_press_down = useRef(0)

    const action = (e: MouseEvent ) => {
        e.preventDefault()
        set_translating_key(props.translate_key)
        if (!prompt_for_translating) return
        const text = prompt(`[${props.translate_key}] => [${language_id}]`, props.children as string)
        if (text == null) return
        translator.edit(props.translate_key, text)
    }

    return (
        <span
            onTouchStart={() => last_press_down.current = setTimeout(action, 500)}
            onTouchEnd={() => clearTimeout(last_press_down.current)}
            onContextMenu={action as any }
            style={{ border }}
        >{props.children}</span>
    )
}