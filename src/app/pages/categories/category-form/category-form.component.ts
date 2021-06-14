import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Router} from '@angular/router';

import {Category} from '../shared/category.model';
import {CategoryService} from '../shared/category.service';

import {switchMap} from 'rxjs/operators';

import * as toastr from 'toastr'


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.sass']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = [];
  submittingForm: boolean = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked() {}

  // Private methods
  private setCurrentAction() {
    if(this.route.snapshot.url[0].path == "new") {
      this.currentAction = "new"
    } else {
      this.currentAction = "edit"
    }
  }

  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    })
  }

}
