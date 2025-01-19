import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'error-dialog',
  imports: [ButtonModule],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.css',
})
export class ErrorDialogComponent {
  public errorMessage: string = 'Something went wrong!';

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.errorMessage = this.config?.data.errorMessage;
  }

  closeDialog(): void {
    this.ref.close();
  }
}
