import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts';
import {AnalyticService} from './services/analytic.service';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, fromEvent, Observable} from 'rxjs';
import {debounce, debounceTime, map, startWith} from 'rxjs/operators';


@Component({
    selector: 'app-analytic',
    templateUrl: './analytic.page.html',
    styleUrls: ['./analytic.page.scss'],
})
export class AnalyticPage implements OnInit {
    itemNames: string[];
    itemSum: number[];
    totalData: any;
    showLegend: boolean;
    eachItemData: any;
    eachItemNames: string[];
    arrayOfItemsTimeQuantity: any;
    date: any;
    quantity: any;
    dateAndQuantityObject: any;
    itemNameForChart: any;
    dateArrayForChart: any;
    quantityArrayForChart: any;
    displayTimeSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])
    displayQuantitySubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([8, 5, 4])
    time$ = this.displayTimeSubject.asObservable();
    quantity$ = this.displayQuantitySubject.asObservable();
    TIME: any;
    QUANTITY: any;


    public pieChartOptions: ChartOptions = {
        responsive: true,
    };
    public pieChartLabels: Label[];
    public pieChartData;
    public pieChartType: ChartType = 'pie';
    public pieChartPlugins = [];
    public pieChartLegend;
    private isScreenSmall$: Observable<boolean>;


    constructor(private activatedRoute: ActivatedRoute,
                private analytic: AnalyticService) {
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe(data => {
            this.totalData = data.totalSells.sum;
            this.eachItemData = data.eachItem.singleItem;
            this.eachItemNames = Object.keys(this.eachItemData);
            this.arrayOfItemsTimeQuantity = Object.values(this.eachItemData);
        });
        this.pieChartLabels = Object.keys(this.totalData);
        this.pieChartData = Object.values(this.totalData);
        monkeyPatchChartJsTooltip();

        const checkScreenSize = () => document.body.offsetWidth < 768;
        const screenSizeChanged$ = fromEvent(window, 'resize').pipe(debounceTime(500)).pipe(map(checkScreenSize));
        this.isScreenSmall$ = screenSizeChanged$.pipe(startWith(checkScreenSize()));

        this.isScreenSmall$.subscribe(data => {
            this.pieChartLegend = !data;
        });

        this.time$.subscribe(data => {
            this.TIME = data
            console.log(this.TIME);
        })
        this.quantity$.subscribe(data => {
            this.QUANTITY = data
            console.log(this.QUANTITY);
        })
    }

    showItemGraph($event: any) {
        console.log(new Date('2020-11-16'));
        let item = $event.detail.value;
        let entries = Object.entries(this.eachItemData);
        entries.filter(data => data.includes(item)).forEach(data => {
            this.itemNameForChart = data[0];
            this.dateAndQuantityObject = data[1];
            this.dateArrayForChart = Object.keys(this.dateAndQuantityObject).map(date =>{
                return new Date(date.slice(0,10)).getDate()
            })
            this.displayTimeSubject.next(this.dateArrayForChart)
            this.quantityArrayForChart = Object.values(this.dateAndQuantityObject)
            this.displayQuantitySubject.next(this.quantityArrayForChart)
            console.log(this.itemNameForChart);
            console.log(this.dateArrayForChart);
            console.log(this.quantityArrayForChart);

            this.lineChartData[0].data = this.quantityArrayForChart;
            this.lineChartLabels = this.dateArrayForChart;
        })
    }

    lineChartData: ChartDataSets[] = [
        { data: this.QUANTITY, label: 'How much each day' },
    ];

    lineChartLabels: Label[] = this.TIME;

    lineChartOptions = {
        responsive: true,
    };

    lineChartColors: Color[] = [
        {
            borderColor: 'black',
            backgroundColor: 'rgb(10,90,208)',
        },
    ];

    lineChartLegend = true;
    lineChartPlugins = [];
    lineChartType = 'line';
}
