import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { FirestoreService } from '../../../services/firestore.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();

postForm!: FormGroup;

constructor (
  private readonly firestoreService: FirestoreService,
  private readonly router: Router,
  ) {}

  get postFormTitle(): AbstractControl {
    return this.postForm.get('title') as FormControl;
  }

  get postFormContent(): AbstractControl {
    return this.postForm.get('content') as FormControl;
  }

  ngOnInit(): void {
    this.initPostForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  public submitPostForm(): void {
    if (this.postForm.invalid) {
      return
    }

    this.firestoreService.create(this.postForm.getRawValue())
    .pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.router.navigate([''])
    })
  }

  private initPostForm(): void {
    this.postForm = new FormGroup({
      author: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      content: new FormControl(null, [Validators.required, Validators.maxLength(100)])
    })
  }
}
