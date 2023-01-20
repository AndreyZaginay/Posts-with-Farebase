import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  collection,
} from '@firebase/firestore';
import { addDoc, collectionData, deleteDoc, doc, docData, DocumentReference, Firestore, updateDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  postsCollection: CollectionReference<DocumentData> = collection(this.firestore, 'Posts');

  constructor(private readonly firestore: Firestore ) {}

  getAll(): Observable<Post[]>{
    return collectionData(this.postsCollection, {
      idField: 'id',
    }) as Observable<Post[]>
  }

  getOne(id: string): Observable<Post> {
    const postDocumentReference = doc(this.firestore, `Posts/${id}`);
    return docData(postDocumentReference, { idField: 'id' }) as Observable<Post>; 
  }

  create(post: Post): Observable<DocumentReference<DocumentData>> {
    return from(addDoc(this.postsCollection, post)) 
  }

  update(post: Post): Observable<void> {
    const postDocumentReference = doc(this.firestore, `Posts/${post.id}`);
    return from(updateDoc(postDocumentReference, { ...post }));
  }

 delete(id: string): Observable<void> {
    const postDocumentReference = doc(this.firestore, `Posts/${id}`);
    return from(deleteDoc(postDocumentReference));
  }

}
