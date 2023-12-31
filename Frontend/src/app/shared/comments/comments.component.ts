import { ChangeDetectorRef, Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comment, User, UserService } from '../../core';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() comment!: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();

  canModify!: boolean;
  subscription!: Subscription;

  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.subscription = this.userService.currentUser.subscribe(
      (userData: User) => {
          this.canModify = userData.username === this.comment.author.username;
          console.log(this.canModify);
          this.cd.markForCheck();
      }
  );
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
}

deleteClicked() {
    this.deleteComment.emit(true);
}

}
