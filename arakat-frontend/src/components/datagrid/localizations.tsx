import {defineMessages, InjectedIntl} from "react-intl";

export interface IDataGridLocalMessages {
    tableMessages: object;
    filterMessages: object;
}

const tableLocalMessages: any = defineMessages({
    noData: {
        id: "data.grid.no.data",
    },
});

const filterLocalMessages: any = defineMessages({
    filterPlaceholder: {
        id: "data.grid.filter.place.holder",
    },
    contains: {
        id: "data.grid.filter.contains",
    },
    notContains: {
        id: "data.grid.filter.notContains",
    },
    startsWith: {
        id: "data.grid.filter.startsWith",
    },
    endsWith: {
        id: "data.grid.filter.endsWith",
    },
    equal: {
        id: "data.grid.filter.equal",
    },
    notEqual: {
        id: "data.grid.filter.notEqual",
    },
    greaterThan: {
        id: "data.grid.filter.greaterThan",
    },
    greaterThanOrEqual: {
        id: "data.grid.filter.greaterThanOrEqual",
    },
    lessThan: {
        id: "data.grid.filter.lessThan",
    },
    lessThanOrEqual: {
        id: "data.grid.filter.lessThanOrEqual",
    },
});

export const getLocalMessages: any = (intl: InjectedIntl) => {
    const localMessages: IDataGridLocalMessages = {
        tableMessages: {
            noData: intl.formatMessage(tableLocalMessages.noData),
        },
        filterMessages: {
            filterPlaceholder: intl.formatMessage(filterLocalMessages.filterPlaceholder),
            contains: intl.formatMessage(filterLocalMessages.contains),
            notContains: intl.formatMessage(filterLocalMessages.notContains),
            startsWith: intl.formatMessage(filterLocalMessages.startsWith),
            endsWith: intl.formatMessage(filterLocalMessages.endsWith),
            equal: intl.formatMessage(filterLocalMessages.equal),
            notEqual: intl.formatMessage(filterLocalMessages.notEqual),
            greaterThan: intl.formatMessage(filterLocalMessages.greaterThan),
            greaterThanOrEqual: intl.formatMessage(filterLocalMessages.greaterThanOrEqual),
            lessThan: intl.formatMessage(filterLocalMessages.lessThan),
            lessThanOrEqual: intl.formatMessage(filterLocalMessages.lessThanOrEqual),
        },
    };

    return localMessages;
};
