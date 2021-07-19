import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core'

import {FlowchartComponent } from './flowchart';
import {DatasetComponent } from './dataset';

import { BrowserUIAngular, jsPlumbService } from '@jsplumbtoolkit/browser-ui-angular'
import { uuid } from '@jsplumbtoolkit/core'
import {FlowchartService} from './app/flowchart.service'

@Component({
    selector: 'app-demo',
    template: `
          <nav>
              <a routerLink="/home" style="cursor:pointer;" routerLinkActive="active">Flowchart</a>
              <a routerLink="/data" style="cursor:pointer;" routerLinkActive="active">Dataset</a>
          </nav>
          <router-outlet></router-outlet>
    `
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild(FlowchartComponent) flowchart: FlowchartComponent;
  @ViewChild(DatasetComponent) dataset: DatasetComponent;

  toolkitId: string
  toolkit: BrowserUIAngular

  toolkitParams: any = {
    nodeFactory: (type: string, data: any, callback: Function, abort?: Function) => {
      this.flowchartService.showDialog({
        id: 'dlgText',
        title: 'Enter ' + type + ' name:',
        onOK: (d: any) => {
          data.text = d.text;
          // if the user entered a name...
          if (data.text) {
            // and it was at least 2 chars
            if (data.text.length >= 2) {
              // set an id and continue.
              data.id = uuid()
              callback(data);
            } else {
            // else advise the user.
              alert(type + ' names must be at least 2 characters!');
            }
          }
          // else...do not proceed.
        }
      });
    },
    beforeStartConnect: (node: any, edgeType: string) => {
      return { label: '...' };
    },
    edgeFactory: (type: string, data: any, continueCallback: Function, abortCallback: Function) => {
      this.flowchartService.showEdgeLabelDialog(data, continueCallback, abortCallback)
    }
  }

  constructor(private $jsplumb: jsPlumbService, private elementRef: ElementRef, private flowchartService: FlowchartService) {
    this.toolkitId = this.elementRef.nativeElement.getAttribute('toolkitId');
  }

  ngOnInit() {
    this.toolkit = this.$jsplumb.getToolkit(this.toolkitId, this.toolkitParams)
  }

  ngAfterViewInit() {
    this.toolkit.load({ url: 'data/copyright.json' });
  }

}
