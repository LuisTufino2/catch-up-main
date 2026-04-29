import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly developerIdentity = [
    environment.developerCode,
    environment.developerName,
    environment.developerSurname,
  ]
    .filter((value) => value?.trim().length > 0)
    .join(' ');
}
