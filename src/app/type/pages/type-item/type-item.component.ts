import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Type } from 'src/app/shared/interfaces/type.interface';
import { TypeService } from 'src/app/shared/services/type.service';

@Component({
  selector: 'app-type-item',
  templateUrl: './type-item.component.html',
  styleUrls: ['./type-item.component.css']
})
export class TypeItemComponent implements OnInit {
  id: number | null = null;
  type!: Type;
  typeForm!: FormGroup;
  types: Type[] = [];
  constructor(private typeService: TypeService, private fb: FormBuilder, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      this.id = params.id ? +params.id : null;
      this.getData();
    });
  }

  async getData() {
    const controls = {
      name: [null, [Validators.required, Validators.maxLength(100)]],
    };

    this.typeForm = this.fb.group(controls);

    if (this.id) {
      try {
        this.type = await this.typeService.getType(this.id);
      } catch (error) {
        console.log(error);
        return;
      }
      this.typeForm.patchValue(this.type);
    }
    else {
      this.typeForm.reset();
    }
  }

  async save() {
    if (this.id) {
      const type = this.typeForm.value;
      try {
        await this.typeService.putType(this.id, type);
        this.getData();
      }
      catch (error) {
       console.log(error);
      }
    } 
    else {
      const type = this.typeForm.value;
      try {
        const result = await this.typeService.postType(type);
        this.router.navigate([this.router.url, result.id]);
      }
      catch (error) {
       console.log(error);
      }
    }
  }

  async delete() {
    try {
      await this.typeService.deleteType(this.id!);
      this.router.navigate(['type']);
    } catch (error) {
      console.log(error);
    }
  }
}
