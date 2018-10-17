import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import { IMenuItem } from "../../common/models/menu/item";
import LocalizationLanguages, { ILocalizationLanguage } from "../../localization/languages";
import Menu from "../menu";

export interface ILanguageChangerProps {
    selectedLanguage?: ILocalizationLanguage;
    onLanguageChange: (language: ILocalizationLanguage) => void;
}

interface ILanguageChangerState {
    languages: IMenuItem[];
}

type Props = ILanguageChangerProps;

/**
 * dropdown component that changes language of application
 */
class LanguageChangerComponent extends Component<Props, ILanguageChangerState> {
    public state = {
        languages: LocalizationLanguages.AllLanguages.map((language) => ({id: language.code, text: language.description})),
    };

    /**
     * renders output
     */
    public render(): JSX.Element {
        const {selectedLanguage} = this.props;
        const {languages} = this.state;
        return (
            <Menu
                onItemSelected={this.handleLanguageChange}
                id="site-language"
                selectedItem={{id: selectedLanguage.code, text: selectedLanguage.description}}
                items={languages}
            />
        );
    }

    private handleLanguageChange = (menuItem: IMenuItem) => {
        const {onLanguageChange} = this.props;
        const newLanguage: ILocalizationLanguage = LocalizationLanguages.AllLanguages.find((language) => language.code === menuItem.id);
        onLanguageChange(newLanguage);
    }
}

export default LanguageChangerComponent;
