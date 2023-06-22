"use client"


import { useState } from 'react';
import { createContextFromHook } from './createContextFromHook';



export type TranslatedKeyList = {
    [key: string]: string
}


export type I18NProps = {
    language_id: string
    data: TranslatedKeyList
}

export const I18nPrivateDataKey = Symbol.for('I18nPrivateDataKey')

export const [useI18NContext, ClientI18NProvider] = createContextFromHook(
    (props: I18NProps) => {

        const [translating, set_translating] = useState<{ active: boolean, key?: string, translated_string?: string }>({ active: false })

        const [data, set_data] = useState<TranslatedKeyList>(props.data)


        const t = (key: string, key_as_default: boolean = true) => {
            const translated_string = data?.[key]
            return translated_string || (key_as_default ? key : undefined)
        } 

        return {
            [I18nPrivateDataKey]: { set_translating },
            translating: {
                ...translating,
                done: () => set_translating({ active: true }),
                off: () => set_translating({ active: false }),
                on: () => set_translating({ active: true }),
                totgle: state => set_translating({ active: !state.active })
            },
            language_id: props.language_id,
            t,
            data,
            set_data
        }
    }
)