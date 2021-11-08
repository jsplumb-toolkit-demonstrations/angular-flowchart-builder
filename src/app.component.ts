import {Component, ElementRef, Input, ViewChild} from '@angular/core';

import {FlowchartComponent } from "./flowchart";
import {DatasetComponent } from "./dataset";
import { Dialogs, jsPlumbToolkit, jsPlumb, jsPlumbUtil  } from "jsplumbtoolkit";
import { jsPlumbService } from "jsplumbtoolkit-angular";

const nodes = 150

export function generate() {
  let x = 0, y = 0, idx = 0
  let data = {
    nodes:[],
    edges:[]
  }

  for (idx = 0; idx < nodes; idx++) {
    let id = "" + idx
    data.nodes.push({
      id,
      left:x,
      top:y,
      type:"action",
      w:80,
      h:80
    })

    x += 100
    y += 100

    let target = idx < nodes - 1 ? ("" + (idx + 1)) : ("" + (idx - 1))

    data.edges.push({
      source:id,
      target
    })

    let rnd = idx
    while(rnd === idx) {
      rnd = parseInt("" + (Math.random() * nodes), 10)
    }
    data.edges.push({
      source:id,
      target:"" + rnd
    })

    rnd = idx
    while(rnd === idx) {
      rnd = parseInt("" + (Math.random() * nodes), 10)
    }
    data.edges.push({
      source:"" + rnd,
      target:id
    })
  }

  return data

}

@Component({
    selector: 'jsplumb-demo',
    template:`       
          <nav>
              <a routerLink="/home" style="cursor:pointer;" routerLinkActive="active">Flowchart</a>
              <a routerLink="/data" style="cursor:pointer;" routerLinkActive="active">Dataset</a>
          </nav>
          <router-outlet></router-outlet>      
    `
})
export class AppComponent {

  @ViewChild(FlowchartComponent) flowchart:FlowchartComponent;
  @ViewChild(DatasetComponent) dataset:DatasetComponent;

  toolkitId:string;
  toolkit:jsPlumbToolkit;

  constructor(private $jsplumb:jsPlumbService, private elementRef:ElementRef) {
    this.toolkitId = this.elementRef.nativeElement.getAttribute("toolkitId");
  }

  ngOnInit() {
    this.toolkit = this.$jsplumb.getToolkit(this.toolkitId, this.toolkitParams)
  }



  ngAfterViewInit() {
    //this.toolkit.load({ url:"data/copyright.json" });
    const data = generate()
    console.log(data)
    console.time("load")
    this.toolkit.load({ data, onload:() => console.timeEnd("load") });
  }

  toolkitParams = {
    nodeFactory:(type:string, data:any, callback:Function) => {
      Dialogs.show({
        id: "dlgText",
        title: "Enter " + type + " name:",
        onOK: (d:any) => {
          data.text = d.text;
          // if the user entered a name...
          if (data.text) {
            // and it was at least 2 chars
            if (data.text.length >= 2) {
              // set an id and continue.
              data.id = jsPlumbUtil.uuid();
              callback(data);
            }
            else
            // else advise the user.
              alert(type + " names must be at least 2 characters!");
          }
          // else...do not proceed.
        }
      });
    },
    beforeStartConnect:(node:any, edgeType:string) => {
      return { label:"..." };
    }
  }

}
