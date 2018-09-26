import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import LanguageChangerComponent, { ILanguageChangerProps } from "../../components/language-changer";
import { ILocalizationLanguage } from "../../localization/languages";
import { IApplicationState } from "../../store";
import { changeLanguage } from "../../store/localization/actions";

interface IDispatchProps {
    changeLanguage: (language: ILocalizationLanguage) => void;
}

interface ILanguageChangeContainerProps {
    selectedLanguage?: ILocalizationLanguage;
}

type AllProps = ILanguageChangeContainerProps & IDispatchProps;

const LanguageChanger: React.SFC<AllProps> = (props: AllProps) => (
    <LanguageChangerComponent onLanguageChange={props.changeLanguage} selectedLanguage={props.selectedLanguage} {...props}/>
);

const mapStateToProps: (state: IApplicationState) => ILanguageChangeContainerProps = (state: IApplicationState):
ILanguageChangeContainerProps => ({selectedLanguage: state.localization.locale});

const mapDispatchToProps: (dispatch: Dispatch) => IDispatchProps = (dispatch: Dispatch): IDispatchProps => {
    return {
        changeLanguage: (language: ILocalizationLanguage) => {
            dispatch(changeLanguage(language));
        },
    };
};

export default connect<ILanguageChangeContainerProps, IDispatchProps>(mapStateToProps, mapDispatchToProps)(LanguageChanger);
