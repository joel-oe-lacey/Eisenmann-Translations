import React from "react"

export const useIntl = () => {
    return {
        locale: 'en',
        formatMessage(target) {
            return (
                //fill formatted messages with mock as we aren't testing 
                //module functionality
                Object.values(target)[0]
            )
        }
    }
}

export const changeLocale = jest.fn();

export const IntlContextConsumer = props => {
    return (
        <section>
            {props.children}
        </section>
    )
}
