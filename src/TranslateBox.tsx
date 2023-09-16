import React, { useRef } from 'react'
import { PropsWithChildren } from "react";
import { I18nPrivateDataKey, useI18NContext } from './I18NProvider.client';

export type TranslateBox = {
    is_translated: boolean
    translate_key: string
}


export const TranslateBox = (props: PropsWithChildren<TranslateBox>) => {
    const {
        [I18nPrivateDataKey]: {
            data,
            prompt_for_translating,
            set_translating_key
        },
        language_id,
        translating
    } = useI18NContext()
    const border = `1px ${props.is_translated ? 'solid' : 'dotted'} ${props.is_translated ? 'green' : 'red'}`
    const last_press_down = useRef(0)

    const action = () => {
        if (!prompt_for_translating) return set_translating_key(props.translate_key)
        const text = prompt(`[${props.translate_key}] => [${language_id}]`, props.children as string)
        if (text == null) return
        translating.translate(text)
    }

    return (
        <span
            onTouchStart={() => last_press_down.current = setTimeout(action, 500)}
            onTouchEnd={() => clearTimeout(last_press_down.current)}
            onContextMenu={action}
            style={{ border }}
        >{props.children}</span>
    )
}