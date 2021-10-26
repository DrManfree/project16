import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Type } from 'src/app/shared/interfaces/type.interface';
import { TypeService } from 'src/app/shared/services/type.service';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent implements OnInit {

  types!: Type[];
  constructor(private typeService: TypeService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    try {
      this.types = await this.typeService.getTypes() || [];
    } catch (error) {
      console.log(error);
    }
  }

  linkToItem(id?: number) {
    if (id) {
      this.router.navigate([this.router.url, 'item', id]);
    }
    else {
      this.router.navigate([this.router.url, 'item']);
    }
  }
}
