import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { jsPlumbToolkitModule } from '@jsplumbtoolkit/browser-ui-angular'
import { jsPlumbToolkitDragDropModule } from '@jsplumbtoolkit/browser-ui-angular-drop'
import { ControlsComponent } from './controls'

import { FlowchartComponent } from './flowchart'
import { ActionNodeComponent, QuestionNodeComponent, OutputNodeComponent, StartNodeComponent } from './components'

@NgModule({
    imports: [BrowserModule, jsPlumbToolkitModule, jsPlumbToolkitDragDropModule],
    declarations: [AppComponent, QuestionNodeComponent, ActionNodeComponent, StartNodeComponent, OutputNodeComponent, FlowchartComponent, ControlsComponent],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

