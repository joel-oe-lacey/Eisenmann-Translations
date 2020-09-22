import React from 'react';
import Button from '@material-ui/core/Fab';
import styled from 'styled-components';
import {
    useIntl,
    IntlContextConsumer,
    changeLocale
} from "gatsby-plugin-intl";

// const StyledFAB = styled(Fab)({
//     marginLeft: 'calc(45% + 10rem)'
// });

const languageName = {
    de: 'Deutsch',
    en: 'English'
}

const LangSelector = () => {
    // const localeDetails = useIntl();
    // const locale = localeDetails.locale;
    // const inverseLang = locale === "de" ? "en" : "de"

    return (
        // <React.Fragment>
        //     <IntlContextConsumer>
        //         <StyledFAB variant="extended" color="secondary" aria-label="change lang">
        //             test
        //             {/* {languages[inverseLang]} */}
        //         </StyledFAB>
        //     </IntlContextConsumer>
        // </React.Fragment>
        <React.Fragment>
            <IntlContextConsumer>
                {({ languages, language: currentLocale }) =>
                    languages.map(language => (
                        <Button
                            key={language}
                            onClick={() => changeLocale(language)}
                            style={{
                                color: currentLocale === language ? `yellow` : `white`,
                            }}
                        >
                            {languageName[language]}
                        </Button>
                    ))
                }
            </IntlContextConsumer>
        </React.Fragment>
    )
};

export default LangSelector;