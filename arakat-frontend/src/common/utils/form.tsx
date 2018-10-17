import {defaultsDeep, omitBy} from "lodash";
import { IApplicationState } from "../../store";
import { FormState } from "../models/form-state";
import { LoadingProgressManagement } from "../models/loading-progress/management";

/**
 * generic types for form data which will be used for requests
 */
export interface IFormData<T> {
    data: T;
}

/**
 * checks if form has syncErrors
 * @param appState app state to read form values from redux store
 * @param formName form name that holds form values in redux store
 */
export const isFormValid: (appState: IApplicationState, formName: string) => FormState = (appState: IApplicationState, formName: string) =>
(appState.form && appState.form[formName] && !appState.form[formName].syncErrors ? FormState.valid : FormState.invalid);

/**
 * returns form values for requests
 * @param appState app state to read form values from redux store
 * @param formName form name that holds form values in redux store
 * @param initialFormValues initial values for form values
 */
export const getFormValues: <T>(appState: IApplicationState, formName: string, initialFormValues: IFormData<T>) =>
T = (appState, formName, initialFormValues) => {

    let formValues: any = appState.form && appState.form[formName] ? appState.form[formName].values : undefined;

    formValues = omitBy(formValues, (value, key) => {
            return !initialFormValues.data.hasOwnProperty(key);
        });

    return defaultsDeep(formValues, initialFormValues.data);

};

/**
 * checks whether is form loading state
 * @param appState app state to read form values from redux store
 * @param formName form name that holds form values in redux store
 */
export const isFormLoading: (appState: IApplicationState, formName: string) => boolean =
(appState: IApplicationState, formName: string) => {
    const formValues: any = appState.form && appState.form[formName] ? appState.form[formName].values : undefined;

    return formValues && appState.request.loading && appState.request.management === LoadingProgressManagement.manuel;
};
