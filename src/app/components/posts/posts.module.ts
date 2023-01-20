import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { PostComponent } from './post/post.component';
import { CreateComponent } from './create/create.component';
import { FirestoreService } from '../../services/firestore.service';
import { PostsComponent } from './posts.component';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: ':id',
    component: PostComponent
  }
]

@NgModule({
  declarations: [
    PostsComponent,
    CreateComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,  
    MatTableModule,
    MatInputModule,
    RouterModule.forChild(routes)
  ],
  providers: [FirestoreService]
})
export class PostsModule { }
