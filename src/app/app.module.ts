import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrandingComponent } from './branding/branding.component';
import { LegendComponent } from './legend/legend.component';
import { LatestnewsComponent } from './latestnews/latestnews.component';
import { ProjectsComponent } from './projects/projects.component';
import { FooterComponent } from './footer/footer.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BrandingComponent,
    LegendComponent,
    LatestnewsComponent,
    ProjectsComponent,
    FooterComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
