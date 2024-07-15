import { Component, inject, OnInit } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { LoadinServiceService } from 'src/app/modules/shared/services/loadingService/loadin.service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private translocoService = inject(TranslocoService);
  loadingService = inject(LoadinServiceService);
  currentLang: string;
  supportedLangs: string[] = ['en', 'fr'];
  userFullName = 'Guest';

  ngOnInit(): void {
    this.loadingService.setLoading(false);
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
    this.loadingService.setLoading(true);
    this.loadingService.setLoading(true);
    setTimeout(() => {
      localStorage.setItem('selectedLanguage', lang);
      this.translocoService.setActiveLang(lang);
      this.currentLang = lang;
      this.loadingService.setLoading(false);
    }, 1000);
  }
}
