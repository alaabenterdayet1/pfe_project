import { Component, ViewChild } from '@angular/core';
import Evennement from '../models/evennement.model';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrls: ['./add-event-modal.component.scss']
})
export class AddEventModalComponent {
  constructor(
    public modal: NgbActiveModal,
    public modalService: NgbModal,
    private eventService: EventsService
  ) { }
  currentEvent: Evennement = new Evennement();
  @ViewChild('addForm') addForm: NgForm;
  mode = "";

  ngOnInit(): void {
    if(this.mode == 'maj'){
      this.currentEvent = JSON.parse(JSON.stringify(this.currentEvent))
    }
  }

  submitForm() {
    if (this.mode === "maj") {
      this.eventService.modifyEvent(this.currentEvent).subscribe(
        (event: any) => {
          this.modal.close(event);
          console.log("Event Modified: ", event);
        }
      );
    } else {
      this.eventService.addEvent(this.currentEvent).subscribe(
        (event: any) => {
          this.modal.close(event);
          console.log("Event Inserted: ", event);
        }
      );
    }
  }
}
