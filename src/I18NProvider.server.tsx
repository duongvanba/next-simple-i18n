
import { PropsWithChildren } from 'react'
import { I18NProps, ClientI18NProvider } from './I18NProvider.client.js'
import React from 'react' 



type I18NProviderProps = PropsWithChildren<I18NProps>



export const I18NProvider = (props: I18NProviderProps) => {

    return (
        <ClientI18NProvider {...props} />
    )

}