import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {ModoPagamentoService} from "../modo-pagamento/modo-pagamento.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {VendaModel} from "../venda/venda.model";
import {VendaService} from "../venda/venda.service";
import {PagamentoModel} from "./pagamento.model";
import {PagamentoService} from "./pagamento.service";
import {MatTableDataSource} from "@angular/material/table";
import {ProdutoModel} from "../produto/produto.model";
import {ItemVendaModel} from "../venda/itemVenda.model";
import {ModoPagamentoModel} from "../modo-pagamento/modo-pagamento.model";

const defaultDialogConfig = new MatDialogConfig();

// export interface PeriodicElement {
//     name: string;
//     position: number;
//     weight: number;
//     symbol: string;
// }

const ELEMENT_DATA: PagamentoModel[] = [
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


    displayedColumns: string[] = [ 'modoPagamento', 'quantidadeParcela', 'valorPagamento'];
    dataSource: MatTableDataSource<PagamentoModel>;
    modosPagamentos: any
    pagamento: FormGroup;

    pagamentos: PagamentoModel [] = [];
    pagamento1: PagamentoModel;
    myControl = new FormControl();


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

    pagamentoModel: PagamentoModel = {
        id: 0,
        idModoPagamento: '',
        porcentagemDesconto: 0,
        valorPagamento: 0,
        idVenda: this.data.id,
        quantidadeParcela: 0,
        dataPagamento: '',
        troco: 0
    }


    constructor(
        public dialogRef: MatDialogRef<PagamentoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private modoPagamentoService: ModoPagamentoService, private vendaService: VendaService, private pagamentoService: PagamentoService, private fb: FormBuilder) {
        this.dataSource = new MatTableDataSource(this.pagamentos);

    }


    ngOnInit(): void {
        this.pagamento = this.fb.group({
            id: [{ value: '', disabled: false }],
            modoPagamento: [{ value: '', disabled: false }],
            total: [{ value: '', disabled: true }],
            restante: [{ value: '0.00', disabled: true }],
            subTotal: [{ value: '', disabled: true }],
            porcentagemDesconto: [{ value: '', disabled: false }],
            valorPagamento: [{ value: '', disabled: false }],
            idVenda: [{ value: this.data.id , disabled: false }],
            quantidadeParcela: [{ value: '', disabled: false }],
            troco: [{ value: '', disabled: true }],

        })
        this.findAllPagamentos();
        this.findAllModosPagamentos()
        this.vendaFindById();


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
        this.pagamentoService.insert(this.pagamento.value).subscribe(pagamento => {
            this.pagamentoModel = pagamento
            this.pagamentos.push({...this.pagamentoModel})
            this.dataSource = new MatTableDataSource(this.pagamentos);
        })
    }


    private findAllPagamentos() {
        this.pagamentoService.findByVendaId(this.data.id).subscribe(pagamentos => {
            this.pagamentos= pagamentos
            this.dataSource = new MatTableDataSource(this.pagamentos);
        })
    }
}
