import { Chart } from 'src/app/shell/models/chart';
import { ChartTypes } from 'src/app/shell/enums/chart.types';
import { Measure } from '../shell/enums/measure';
import { ChartProvider } from '../shell/enums/chart.provider';
import { TimePeriod } from '../shell/models/time.period';
import { FilterCondition } from '../shell/enums/filter-condition.enum';
import { RoundOffStrategy } from '../shell/enums/round.off.strategy';
import { show, BreakType } from '../shell/operators/chart.operators';
export class Purchasereaction {
    Brandlist: Array<string> = new Array<any>();
    Category: string;
    SatisfactionT3BC: Array<Chart> = new Array<any>();
    RecommandationT3BC:  Array<Chart> = new Array<any>();
    PurchaseAgainT3BC:Array<Chart> = new Array<any>();
    socialmedia:Array<Chart>=new Array<any>();
    satisfactionst3isdebreak: string;
    RecommandationT3Bsidebreak: string;
    PurchaseAgainT3Bsidebreak: string;
    BrandMapping = {
        1: 'Delta',
        2: 'American',
        3: 'Kohler',
        4: 'Moen',
        5: 'Peerless',
        6: 'Pfister',
        7: 'Aqua Source',
        8: 'Glacier Bay',
        9: 'Brizo',
        10: 'Grohe',
        11: 'Hansgrohe',
        12: 'Briggs',
        13: 'Crane',
        14: 'Eljer',
        15: 'Gerber',
        16: 'Jacuzzi',
        17: 'Mansfield',
        18: 'Sterling',
        19: 'Toto',
        20: 'Penguin',
        21: 'Danze',
        22: 'Speakman',
        23: 'Waterpik',
        24: 'Symmons',
        25: 'Aquatic',
        26: 'Maax',
        27: 'ASB',
        28: 'StyleSelections',
        29: 'AllenRoth',
        30: 'Swan',
        31: 'AquaGlass',
        32: 'Proflo',
        33: 'Duravit',
        34: 'Mirabelle',
        35: 'VilleroyBoch',
        36: 'Decolav',
        37: 'Rohl',
        38: 'VictoriaAlbert',
        39: 'Ronbow',
        40: 'Vortens',
        41: 'Oxygenics',
        42: 'MTI'
    }
    SatisfactionT3BSideBreakMapping = {
        'Faucet': { 'Delta': 'v597', 'American': 'v598', 'Kohler': 'v599', 'Moen': 'v600', 'Peerless': 'v601', 'Pfister': 'v602', 'Aqua Source': 'v603', 'Glacier Bay': 'v604', 'Brizo': 'v605', 'Grohe': 'v606', 'Hansgrohe': 'v607', 'Toto': 'v608' },
        'Showerhead': { 'Delta': 'v697', 'American': 'v698', 'Kohler': 'v699', 'Moen': 'v700', 'Peerless': 'v701', 'Pfister': 'v702', 'Aqua Source': 'v703', 'Glacier Bay': 'v704', 'Grohe': 'v705', 'Hansgrohe': 'v706', 'Speakman': 'v707', 'Waterpik': 'v708', 'Symmons': 'v709', 'Proflo': 'v710', 'Oxygenics': 'v711' },
        'Toilet': { 'Delta': 'v635', 'American': 'v636', 'Kohler': 'v637', 'Moen': 'v638', 'Peerless': 'v639', 'Pfister': 'v640', 'AquaSource': 'v641', 'GlacierBay': 'v642', 'Briggs': 'v643', 'Eljer': 'v644', 'Gerber': 'v645', 'Jacuzzi': 'v646', 'Mansfield': 'v647', 'Sterling': 'v648', 'Toto': 'v649', 'Penguin': 'v650' }
    }
    RecommandationT3BSideBreakMapping = {
        Faucet: { 'Delta': 'v587', 'American': 'v609', 'Kohler': 'v610', 'Moen': 'v611', 'Peerless': 'v612', 'Pfister': 'v613', 'Aqua Source': 'v614', 'Glacier Bay': 'v615', 'Brizo': 'v616', 'Grohe': 'v617', 'Hansgrohe': 'v618', 'Toto': 'v619' },
        Showerhead: { 'Delta': 'v727', 'American': 'v728', 'Kohler': 'v729', 'Moen': 'v730', 'Peerless': 'v731', 'Pfister': 'v732', 'Aqua Source': 'v733', 'Glacier Bay': 'v734', 'Grohe': 'v735', 'Hansgrohe': 'v736', 'Speakman': 'v737', 'Waterpik': 'v738', 'Symmons': 'v739', 'Proflo': 'v740', 'Oxygenics': 'v741' },
        Toilet: { 'Delta': 'v667', 'American': 'v668', 'Kohler': 'v669', 'Moen': 'v670', 'Peerless': 'v671', 'Pfister': 'v672', 'Aqua Source': 'v673', 'Glacier Bay': 'v674', 'Briggs': 'v675', 'Eljer': 'v676', 'Gerber': 'v677', 'Jacuzzi': 'v678', 'Mansfield': 'v679', 'Sterling': 'v680', 'Toto': 'v681', 'Penguin': 'v682' }
    }
    PurchaseAgainT3BSideBreakMapping = {
        Faucet: { 'Delta': 'v1216', 'American': 'v1217', 'Kohler': 'v1218', 'Moen': 'v1219', 'Peerless': 'v1220', 'Pfister': 'v1221', 'Aqua Source': 'v1222', 'Glacier Bay': 'v1223', 'Brizo': 'v1224', 'Grohe': 'v1225', 'Hansgrohe': 'v1226','Briggs':'v1227','Crane':'v1228','Eljer':'v1229','Gerber':'v1230','Jacizzi':'v1231','Mansfield':'v1232','Sterling':'v1233','Toto':'v1234','Penguin':'v1235','Danze':'v1236','Speakman': 'v1237', 'Waterpik': 'v1238', 'Symmons': 'v1239', 'Aquatic': 'v1240', 'Maax': 'v1241','ASB':'v1242','Style Selections':'v1243','Allen & Roth':'v1244','Swanstone':'v1245','Aqua Glass':'v1246','Proflo':'v1247','Duravit':'v1248','Mirabelle':'v1249' },
        Showerhead: { 'Delta': 'v712', 'American': 'v713', 'Kohler': 'v714', 'Moen': 'v715', 'Peerless': 'v716', 'Pfister': 'v717', 'Aqua Source': 'v718', 'Glacier Bay': 'v719', 'Grohe': 'v720', 'Hansgrohe': 'v721', 'Speakman': 'v722', 'Waterpik': 'v723', 'Symmons': 'v724', 'Proflo': 'v725', 'Oxygenics': 'v726' },
        Toilet: { 'Delta': 'v651', 'American': 'v652', 'Kohler': 'v653', 'Moen': 'v654', 'Peerless': 'v655', 'Pfister': 'v656', 'Aqua Source': 'v657', 'Glacier Bay': 'v658', 'Briggs': 'v659', 'Eljer': 'v660', 'Gerber': 'v661', 'Jacuzzi': 'v662', 'Mansfield': 'v663', 'Sterling': 'v664', 'Toto': 'v665', 'Penguin': 'v666' }

    }
    SocialMediaSidebreak = {
        Faucet: 'v620', 
        Showerhead: 'v743',
        Toilet: 'v683'
    }
    SocialMediaTopbreak = {
        Faucet: 'v595', 
        Showerhead: 'v695',
        Toilet: 'v632' 
    }
    SocialMediaTopbreakOptionMapping = {
        Faucet:  {'Delta':1,'American':2,'Kohler':3,'Moen':4,'Peerless':5,'Pfister':6,'Aqua Source':7,'Glacier Bay':8,'Brizo':9,'Grohe':10,'Hansgrohe':11,'Briggs':12,'Crane [HIDDEN AS OF 2019.Q1]':13,'Eljer':14,'Gerber':15,'Jacuzzi':16,'Mansfield':17,'Sterling':18,'Toto':19,'Penguin':20,'Danze [HIDDEN AS OF 2019.Q1]':21,'Speakman':22,'Waterpik':23,'Symmons':24,'Aquatic':25,'Maax':26,'ASB':27,'Style Selections [HIDDEN AS OF 2019.Q1]':28,'Allen & Roth [HIDDEN AS OF 2019.Q1]':29,'Swanstone':30,'Aqua Glass':31,'Proflo':32,'Duravit':33,'Mirabelle':34,'Villeroy & Boch':35,'DecoLav':36,'Rohl':37,'Victoria & Albert':38,'Ronbow':39,'Vortens':40,'Oxygenics':41,'MTI':42,'Other':43,'Dont know':44},
        Showerhead:  {'Delta':1,'American':2,'Kohler':3,'Moen':4,'Peerless':5,'Pfister':6,'Aqua Source':7,'Glacier Bay':8,'Brizo':9,'Grohe':10,'Hansgrohe':11,'Briggs':12,'Crane [HIDDEN AS OF 2019.Q1]':13,'Eljer':14,'Gerber':15,'Jacuzzi':16,'Mansfield':17,'Sterling':18,'Toto':19,'Penguin':20,'Danze [HIDDEN AS OF 2019.Q1]':21,'Speakman':22,'Waterpik':23,'Symmons':24,'Aquatic':25,'Maax':26,'ASB':27,'Style Selections [HIDDEN AS OF 2019.Q1]':28,'Allen & Roth [HIDDEN AS OF 2019.Q1]':29,'Swanstone':30,'Aqua Glass':31,'Proflo':32,'Duravit':33,'Mirabelle':34,'Villeroy & Boch':35,'DecoLav':36,'Rohl':37,'Victoria & Albert':38,'Ronbow':39,'Vortens':40,'Oxygenics':41,'MTI':42,'Other':43,'Dont know':44},
        Toilet:  {'Delta':1,'American':2,'Kohler':3,'Moen':4,'Peerless':5,'Pfister':6,'Aqua Source':7,'Glacier Bay':8,'Brizo':9,'Grohe':10,'Hansgrohe':11,'Briggs':12,'Crane [HIDDEN AS OF 2019.Q1]':13,'Eljer':14,'Gerber':15,'Jacuzzi':16,'Mansfield':17,'Sterling':18,'Toto':19,'Penguin':20,'Danze [HIDDEN AS OF 2019.Q1]':21,'Speakman':22,'Waterpik':23,'Symmons':24,'Aquatic':25,'Maax':26,'ASB':27,'Style Selections [HIDDEN AS OF 2019.Q1]':28,'Allen & Roth [HIDDEN AS OF 2019.Q1]':29,'Swanstone':30,'Aqua Glass':31,'Proflo':32,'Duravit':33,'Mirabelle':34,'Villeroy & Boch':35,'DecoLav':36,'Rohl':37,'Victoria & Albert':38,'Ronbow':39,'Vortens':40,'Oxygenics':41,'MTI':42,'Other':43,'Dont know':44}
      
    }

    constructor(Category: string) {
        this.Category = Category;
        this.Brandlist = [];
    }
    SatisfactionT3B(codes): Array<any> {

        codes.forEach(element => {
            this.Brandlist.push(this.BrandMapping[element]);
        });
        this.Brandlist.forEach(element => {
      
                this.satisfactionst3isdebreak = this.SatisfactionT3BSideBreakMapping[this.Category][element];
            const config = new Chart(
                {
                    SideBreak: [this.satisfactionst3isdebreak],
                    TopBreak: [TimePeriod.Variable],
                    Type: ChartTypes.Table,
                    Measure: Measure.ColumnPercent
                },
                'SatisfactionT3B' + element,
            );
            config.showSideBreakOptions(0, [8, 9, 10]);
            config.showSideBreakBase(0, true);

            config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
            if (TimePeriod.PreviousPeriod) {
                config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
            } else {
                config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
            }
            config.showSideBreakUnWeightedBase(0, true);
            config.addCalculationLogic(output => {
                return output;
            });
            this.SatisfactionT3BC.push(config);
        });
        return this.SatisfactionT3BC;
    }
    RecommandationT3B(codes): Array<any> {

        codes.forEach(element => {
            this.Brandlist.push(this.BrandMapping[element]);
        });
        this.Brandlist.forEach(element => {            
       this.RecommandationT3Bsidebreak = this.RecommandationT3BSideBreakMapping[this.Category][element];
            const config = new Chart(
                {
                    SideBreak: [this.RecommandationT3Bsidebreak],
                    TopBreak: [TimePeriod.Variable],
                    Type: ChartTypes.Table,
                    Measure: Measure.ColumnPercent
                },
                'RecommandationT3B' + element,
            );
            config.showSideBreakOptions(0, [8, 9, 10]);
            config.showSideBreakBase(0, true);

            config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
            if (TimePeriod.PreviousPeriod) {
                config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
            } else {
                config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
            }
            config.showSideBreakUnWeightedBase(0, true);
            config.addCalculationLogic(output => {
                return output;
            });
            this.RecommandationT3BC.push(config);
        });
        return this.RecommandationT3BC;
    }
    PurchaseAgainT3B(codes): Array<any> {
        codes.forEach(element => {
            this.Brandlist.push(this.BrandMapping[element]);
        });
        this.Brandlist.forEach(element => {
           
                this.PurchaseAgainT3Bsidebreak = this.PurchaseAgainT3BSideBreakMapping[this.Category][element];
           
            const config = new Chart(
                {
                    SideBreak: [this.PurchaseAgainT3Bsidebreak],
                    TopBreak: [TimePeriod.Variable],
                    Type: ChartTypes.Table,
                    Measure: Measure.ColumnPercent
                },
                'PurchaseAgainT3B' + element,
            );
            config.showSideBreakOptions(0, [8, 9, 10]);
            config.showSideBreakBase(0, true);

            config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
            if (TimePeriod.PreviousPeriod) {
                config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
            } else {
                config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
            }
            config.showSideBreakUnWeightedBase(0, true);
            config.addCalculationLogic(output => {
                return output;
            });
            this.PurchaseAgainT3BC.push(config);
        });
        return this.PurchaseAgainT3BC;
    }
    SocialMedia(codes): Array<any> {

        codes.forEach(element => {
            this.Brandlist.push(this.BrandMapping[element]);
        });
        this.Brandlist.forEach(element => {
           const SocialMediasidebreak = this.SocialMediaSidebreak[this.Category]
           const SocialTopbreak = this.SocialMediaTopbreak[this.Category];
           const SocialTopbreakoption = this.SocialMediaTopbreakOptionMapping[this.Category][element];
            const config = new Chart(
                {
                    SideBreak: [SocialMediasidebreak],
                    TopBreak: [SocialTopbreak],
                    Type: ChartTypes.Table,
                    Measure: Measure.ColumnPercent
                },
                'SocialMedia' + element,
            );
            config.showSideBreakBase(0, true);
            config.showTopBreakOptions(0,[SocialTopbreakoption]);
            config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
            if (TimePeriod.PreviousPeriod) {
                config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable])
                .pipe(show(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]));
              } else {
                config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable])
                .pipe(show(0, [TimePeriod.CurrentPeriod]));
              }
            config.addCalculationLogic(output => {
                return output;
            });
            this.socialmedia.push(config);
        });
        return this.socialmedia;
    }

}
