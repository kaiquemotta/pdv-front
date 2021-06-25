import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {ModoPagamentoService} from "../modo-pagamento/modo-pagamento.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemVendaModel} from "../venda/itemVenda.model";
import {VendaModel} from "../venda/venda.model";
import {VendaService} from "../venda/venda.service";
import {patchTsGetExpandoInitializer} from "@angular/compiler-cli/ngcc/src/packages/patch_ts_expando_initializer";
import {PagamentoModel} from "./pagamento.model";
import {PagamentoService} from "./pagamento.service";

const defaultDialogConfig = new MatDialogConfig();

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    // {position: 1, name: 'Dinheiro', weight: 1, symbol: 'R$ 2.00'},
    // {position: 2, name: 'Dinheiro', weight: 1, symbol: 'R$ 2.00'},
    // {position: 3, name: 'Dinheiro', weight: 1, symbol: 'R$ 2.00'},
    // {position: 4, name: 'Dinheiro', weight: 1, symbol: 'R$ 2.00'},
    // {position: 5, name: 'Dinheiro', weight: 1, symbol: 'R$ 2.00'},
];

@Component({
    selector: 'app-pagamento',
    templateUrl: './pagamento.component.html',
    styleUrls: ['./pagamento.component.css']
})


export class PagamentoComponent implements OnInit {
    displayedColumns = ['id', 'modoPagamento', 'quantidadeParcela', 'valorPagamento'];
    dataSource = ELEMENT_DATA;
    modosPagamentos: any
    pagamento: FormGroup;
    pagamentos: PagamentoModel [] = [];

    venda: VendaModel = {
        id: 0,
        nomeComanda: '',
        finalizada: false,
        subTotal: '',
        valorTotal: '',
        dataCriacaoVenda: '',
        dataFechamentoVenda: '',
        porcentagemDesconto: 0
    }


    ngOnInit(): void {
        this.findAllModosPagamentos()
        this.vendaFindById();

        this.pagamento = this.fb.group({
            id: ['', Validators.required],
            idModoPagamento: ['', Validators.required],
            porcentagemDesconto: [0, Validators.required],
            valorPagamento: [0, Validators.required],
            idVenda: [this.data.id, Validators.required],
            quantidadeParcela: ['', Validators.required],
            troco: [0, Validators.required],
        })
    }

    constructor(
        public dialogRef: MatDialogRef<PagamentoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private modoPagamentoService: ModoPagamentoService, private vendaService: VendaService, private pagamentoService: PagamentoService, private fb: FormBuilder) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    private findAllModosPagamentos() {
        this.modoPagamentoService.findAll().subscribe(modoPagamento => {
            this.modosPagamentos = modoPagamento
        })
    }

    private vendaFindById() {
        console.log(this.data.id)
        this.vendaService.findById(this.data.id).subscribe(venda => {
            this.venda = venda;
        })
    }

    addPagamento() {
        console.log(this.pagamento.value)
        this.pagamentoService.insert(this.pagamento.value).subscribe(pagamento => {
            console.log(pagamento)
        })
    }
}
