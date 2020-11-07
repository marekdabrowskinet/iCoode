import { MatDialogRef } from '@angular/material/dialog';

export abstract class ModalBaseComponent<T> {
  constructor(
    public dialogRef: MatDialogRef<T>) {
    }

  private height: number = 0;
  private width: number = 0;

  public close(status: boolean) {
    this.dialogRef.close(status);
  }

  public updateSize(width: number, height: number){
    this.height = this.height + height;
    this.width = this.width + width;
    this.dialogRef.updateSize((this.width.toString() + 'px'), (this.height.toString() + 'px'));
  }
}
