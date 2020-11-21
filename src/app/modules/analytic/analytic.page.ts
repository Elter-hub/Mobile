import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label,  monkeyPatchChartJsTooltip} from 'ng2-charts';
import {ActivatedRoute} from '@angular/router';
import { fromEvent, Observable} from 'rxjs';
import { debounceTime, map, startWith} from 'rxjs/operators';
import 'chartjs-plugin-labels';


@Component({
    selector: 'app-analytic',
    templateUrl: './analytic.page.html',
    styleUrls: ['./analytic.page.scss'],
})
export class AnalyticPage implements OnInit {
    totalData: any;
    eachItemData: any;
    eachItemNames: string[];
    arrayOfItemsTimeQuantity: any;
    dateAndQuantityObject: any;
    itemNameForChart: any;
    dateArrayForChart: any;
    quantityArrayForChart: any;
    pieChartLabels: Label[];
    pieChartData;
    pieChartType: ChartType = 'pie';
    pieChartPlugins = [];
    pieChartLegend;
    isScreenSmall$: Observable<boolean>;

    constructor(private activatedRoute: ActivatedRoute) {}

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
        const screenSizeChanged$ = fromEvent(window, 'resize').pipe(debounceTime(500))
                                                                        .pipe(map(checkScreenSize));
        this.isScreenSmall$ = screenSizeChanged$.pipe(startWith(checkScreenSize()));

        this.isScreenSmall$.subscribe(data => {
            this.pieChartLegend = !data;
        });
    }

    showItemGraph($event: any) {
        let item = $event.detail.value;
        let entries = Object.entries(this.eachItemData);
        entries.filter(data => data.includes(item)).forEach(data => {
            this.itemNameForChart = data[0];
            this.dateAndQuantityObject = data[1];
            this.dateArrayForChart = Object.keys(this.dateAndQuantityObject).map(date =>{
                return date.slice(0,10)
            })
            this.quantityArrayForChart = Object.values(this.dateAndQuantityObject)

            this.lineChartData[0].data = this.quantityArrayForChart;
            this.lineChartLabels = this.dateArrayForChart;
        })
    }

    public pieChartOptions: ChartOptions = {
        plugins: {
            labels: {
                render: "percentage",
                precision: 1,
                showZero: true,
                fontSize: 12,
                fontColor: "#000000",
                arc: true,
                position: "outside",
                overlap: false,
                showActualPercentages: true,
            }
        }

    };

    lineChartData: ChartDataSets[] = [
        { data: [1, 10], label: 'How much each day' },
    ];

    lineChartLabels: Label[] = ['20', '22'];

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
