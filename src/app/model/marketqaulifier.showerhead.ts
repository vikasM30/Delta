import { JObject } from '../shell/interfaces/j-object';
import {FilterCascadeOutput} from "../shell/interfaces/filter-cascade-output";

export class MarketQualifierShowerhead implements JObject{
    private readonly options = {
        variableText: 'Market Qualifier',
        options: [
           
            {
                code: '14',
                text: 'Market Qualifer',
                child : [ ]
            },
            {
                code: '15',
                text: 'Recent Buyer',
                child : [
                    {
                        code: '16',
                        text : 'Replace Overall',
                        child : []
                    },
                    {
                        code: '17',
                        text : 'Remodel Overall',
                        child : [ ]
                    }
                ]
            },
            {
                code: '18',
                text: 'Intender',
                child : [ ]
            }
        ]
    }

    getFilteredData(values: any[]): FilterCascadeOutput {
        return this.options;
    }

}