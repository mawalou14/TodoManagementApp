import { Component, inject, OnInit } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { LoadinServiceService } from 'src/app/modules/shared/services/loadingService/loadin.service.service';
import { TodoService } from '../../services/todo.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private translocoService = inject(TranslocoService);
  private authService = inject(AuthService);
  private loadingService = inject(LoadinServiceService);
  private router = inject(Router);
  currentLang: string;
  supportedLangs: string[] = ['en', 'fr'];
  userFullName = 'Guest';

  ngOnInit(): void {
    const selectedLanguage = localStorage.getItem('selectedLanguage');
    if (selectedLanguage) {
      this.translocoService.setActiveLang(selectedLanguage);
      this.currentLang = selectedLanguage;
    } else {
      this.currentLang = 'fr';
    }
    this.getUserInformation();
  }

  getUserInformation() {
    const completeUserInformation = JSON.parse(localStorage.getItem('user'));
    const user = completeUserInformation.user;
    this.userFullName = user.fullName;
    this.userFullName = this.getInitials(user.fullName);
  }

  getInitials(fullName: string): string {
    if (!fullName) return 'G';
    const nameParts = fullName.split(' ');
    const initials = nameParts
      .map((name) => name.charAt(0).toUpperCase())
      .join('');
    return initials;
  }

  changeLanguage(lang: string) {
    this.loadingService.showLoader();
    setTimeout(() => {
      this.loadingService.hideLoader();
      localStorage.setItem('selectedLanguage', lang);
      this.translocoService.setActiveLang(lang);
      this.currentLang = lang;
    }, 1000);
  }

  logout(): void {
    this.loadingService.showLoader();
    setTimeout(() => {
      this.loadingService.hideLoader();
      this.authService.logout();
      this.router.navigate(['/auth']);
    }, 1000);
  }
}
