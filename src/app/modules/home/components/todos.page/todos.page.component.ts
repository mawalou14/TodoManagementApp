import { TranslocoService } from '@jsverse/transloco';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos.page',
  templateUrl: './todos.page.component.html',
  styleUrls: ['./todos.page.component.css'],
})
export class TodosPageComponent implements OnInit {
  private translocoService = inject(TranslocoService);
  currentLang: string;
  supportedLangs: string[] = ['en', 'fr'];

  ngOnInit(): void {
    const selectedLanguage = localStorage.getItem('selectedLanguage');
    if (selectedLanguage) {
      this.translocoService.setActiveLang(selectedLanguage);
      this.currentLang = selectedLanguage;
    } else {
      this.currentLang = 'fr';
    }
  }

  changeLanguage(lang: string) {
    setTimeout(() => {
      localStorage.setItem('selectedLanguage', lang);
      this.translocoService.setActiveLang(lang);
      this.currentLang = lang;
    }, 1000);
  }
}
