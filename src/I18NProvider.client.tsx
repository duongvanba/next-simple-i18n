"use client"


import { useState } from 'react';
import { createContextFromHook } from './createContextFromHook';



export type TranslatedKeyList = {
    [key: string]: string
}


export type I18NProps = {
    language_id: string
    data: TranslatedKeyList
    on_translate?: (language_id: string, key: string, value: string) => void
}

export const I18nPrivateDataKey = Symbol.for('I18nPrivateDataKey')

export const [useI18NContext, ClientI18NProvider] = createContextFromHook(
    (props: I18NProps) => {

        const [is_translating, set_is_translating] = useState<boolean>(false)

        const [data, set_data] = useState<TranslatedKeyList>(props.data)

        const t = (key: string) => data?.[key] || key

        return {
            [I18nPrivateDataKey]: {
                on_translate: props.on_translate,
                set_data,
                data
            },
            translating: {
                off: () => set_is_translating(false),
                on: () => set_is_translating(true),
                totgle: () => set_is_translating(!is_translating)
            },
            language_id: props.language_id,
            t,
            is_translating
        }
    }
)