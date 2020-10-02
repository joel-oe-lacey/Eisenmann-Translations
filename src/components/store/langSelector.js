import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import {
    useIntl,
    IntlContextConsumer,
    changeLocale
} from "gatsby-plugin-intl";

const languageName = {
    de: 'Deutsch',
    en: 'English'
}

const SelectorContainer = styled.section `
  height: 65%;
  width: 25%;
  right: 0;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const LangSelector = () => {
    // const localeDetails = useIntl();
    // const locale = localeDetails.locale;
    // const inverseLang = locale === "de" ? "en" : "de"

    return (
        <React.Fragment>
            <IntlContextConsumer>
                    {({ languages, language: currentLocale }) => {
                        return languages.map(language => (
                            <Button
                                key={language}
                                onClick={() => changeLocale(language)}
                                style={{
                                    color: currentLocale === language ? `blue` : `white`,
                                }}
                                variant="contained"
                                color="primary"
                            >
                                {languageName[language]}
                            </Button>
                        ))
                        }
                    }
            </IntlContextConsumer>
        </React.Fragment>
    )
};

export default LangSelector;