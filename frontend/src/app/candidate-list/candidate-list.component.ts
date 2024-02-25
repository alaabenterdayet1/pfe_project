import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../services/candidate.service';
import * as XLSX from 'xlsx'; // Importez la bibliothèque xlsx

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.scss'

})
export class CandidateListComponent implements OnInit {
  candidates: any[] = [];
  eventId: string;
  constructor(private candidateService: CandidateService) {}

  ngOnInit() {
    console.log(this.eventId);
    this.loadCandidates();
  }
  
  editCandidate(candidate) {
    // Implement the logic for editing a candidate
    console.log('Edit candidate clicked');
    // You can open a modal or navigate to an edit page, etc.
  }

  deleteCandidate(candidate) {
    this.candidateService.deleteCandidate(candidate._id).subscribe(
      (response) => {
        this.loadCandidates();
      },
      (error) => {
        console.error('Error deleting candidate', error);
      }
    );
  }

  loadCandidates() {
    this.candidateService.getCandidates(this.eventId).subscribe(
      (candidates) => {
        this.candidates = candidates;
      },
      (error) => {
        console.error('Error fetching candidates', error);
      }
    );
  }

  exportToExcel() {
    const data = this.candidates.map(candidate => ({ 
      Nom: candidate.firstName,
      Prenom: candidate.lastName,
      Email: candidate.email,
      Telephone: candidate.telephone
    }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Candidates');
    XLSX.writeFile(wb, 'Candidats-'+this.eventId+'.xlsx');
  }
}
