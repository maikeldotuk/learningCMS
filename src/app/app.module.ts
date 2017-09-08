import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {RouterModule, Routes} from '@angular/router';
import {AccordionModule, CollapseModule, ModalModule} from 'ngx-bootstrap';
import { MetaModule, MetaLoader, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import {HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrandingComponent } from './branding/branding.component';
import { LegendComponent } from './legend/legend.component';
import { LatestnewsComponent } from './latestnews/latestnews.component';
import { ProjectsComponent } from './projects/projects.component';
import { FooterComponent } from './footer/footer.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SkillsComponent } from './skills/skills.component';
import {UserService} from './user.service';
import {ServerService} from './server.service';
import { SkilleditorComponent } from './skilleditor/skilleditor.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { SkillpreviewComponent } from './skillpreview/skillpreview.component';
import { SingleSkillBoxComponent } from './skill-list/single-skill-box/single-skill-box.component';
import { PageeditorComponent } from './pageeditor/pageeditor.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { EditorpageComponent } from './editorpage/editorpage.component';
import { SkillpageComponent } from './skillpage/skillpage.component';
import { IndexComponent } from './index/index.component';
import { BackbuttonComponent } from './backbutton/backbutton.component';
import { LoaderComponent } from './loader/loader.component';


export function metaFactory(): MetaLoader {
  return new MetaStaticLoader({
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' - ',
    applicationName: 'Maikel.uk',
    defaults: {
      title: 'Maikel.uk',
      description: 'A website about a CMS to empower self-directed learning',
      'og:image': 'https://www.maikel.uk/images/logo.png',
      'og:type': 'website',
    }
  });
}



const routes: Routes = [
  {path: '', redirectTo: 'skills', pathMatch: 'full'},
  {path: 'skills', component: SkillsComponent},
  {path: 'skills/:skill/:page', component: PageeditorComponent},
  {path: 'skills/:skill', component: SkillpageComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'skilleditor', component: EditorpageComponent},
  {path: '**', component: NotfoundComponent}


];

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
    AboutComponent,
    ContactComponent,
    SkillsComponent,
    SkilleditorComponent,
    SkillListComponent,
    SkillpreviewComponent,
    SingleSkillBoxComponent,
    PageeditorComponent,
    NotfoundComponent,
    EditorpageComponent,
    SkillpageComponent,
    IndexComponent,
    BackbuttonComponent,
    LoaderComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    RouterModule.forRoot(routes),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: (metaFactory)
    })

  ],
  providers: [
    // {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: LocationStrategy, useClass: PathLocationStrategy },
    UserService, ServerService,
    {provide: 'SERVER_URL', useValue: 'https://www.maikel.uk'}
],
  bootstrap: [AppComponent]
})
export class AppModule {

}
