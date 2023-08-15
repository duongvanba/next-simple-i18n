import React, { JSX, useRef } from 'react'
import { PropsWithChildren } from "react";
import { I18nPrivateDataKey, useI18NContext } from './I18NProvider.client';

export type TranslateBox = {
    is_translated: boolean
    translate_key: string
}


export const TranslateBox = (props: PropsWithChildren<TranslateBox>) => {
    const {
        [I18nPrivateDataKey]: {
            on_translate,
            data,
            set_data,
        },
        language_id
    } = useI18NContext()
    const border = `1px ${props.is_translated ? 'solid' : 'dotted'} ${props.is_translated ? 'green' : 'red'}`
    const last_press_down = useRef(0)

    const action = () => {
        const text = prompt(`[${props.translate_key}] => [${language_id}]`, props.children as string)
        if (text == null) return
        set_data({ ...data, [props.translate_key]: text })
        on_translate?.(language_id, props.translate_key, text)
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