import { Injectable } from '@angular/core';
import {MessageService} from './message.service'
import {foods} from './foods'
//import {FOOD} from './mock-food'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { forEach } from '@angular/router/src/utils/collection';
import { AngularFireDatabase } from 'angularfire2/database';
import { element } from 'protractor';
import { collectExternalReferences } from '@angular/compiler/src/output/output_ast';
//import { promise } from 'selenium-webdriver';
@Injectable()
export class FoodService {
  food : foods
  FOOD : foods[]
  config : any
  dbReference : any
  x : number
  y : number
  firebaseData : any
  item: Observable<any>;
  itemRef : any
 
  
  constructor(private messageService: MessageService , private db: AngularFireDatabase) {
    this.FOOD = [];
    this.item = db.object('food').valueChanges();
    this.itemRef = db.object('food');
    
  }

  getVal(obj)
  {
   this.firebaseData = obj;
   console.log(this.firebaseData)
  }

   getFoods(): Observable<foods[]>
  {
    var name : string

  //this.FOOD : accesable

   // this.item.subscribe(function(data){
   //   Object.keys(data).forEach(function(key){
   //     var food = {
   //        id : key,
   //        name : data[key].name
   //      }
   //
   //      this.FOOD.push(food)
   //
   //    }.bind(this))
   //  }.bind(this))

    this.item.subscribe(data => {
     // this.FOOD = []
     if(data != null)
     {
        Object.keys(data).forEach(key => {
          var food = {
                 id : parseInt(key),
                 name : data[key].name
               }
       if(this.FOOD.filter(element =>element.id == parseInt(key)).length == 0)
        {
        this.FOOD.push(food)
        }
      });}
    });


    this.messageService.add("fetched food list");


    console.log(this.FOOD)
    return of(this.FOOD);
  }
  getFood(id : number): Observable<foods>
  {
    this.messageService.add(`FoodService: fetched food id=${id}`);
    return of(this.FOOD.find(foods => foods.id == id));
  }
  updateFood (food : foods)
  {
   
    this.y = this.FOOD.findIndex(x=>x.id == food.id)
     var itemrefd = this.db.object('food/'+food.id + '');

     console.log(itemrefd)
     itemrefd.set({name : food.name})
     this.FOOD[this.y].name = food.name
  }
  insertFood(name : string) : void
  {
  //  this.food = FOOD.pop();
  //  this.x = this.food.id
  //  FOOD.push(this.food)
  //  this.food = {id : this.x +1
   //   , name}
   //   FOOD.push(this.food)

      var obj ={}

      var newKey = Math.floor((Math.random()*2000)).toString();
        console.log(obj)

      obj[newKey+''] = {
       
        name : name + ''
      }

      console.log(obj)
     

     
      this.itemRef.update(obj);
    }
    deleteFood(delfood : foods)
    {



     console.log(delfood.id)
     this.y = this.FOOD.findIndex(x=>x.id == delfood.id)
      var itemrefd = this.db.object('food/'+delfood.id + '');
      console.log(itemrefd)
      itemrefd.remove();
      this.FOOD.splice(this.y)
    };
  }

/*
x => Object.keys(x).forEach(function(key)
 {

  var food = {
     id : key,
     name : x[key].name
   }

   this.FOOD.push(
       this.food
   )


 })*/
