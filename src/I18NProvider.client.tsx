"use client"


import { useState } from 'react';
import { createContextFromHook } from './createContextFromHook.js';
import { useSyncState } from './useSyncState.js';



export type TranslationDatabase = {
    [language_id: string]: {
        [key: string]: string
    }
}

export type OnTranslateProps = {
    language_id: string,
    key: string,
    value: string,
    namespace?: string
}


export type I18NProps = {
    language_id: string
    data: TranslationDatabase
    namespace?: string
    push?: (data: OnTranslateProps) => void
    prompt_for_translating?: boolean
    translating?: boolean
}

export const I18nPrivateDataKey = Symbol.for('I18nPrivateDataKey')



export const [useI18NContext, ClientI18NProvider] = createContextFromHook(
    (props: I18NProps) => {

        const [language_id, set_language_id] = useSyncState(props.language_id)
        const [translating, set_translating] = useSyncState<boolean>(props.translating)
        const [data, set_data] = useState<TranslationDatabase>(props.data || {})

        const [translating_key, set_translating_key] = useState<string>()

        const t = (key: string) => data?.[key] || key

        const edit = (key: string, value: string) => {
            if (!key) return
            set_data({
                ...data,
                [language_id]: {
                    ...data?.[language_id] || {},
                    [key]: value
                }
            })
            props.push({
                key,
                language_id,
                value,
                namespace: props.namespace
            })
            set_translating_key(null)
        }

        return {
            translating,
            ...props,
            [I18nPrivateDataKey]: {
                set_translating_key
            },
            translator: {
                key: translating_key,
                value: translating_key ? t(translating_key) : null,
                off: () => {
                    set_translating(false)
                    set_translating_key(null)
                },
                on: () => set_translating(true),
                totgle: () => set_translating(!translating),
                edit
            },
            t,
            set_language_id,
            data
        }
    }
)