
/**
 * EnumService returns list of enum class
 */
export class EnumService {

    /**
     * returns enum type class as an array
     * @param enumObject ChartDecisionType
     */
    public getValueArray(enumObject: any) {
        const enumValueArray = [];
        for (const key in enumObject) {
            if (enumObject.hasOwnProperty(key)) {
                enumValueArray.push(enumObject[key]);
            }
        }
        return enumValueArray;
    }
}
