import React from "react";
import {IntlProvider} from "react-intl";
import {connect} from "react-redux";
import LocalizationLanguages, { ILocalizationLanguage } from "../../localization/languages";
import { IApplicationState } from "../../store";
import { ILocalizationState } from "../../store/localization/types";

interface ILocalizerProps {
    locale: ILocalizationLanguage;
    messages: object;
    children: any;
}

type AllProps = ILocalizerProps;

const localizerContainer: React.SFC<AllProps> = (props: AllProps) => (
    <IntlProvider
        defaultLocale={LocalizationLanguages.DefaultLanguage.code}
        locale={props.locale.code}
        messages={props.messages}
        key={props.locale.code}
    >
        {props.children}
    </IntlProvider>
);

const mapStateToProps: (state: IApplicationState) => ILocalizationState = (state: IApplicationState):
ILocalizationState => state.localization;

export default connect<ILocalizationState, ILocalizerProps>(
    mapStateToProps,
)(localizerContainer);
