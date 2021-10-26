import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CardService } from 'src/app/shared/services/card.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {

  cardForm!: FormGroup;

  constructor(private cardService: CardService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  async getData() {
    const controls = {
      name: [null, [Validators.required, Validators.maxLength(100)]],
      content: [null, [Validators.required, Validators.maxLength(500)]],
      type: [null, [Validators.required, Validators.maxLength(100)]],
    };

    this.cardForm = this.fb.group(controls);
  }

  async save() {
    let card = this.cardForm.value;
    card.createdate = new Date();
    try {
      const result = await this.cardService.postCard(card);
      this.router.navigate([this.router.url, result.id]);
    } catch (error) {
      console.log(error);
    }
  }
}
