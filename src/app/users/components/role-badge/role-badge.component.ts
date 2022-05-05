import { Component, Input } from '@angular/core';

@Component({
  selector: 'golden-role-badge',
  templateUrl: './role-badge.component.html',
  styleUrls: ['./role-badge.component.scss'],
})
export class RoleBadgeComponent {
  @Input() role?: string;
}
