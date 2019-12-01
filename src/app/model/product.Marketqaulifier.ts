import { JObject } from '../shell/interfaces/j-object';
import {FilterCascadeOutput} from "../shell/interfaces/filter-cascade-output";

export class ProductMarketQualifier implements JObject{
    private readonly options = {
        variableText: '',
        options: [
            {
                code: '2',
                text: 'Market Qualifer sss',
                child : [ ]
            },
            {
                code: '3',
                text: 'Recent Buyer',
                child : [
                    {
                        code: '4',
                        text : 'Replace Overall',
                        child : []
                    },
                    {
                        code: '5',
                        text : 'Remodel Overall',
                        child : [ ]
                    }
                ]
            },
            {
                code: '6',
                text: 'Intender',
                child : [ ]
            },
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
            },
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
            },
            {
                code: '20',
                text: 'Market Qualifer',
                child : [ ]
            },
            {
                code: '21',
                text: 'Recent Buyer',
                child : [ ]
            },
            {
                code: '22',
                text: 'Intender',
                child : [ ]
            }
        ]
    }

    getFilteredData(values: any[]): FilterCascadeOutput {
        return this.options;
    }

}