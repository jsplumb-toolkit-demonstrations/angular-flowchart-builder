import { Injectable } from '@angular/core';
import {Dialogs} from '@jsplumbtoolkit/dialogs'
import {jsPlumbService, BrowserUIAngular} from '@jsplumbtoolkit/browser-ui-angular'

@Injectable({
  providedIn: 'root'
})
export class FlowchartService {

  private TOOLKIT_ID = 'flowchart'
  private dialogs: Dialogs
  private _toolkit: BrowserUIAngular

  constructor(private $jsplumb: jsPlumbService) {
    this.dialogs = new Dialogs({selector: '.dlg'})
  }

  showDialog(options: any) {
    this.dialogs.show(options)
  }

  get toolkit(): BrowserUIAngular {
    if (this._toolkit == null) {
      this._toolkit = this.$jsplumb.getToolkit(this.TOOLKIT_ID);
    }
    return this._toolkit
  }
}
