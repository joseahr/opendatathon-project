import { Injectable, Inject } from '@angular/core';

import { FirebaseApp } from 'angularfire2';

@Injectable()
export class StorageService {

  storageRef;

  constructor(@Inject(FirebaseApp) firebaseApp: any) {
    this.storageRef = firebaseApp.storage().ref();
    this.uploadFile(new File(['aaaa', 'bbb'], 'filename3.txt'), 'reports');
  }

  uploadFile(file : File, child : string){
    const bucket = this.storageRef.child(`${child}/${file.name}`);
    const task = bucket.put(file);

    return new Promise( (res, rej) => {
      task.on('state_changed', (data)=>{
        console.log(data.state) 
      }, rej, res)
    });
  }

}
