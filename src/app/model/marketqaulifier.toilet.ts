import { JObject } from '../shell/interfaces/j-object';
import {FilterCascadeOutput} from "../shell/interfaces/filter-cascade-output";

export class MarketQualifierToilet implements JObject{
    private readonly options = {
        variableText: 'Market Qualifier',
        options: [
           
            {
                code: '8',
                text: 'Market Qualifer',
                child : [ ]
            },
            {
                code: '9',
                text: 'Recent Buyer',
                child : [
                    {
                        code: '10',
                        text : 'Replace Overall',
                        child : []
                    },
                    {
                        code: '11',
                        text : 'Remodel Overall',
                        child : [ ]
                    }
                ]
            },
            {
                code: '12',
                text: 'Intender',
                child : [ ]
            }
        ]
    }

    getFilteredData(values: any[]): FilterCascadeOutput {
        return this.options;
    }

}