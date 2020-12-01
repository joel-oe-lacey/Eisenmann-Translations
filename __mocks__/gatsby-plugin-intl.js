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