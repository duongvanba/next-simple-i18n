
import { PropsWithChildren } from 'react'
import { I18NProps, I18NClientProvider } from './I18NProvider.client.js'
import React from 'react' 



type I18NProviderProps = PropsWithChildren<I18NProps>



export const I18NProvider = (props: I18NProviderProps) => {

    return (
        <I18NClientProvider {...props} />
    )

}