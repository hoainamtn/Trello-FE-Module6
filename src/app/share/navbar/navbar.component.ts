import {Component, OnInit} from '@angular/core';
import {NavbarService} from "../../service/navbar/navbar.service";
import {ToastService} from "../../service/toast/toast.service";
import {AuthenticateService} from "../../service/authenticate.service";
import {Router} from "@angular/router";
import {User} from "../../model/user";
import {UserToken} from "../../model/user-token";
import {UserService} from "../../service/user/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: UserToken = {};
  loggedInUser!: User;
  id!: any;
  imgSrc: any;

  constructor(public navbarService: NavbarService,
              private toast: ToastService,
              private authenticateService: AuthenticateService,
              private router: Router,
              private userService: UserService
  ) {
    this.authenticateService.currentUserSubject.subscribe(data => {
      this.currentUser = data;
    })
  }

  ngOnInit(): void {
    this.navbarService.getCurrentUser()
    this.getUserById()
  }

  getUserById() {
    if (this.authenticateService.getCurrentUserValue() != null) {
      this.id = this.authenticateService.getCurrentUserValue().id;
      this.userService.getUserById(this.id).subscribe(user => {
        this.loggedInUser = user;
        if (this.loggedInUser.image == null) {
          this.loggedInUser.image = "https://i.pinimg.com/originals/57/fb/31/57fb3190d0cc1726d782c4e25e8561e9.png";
        }
        this.imgSrc = this.navbarService.loggedInUser.image;
      })
    }
  }

  logout() {
    this.authenticateService.logout();
    this.router.navigateByUrl("/");
  }


}
