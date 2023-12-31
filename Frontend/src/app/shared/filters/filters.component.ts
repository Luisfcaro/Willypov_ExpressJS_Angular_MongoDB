import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Category, Product, Filters } from 'src/app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})

export class FiltersComponent implements OnInit {
  @Input() listCategories: Category[] = [];
  @Output() filterEvent: EventEmitter<Filters> = new EventEmitter();

  routeFilters: string | null = null;
  filters!: Filters 

  id_cat: string = "";
  price_max: number | undefined;
  price_min: number | undefined;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private Router: Router,
    private Location: Location
  ) {}

   ngOnInit() : void {
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
   }
   
   public filter_products() {
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
    if (this.routeFilters) {
      this.filters = new Filters();
      this.filters = JSON.parse(atob(this.routeFilters));
    } else {
      this.filters = new Filters();
    }


    if (this.id_cat) {
      this.filters.category = this.id_cat;
    }
    
    this.price_calc(this.price_min, this.price_max);
    this.filters.price_min = this.price_min ? this.price_min : undefined;
    this.filters.price_max = this.price_max == 0 || this.price_max == null ? undefined : this.price_max;


    setTimeout(() => {
        this.Location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
        this.filterEvent.emit(this.filters);
    }, 200);


    // console.log(this.filters);

  }

  public price_calc(price_min: number | undefined, price_max: number | undefined) {    
    if (typeof price_min == 'number' && typeof price_max == 'number') {
      if(price_min > price_max){
        this.price_min = price_min;
        this.price_max = undefined;
      }else{
        this.price_min = price_min;
        this.price_max = price_max;
      }
    }
  }

  public remove_filters(){
    
    this.filters.category = "";
    this.filters.price_min = undefined;
    this.filters.price_max = undefined;
    
    this.Location.replaceState('/shop/');
    // console.log(this.filters);

    window.location.reload()

  }


}
