import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { FirestoreService } from 'src/app/services/firestore.service';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  postList$: Observable<Post[]> = this.firebaseService.getAll();
  displayedColumns: string[] = ['Author', 'Title'];

  constructor (private readonly firebaseService: FirestoreService) {}

  ngOnInit(): void {
  }

  deletePost(id: string): void {
    this.firebaseService.delete(id);
  }
}
