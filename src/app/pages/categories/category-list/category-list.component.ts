import { Component, OnInit } from '@angular/core';

import {Category} from '../shared/category.model'
import {CategoryService} from '../shared/category.service'


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.sass']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = []

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      error => alert('Erro ao carregar a lista')
    )
  }

  delete(category: any){
    const mustDelete = confirm('Deseja realmente excluir essa Categoria?')

    if (mustDelete) {
      this.categoryService.deleteCategory(category.id).subscribe(
        () => this.categories = this.categories.filter(element => element != category),
        () => alert('error ao tentar excluir')
      )
    }
    }

}
