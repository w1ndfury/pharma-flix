import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'confirm-dialog',
  imports: [ButtonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent {
  public message: string =
    'Are you sure you want to proceed with this action? This change will be applied, and it cannot be undone.';
  public confirmButtonLabel: string = 'Confirm';

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.message = this.config?.data.message ?? this.message;
    this.confirmButtonLabel = this.config?.data.confirmButtonLabel;
  }

  public closeDialog(): void {
    this.ref.close({ confirm: false });
  }

  public onConfirm(): void {
    this.ref.close({ confirm: true });
  }
}
