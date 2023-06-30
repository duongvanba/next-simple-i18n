
import { PropsWithChildren } from 'react'
import { I18NProps, ClientI18NProvider, TranslatedKeyList } from './I18NProvider.client'
import React from 'react' 



type I18NProviderProps = PropsWithChildren<
    Omit<I18NProps, 'data'> & { data: { [lang: string]: TranslatedKeyList } }
>



export const I18NProvider = (props: I18NProviderProps) => {

    return (
        <ClientI18NProvider
            {...props}
            data={props.data?.[props.language_id]}
        />
    )

}