import { Component } from '@angular/core';
import { EventsService } from '../services/events.service';
import { CandidateService } from '../services/candidate.service';

import Evennement from '../models/evennement.model';
import Condedat from '../models/candidate.model';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEventModalComponent } from '../add-event-modal/add-event-modal.component';
import { CandidateListComponent } from '../candidate-list/candidate-list.component';
import { RegistrationComponent } from '../registration/registration.component';



@Component({
  selector: 'app-events-component',
  templateUrl: './events-component.component.html',
  styleUrl: './events-component.component.scss'
})
export class EventsComponentComponent {
  eventList:Array<Evennement> = [];
  role = "Admin"
  constructor(private eventService:EventsService, private modal:NgbModal) { }
  ngOnInit(): void {
      this.refreshEvents();
    }
    refreshEvents(){
      this.eventService.getAllEvents().subscribe(
        (events:any)=>{
          this.eventList = events;
        }
        );
      }
      
    openEventForm() {
      const modalRef = this.modal.open(AddEventModalComponent, {
        size: 'md',
      });
      modalRef.result.then((result) => {
        //console.log(result);
        this.refreshEvents();
      }
      ).catch((error) => {
        //console.log(error);
      });
    }
    openUpdateEventForm(event:Evennement) {
      const modalRef = this.modal.open(AddEventModalComponent, {
        size: 'md',
      });
      modalRef.componentInstance.mode = "maj"
      modalRef.componentInstance.currentEvent = event;
      modalRef.result.then((result) => {
        //console.log(result);
        this.refreshEvents();

      }
      ).catch((error) => {
        //console.log(error);
      });
    }
    showDeletePopup(event:Evennement) {
      if(confirm("Etes vous sûr de vouloir supprimer l'évènement "+event.name+" ?")){
        this.eventService.deleteEvent(event._id).subscribe(
          (response)=>{
            this.refreshEvents();
          },
          (error)=>{
            console.error('Error deleting event', error);
          }
          );
        }
    }
    openListCandedateForm(event:Evennement) {
      const modalRef = this.modal.open(CandidateListComponent, {
        size: 'lg',
      });
      modalRef.componentInstance.eventId = event._id;
      modalRef.result.then((result) => {
        console.log(result);
      }
      ).catch((error) => {
        //console.log(error);
      });
    }
    openEventRegistrationForm(event:Evennement) {
      const modalRef = this.modal.open(RegistrationComponent, {
        size: 'md',
      });
      modalRef.componentInstance.eventId = event._id;
      modalRef.result.then((result) => {
        //console.log(result);
        this.refreshEvents();
        modalRef.close();
      }
      ).catch((error) => {
        //console.log(error);
      });
    }

  }
