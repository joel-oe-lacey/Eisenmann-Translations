import React from 'react';
import Switch from '@material-ui/core/Switch';
import {
    withStyles
} from '@material-ui/core/styles';
import {
    useIntl,
    IntlContextConsumer,
    changeLocale
} from "gatsby-plugin-intl";
import {
    IconFlagDE,
    IconFlagUK
} from 'material-ui-flags';

const Selector = withStyles({
    switchBase: {
        top: -2,
    },
})(Switch);

const LangSwitch = () => {
    const intl = useIntl();

    return (
        <React.Fragment>
            <IntlContextConsumer>
                    {({ language: currentLocale }) => {
                        const inverseLang = currentLocale === "de" ? "en" : "de";

                        return ( <Selector
                                checked={currentLocale === intl.defaultLocale}
                                onChange={() => changeLocale(inverseLang)}
                                checkedIcon={<IconFlagUK/>}
                                icon={<IconFlagDE/>}
                                color="default"
                                edge="start"
                                //make this localized
                                inputProps={{ 'aria-label': 'language selector' }}
                            />)
                        }
                    }
            </IntlContextConsumer>
        </React.Fragment>
    )
};

export default LangSwitch;