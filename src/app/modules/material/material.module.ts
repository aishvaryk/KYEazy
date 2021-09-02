import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {​​​MatToolbarModule}​​​ from'@angular/material/toolbar';
import {​​​MatIconModule}​​​ from'@angular/material/icon';
import {​​​MatMenuModule}​​​ from'@angular/material/menu';
import {​​​MatDividerModule}​​​ from'@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatCardModule} from '@angular/material/card';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const MaterialModules = [
  MatStepperModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatRadioModule,
  MatSelectModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatDividerModule,
  MatSidenavModule,
  MatExpansionModule,
  MatCardModule,
  MatListModule,
  MatPaginatorModule,
  MatInputModule,
  MatTabsModule
];
@NgModule({
  declarations: [],
  imports: [
    MaterialModules
  ],
  exports: [
    MaterialModules
  ]
})
export class MaterialModule { }
