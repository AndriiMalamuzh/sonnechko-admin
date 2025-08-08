import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div>
      <h1>Dashboard</h1>
      <p>This is a protected route that requires authentication</p>
    </div>
  `,
})
export class Dashboard {}
