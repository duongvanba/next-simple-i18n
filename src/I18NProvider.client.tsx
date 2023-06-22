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


export const [useI18NContext, ClientI18NProvider] = createContextFromHook(
    (props: I18NProps) => {


        const [is_translating_mode, set_translating_mode] = useState<boolean>(false)

        const [translating, set_translating] = useState<{ key: string, translated_string?: string } | null>(null)

        const [data, set_data] = useState<TranslatedKeyList>(props.data)



        const t = (key: string, key_as_default: boolean = true) => {
            const translated_string = data?.[key]
            return translated_string || (key_as_default ? key : undefined)
        }


        const end_translate = () => set_translating(null)

        return {
            translating,
            end_translate,
            set_translating,
            language_id: props.language_id,
            t,
            is_translating_mode,
            set_translating_mode,
            data,
            set_data
        }
    }
)