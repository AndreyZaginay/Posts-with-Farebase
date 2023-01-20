import { FirestoreService } from '../../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  private readonly destroy$: Subject<void> = new Subject<void>();

postForm!: FormGroup;

constructor (
  private readonly firestoreService: FirestoreService,
  private readonly router: Router,
  ) {}


  ngOnInit(): void {
    this.initPostForm();
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
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required])
    })
  }
}
