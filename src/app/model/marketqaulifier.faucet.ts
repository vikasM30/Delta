import { JObject } from '../shell/interfaces/j-object';
import {FilterCascadeOutput} from "../shell/interfaces/filter-cascade-output";

export class MarketQualifierFaucet implements JObject{
    private readonly options = {
        variableText: 'Market Qualifier',
        options: [
           
            {
                code: '1',
                text: 'Market Qualifer',
                child : [ ]
            },
            {
                code: '2',
                text: 'Recent Buyer',
                child : [
                    {
                        code: '3',
                        text : 'Replace Overall',
                        child : []
                    },
                    {
                        code: '4',
                        text : 'Remodel Overall',
                        child : [ ]
                    }
                ]
            },
            {
                code: '5',
                text: 'Intender',
                child : [ ]
            }
        ]
    }

    getFilteredData(values: any[]): FilterCascadeOutput {
        return this.options;
    }

}