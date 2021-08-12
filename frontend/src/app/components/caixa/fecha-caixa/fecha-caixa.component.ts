import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CaixaService} from "../caixa.service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "rxjs";
import {ProdutoModel} from "../../produto/produto.model";
import {CaixaModel} from "../caixa.model";

@Component({
    selector: 'app-fecha-caixa',
    templateUrl: './fecha-caixa.component.html',
    styleUrls: ['./fecha-caixa.component.css']
})
export class FechaCaixaComponent implements OnInit {

    caixa: FormGroup
    caixaF: CaixaModel;

    constructor(private caixaService: CaixaService,
                private router: Router,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {

        this.caixa = this.fb.group({
            nome: [{value: '', disabled: true}],
            data: [{value: '', disabled: true}],
            valorInicial: [{value: '', disabled: true}],
            valorTotalCaixa: [{value: '', disabled: true}],
            valorTotalAvista: [{value: '', disabled: true}],
            valorFechamentoAvista: [{value:'', disabled: false}],
            valorTotalCartao: [{value: '', disabled: true}],
            valorTotalCartaoFechamento: [{value: '',disabled: false}],
            diferencaCartao: [{value: '',disabled: true}],
            diferencaAvista: [{value: '',disabled: true}]
        })

        this.getCaixaFechar();
    }

    get c() {
        return this.caixa.controls
    }

    criarCaixa(): void {

        if (this.caixa.invalid) {
            return;
        }

        //subscribe depois que ele recebe o retorno do back-end ele chama essa arrow function
        this.caixaService.insert(this.caixa.value).subscribe(() => {
            this.caixaService.mostrarMessagem('Caixa criada com sucesso!', false)
            this.router.navigate(["/caixa"]);

        })

    }

    getCaixaFechar() {
        this.caixaService.getCaixaFechar().subscribe(caixa => {
            this.caixaF = caixa;
            this.caixa.controls.nome.value.setValue(this.caixaF)
            console.log(this.caixaF)
        })
    }
    cancelar(): void {
        this.router.navigate(["/"]);
    }
}
