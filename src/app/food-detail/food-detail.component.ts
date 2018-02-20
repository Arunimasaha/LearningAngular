import { Component, OnInit, Input } from '@angular/core';
import {foods} from '../foods'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FoodService }  from '../food.service';
@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})

export class FoodDetailComponent implements OnInit {
  @Input() food: foods;
  constructor(private route: ActivatedRoute,
    private foodService: FoodService,
    private location: Location) { }//console.log(route.snapshot.paramMap.get('id'))}

    getFood(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.foodService.getFood(id)
        .subscribe(x => this.food = x);
    }
    goBack(): void {
      this.location.back();
    }
    update() : void{
      this.foodService.updateFood(this.food);
    }

  ngOnInit() {
    this.getFood();
  }

}
