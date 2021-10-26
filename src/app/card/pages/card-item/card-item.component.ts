import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'src/app/shared/interfaces/card.interface';
import { Type } from 'src/app/shared/interfaces/type.interface';
import { CardService } from 'src/app/shared/services/card.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {
  id: number | null = null;
  card!: Card;
  cardForm!: FormGroup;
  types: Type[] = [];
  constructor(private cardService: CardService, private fb: FormBuilder, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      this.id = params.id ? +params.id : null;
      this.getData();
    });
  }

  async getData() {
    const controls = {
      name: [null, [Validators.required, Validators.maxLength(100)]],
      content: [null, [Validators.required, Validators.maxLength(500)]],
      type: [null, [Validators.required, Validators.maxLength(100)]],
    };

    this.cardForm = this.fb.group(controls);

    if (this.id) {
      try {
        this.card = await this.cardService.getCard(this.id);
      } catch (error) {
        console.log(error);
        return;
      }
      this.cardForm.patchValue(this.card);
    }
    else {
      this.cardForm.reset();
    }
  }

  async save() {
    if (this.id) {
      let card = this.cardForm.value;
      card.editdate = new Date();
      try {
        await this.cardService.putCard(this.id, card);
        this.getData();
      }
      catch (error) {
       console.log(error);
      }
    } 
    else {
      let card = this.cardForm.value;
      card.createdate = new Date();
      card.editdate = null;
      try {
        const result = await this.cardService.postCard(card);
        this.router.navigate([this.router.url, result.id]);
      }
      catch (error) {
       console.log(error);
      }
    }
  }
}
