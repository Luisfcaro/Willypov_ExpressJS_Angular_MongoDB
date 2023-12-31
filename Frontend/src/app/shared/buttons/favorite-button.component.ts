import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { Product, ProductService, UserService } from '../../core';
import { of } from 'rxjs';
import { concatMap ,  tap } from 'rxjs/operators';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteButtonComponent {
  constructor(
    private productService: ProductService,
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  @Input() product!: Product;
  @Output() toggle = new EventEmitter<boolean>();

  isSubmitting = false;
  productLiked = false;

  toggleFavorite() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return of(null);
        }

        // Favorite the product if it isn't favorited yet
        if (!this.product.likesCount) {
          return this.productService.like(this.product.slug)
          .pipe(tap(
            data => {
              this.isSubmitting = false;
              this.toggle.emit(true);
              console.log("like");
            },
            err => this.isSubmitting = false
          ));

        // Otherwise, unfavorite the product
        } else {
          return this.productService.dislike(this.product.slug)
          .pipe(tap(
            data => {
              this.isSubmitting = false;
              this.toggle.emit(false);
              console.log("dislike");
            },
            err => this.isSubmitting = false
          ));
        }

      }
    )).subscribe(() => {
      this.cd.markForCheck();
    });
  }
}
