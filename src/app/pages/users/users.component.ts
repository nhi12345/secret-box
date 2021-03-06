import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NewNotificationComponent } from 'src/app/components/new-notification/new-notification.component';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/shared/model/user';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  // tslint:disable-next-line:object-literal-sort-keys
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['id', 'email', 'membership', 'update'];
  public dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;

  constructor(
    private userService: UsersService,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    // tslint:disable-next-line:variable-name
    private _bottomSheet: MatBottomSheet,
  ) {
    this.dataSource = new MatTableDataSource(this.users);
   }

  public users: User[];
  public searchText: string;
  public page = 1;
  public pageSize = 4;

  public ngOnInit(): void {
    this.getAllUser();
    this.userService.changeUsers.subscribe(() => {
      this.getAllUser();
    });
  }

  private getAllUser() {
    if (this.authService.isLoggedIn()) {
      this.userService.getAllUser().subscribe((users) => {
        this.users = users;
        this.dataSource.data = this.users;
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  public openDialogUserDetail(id: number) {
    const dialogRef = this.dialog.open(UserDetailComponent, {
      data: { name: id },
    });
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public openBottomSheet(): void {
    this._bottomSheet.open(NewNotificationComponent);
  }
}
