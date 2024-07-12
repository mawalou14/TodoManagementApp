import { TranslocoService } from '@jsverse/transloco';
import { Component, inject, OnInit } from '@angular/core';
import { LoadinServiceService } from 'src/app/modules/shared/services/loadingService/loadin.service.service';

@Component({
  selector: 'app-todos.page',
  templateUrl: './todos.page.component.html',
  styleUrls: ['./todos.page.component.css'],
})
export class TodosPageComponent implements OnInit {
  private translocoService = inject(TranslocoService);
  loadingService = inject(LoadinServiceService);
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
      localStorage.setItem('selectedLanguage', lang);
      this.translocoService.setActiveLang(lang);
      this.currentLang = lang;
      this.loadingService.hideLoader();
    }, 1000);
  }
}
