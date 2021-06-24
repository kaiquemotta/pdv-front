import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";

const defaultDialogConfig = new MatDialogConfig();


@Component({
    selector: 'app-pagamento',
    templateUrl: './pagamento.component.html',
    styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent {

    actionsAlignment: string;

    config = {
        disableClose: false,
        panelClass: 'custom-overlay-pane-class',
        hasBackdrop: true,
        backdropClass: '',
        width: '',
        height: '',
        minWidth: '',
        minHeight: '',
        maxWidth: defaultDialogConfig.maxWidth,
        maxHeight: '',
        position: {
            top: '',
            bottom: '',
            left: '',
            right: ''
        },
        data: {
            message: 'Jazzy jazz jazz'
        }
    };

    constructor(
        public dialogRef: MatDialogRef<PagamentoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }


}
