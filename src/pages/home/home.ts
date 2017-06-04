import { Component } from '@angular/core';
import {NavParams, NavController, ViewController} from 'ionic-angular';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public task: any = {};
  public isNew = true;
  public action = 'Add';

  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController,
              private navParams: NavParams,
              private taskService: TaskService) {

  }
  ionViewDidLoad(){
    let editTask = this.navParams.get('task');

    if (editTask) {
      this.task = editTask;
      this.isNew = false;
      this.action = 'Edit';
    }
  }

  save(){

    if (this.isNew) {
      this.taskService.add(this.task)
        .catch(console.error.bind(console));
    } else {
      this.taskService.update(this.task)
        .catch(console.error.bind(console));
    }
    this.dismiss();
  }

  delete(){
    this.taskService.delete(this.task)
      .catch(console.error.bind(console));

    this.dismiss();
  }

  dismiss(){
    this.viewCtrl.dismiss(this.task);
  }
}
