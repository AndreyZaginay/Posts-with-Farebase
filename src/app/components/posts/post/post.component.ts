import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FirestoreService } from 'src/app/services/firestore.service';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{
  private readonly destroy$: Subject<void> = new Subject<void>();
  post!: Post;
  postForm!: FormGroup;

  constructor (
    private readonly firebaseService: FirestoreService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.initPostForm();
    this.getPost();
  }

  
  deletePost(): void {
    this.firebaseService.delete(this.post.id).pipe(
      takeUntil(this.destroy$)
      ).subscribe(() => this.router.navigate(['']))
    }

  getPost(): void {
    this.route.params.pipe(
      switchMap(params => this.firebaseService.getOne(params['id'])),
      takeUntil(this.destroy$)
    ).subscribe(post => {
      this.post = post;
      this.postForm.reset();
      this.patchPostForm();
    })
  }

  editPost(): void {
    const updatedPost = {id: this.post.id, ...this.postForm.getRawValue()};
    this.firebaseService.update(updatedPost).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.router.navigate([''])
    })
  }

  private patchPostForm(): void {
    this.postForm.patchValue({ ...this.post });
  }

  private initPostForm(): void {
    this.postForm = new FormGroup({
      author: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required])
    })
    this.postForm.controls['author'].disable();
  }
}
