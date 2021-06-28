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


    displayedColumns: string[] = ['modoPagamento', 'quantidadeParcela', 'valorPagamento'];
    dataSource: MatTableDataSource<PagamentoModel>;
    modosPagamentos: any
    pagamento: FormGroup;
    pagamentos: PagamentoModel [] = [];
    modoPagamento: any;
    public format = "### \'%\'"

    venda: VendaModel = {
        id: 0,
        nomeComanda: '',
        finalizada: false,
        subTotal: '',
        valorTotal: 0,
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
            id: [{value: '', disabled: true}],
            modoPagamento: [{value: '', disabled: false,}],
            total: [{value:  this.venda.valorTotal, disabled: true}],
            restante: [{value: '0.00', disabled: true}],
            subTotal: [{value: this.venda.subTotal, disabled: true}],
            porcentagemDesconto: [{value: '', disabled: true}],
            valorPagamento: [{value: '', disabled: true}],
            idVenda: [{value: this.data.id, disabled: true}],
            quantidadeParcela: [{value: '', disabled: true}],
            troco: [{value: '', disabled: true}],

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
            this.pagamentos = pagamentos
            this.dataSource = new MatTableDataSource(this.pagamentos);
        })
    }

    selectModoPgto(modoPagamento: any) {
        this.modoPagamento = modoPagamento;

        console.log("entroua");

        if (modoPagamento.aVista === true) {
            console.log("entrou");
            this.pagamento.controls.porcentagemDesconto.enable();
            this.pagamento.controls.valorPagamento.enable();
            this.pagamento.controls.quantidadeParcela.setValue('1');

        } else {

            this.pagamento.controls.valorPagamento.enable();
            this.pagamento.controls.quantidadeParcela.setValue('1');
            this.pagamento.controls.quantidadeParcela.enable();


        }
        console.log(modoPagamento)
    }

    recalculaTotal() {
        var desc = this.pagamento.controls.porcentagemDesconto.value;
        var sub =  this.venda.valorTotal;

        if (desc > 0 && desc <= this.modoPagamento.porcentagemDesconto) {
            console.log((desc * sub) - sub);
            console.log(this.venda.valorTotal);
            this.pagamento.controls.total.setValue( (desc * sub) - sub);
            console.log("desc ")
        } else {
            this.modoPagamentoService.mostrarMessagem("Porcentagem não permitida", true)
            this.pagamento.controls.porcentagemDesconto.setValue(0);
        }

    }
}
