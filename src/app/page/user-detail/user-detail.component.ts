import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/share/model/user';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UsersService
    ) { }

    public user: User;

  ngOnInit(): void {
    this.getUserDetail();
  }

  getUserDetail(){
    this.userService.getUserDetail(this.data.name).subscribe(user => this.user = user);
  }

}
