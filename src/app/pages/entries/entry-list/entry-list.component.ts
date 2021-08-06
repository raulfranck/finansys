import { Component, OnInit } from '@angular/core';

import {Entry} from '../shared/entry.model';
import {EntryService} from '../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.sass']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = []
  constructor(private categoryService: EntryService) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
      entries => this.entries = entries,
      error => alert('Erro ao carregar a lista')
    )

  }
  
  deleteEntry(category: any){
    const mustDelete = confirm('Deseja realmente excluir essa Categoria?')
    
    console.log(this.entries[0].category)
    if (mustDelete) {
      this.categoryService.deleteEntry(category.id).subscribe(
        () => this.entries = this.entries.filter(element => element != category),
        () => alert('error ao tentar excluir')
      )
    }
    }

}
