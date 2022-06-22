import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultantComponent } from './consultant/consultant.component';
import { MenuComponent } from './menu/menu.component';
import { SoustraitantComponent } from './soustraitant/soustraitant.component';

const routes: Routes = [
  {path:"consultant", component: ConsultantComponent},
  {path:"menu", component: MenuComponent},
  {path:"soustraitant", component: SoustraitantComponent}

]

@NgModule({
 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
