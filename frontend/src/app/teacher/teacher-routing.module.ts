import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TakeAttendenceComponent } from './take-attendence/take-attendence.component';
import { EditAttendenceComponent } from './edit-attendence/edit-attendence.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'take-attendence',component:TakeAttendenceComponent},
  {path:'edit-attendence',component:EditAttendenceComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
