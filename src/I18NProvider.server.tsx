
import { PropsWithChildren } from 'react'
import { I18NProps, ClientI18NProvider, TranslationDatabase } from './I18NProvider.client.js'
import React from 'react' 



type I18NProviderProps = PropsWithChildren<
    Omit<I18NProps, 'data'> & { data: TranslationDatabase }
>



export const I18NProvider = (props: I18NProviderProps) => {

    return (
        <ClientI18NProvider
            {...props}
            data={props.data}
        />
    )

}