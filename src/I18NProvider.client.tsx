"use client"


import { useEffect, useState } from 'react';
import { createContextFromHook } from './createContextFromHook';



export type TranslatedKeyList = {
    [key: string]: string
}

export type OnTranslateProps = {
    language_id: string,
    key: string,
    value: string,
    namespace?: string
}


export type I18NProps = {
    language_id: string
    data: TranslatedKeyList
    namespace?: string
    on_translate?: (data: OnTranslateProps) => void
    prompt_for_translating: boolean
}

export const I18nPrivateDataKey = Symbol.for('I18nPrivateDataKey')

export const [useI18NContext, ClientI18NProvider] = createContextFromHook(
    ({ prompt_for_translating, namespace, on_translate, ...props }: I18NProps) => {

        const [language_id, set_language_id] = useState(props.language_id)

        useEffect(() => {
            language_id != props.language_id && set_language_id(props.language_id)
        }, [props.language_id])

        const [is_translating, set_is_translating] = useState<boolean>(false)

        const [data, set_data] = useState<TranslatedKeyList>(props.data)

        const [translating_key, set_translating_key] = useState<string>()

        const t = (key: string) => data?.[key] || key

        const translate = (value: string) => {
            if (!translating_key) return
            set_data({ ...data, [translating_key]: value })
            on_translate({
                key: translating_key,
                language_id,
                value,
                namespace
            })
        }

        return {
            [I18nPrivateDataKey]: {
                data,
                set_translating_key,
                prompt_for_translating
            },
            translating: {
                visible: is_translating,
                key: translating_key,
                value: translating_key ? t(translating_key) : null,
                off: () => set_is_translating(false),
                on: () => set_is_translating(true),
                totgle: () => set_is_translating(!is_translating),
                translate
            },
            language_id,
            switch_language: set_language_id,
            t
        }
    }
)