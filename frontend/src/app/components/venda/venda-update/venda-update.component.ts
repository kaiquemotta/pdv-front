import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {first, map, startWith} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {VendaService} from "../venda.service";
import {ProdutoService} from "../../produto/produto.service";
import {ProdutoModel} from "../../produto/produto.model";
import {VendaModel} from "../venda.model";
import {ItemVenda} from "../ItemVenda";


@Component({
    selector: 'app-venda-update',
    templateUrl: './venda-update.component.html',
    styleUrls: ['./venda-update.component.css']
})
export class VendaUpdateComponent implements OnInit {


    myControl = new FormControl();
    filteredOptions: Observable<ProdutoModel[]>;
    options: ProdutoModel[] = new Array<ProdutoModel>();
    itemsVenda: ItemVenda [] = [];
    userControl = new FormControl();
    itemVenda: ItemVenda = {
        id: 0,
        quantidade: 1,
        subTotal: 0,
        produtoNome: '',
        produtoPreco: 0,
    }


    constructor(private produtoService: ProdutoService) {
    }

    toggleSelection(produto: ProdutoModel) {
        produto.selected = !produto.selected;
        if (produto.selected) {
            this.itemVenda.produtoNome = produto.nome;
            this.itemVenda.produtoPreco = produto.preco;
            this.itemVenda.quantidade = 1;
            this.itemVenda.subTotal = produto.preco * 3;
            this.itemsVenda.push({...this.itemVenda})
        } else {
            const i = this.itemsVenda.findIndex(value => value.produtoNome === produto.nome && value.produtoNome === produto.nome);
            this.itemsVenda.splice(i, 1);
        }
        this.userControl.setValue(this.itemsVenda);
    }

    ngOnInit() {
        this.options = this.findAllCategorias();
        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'string' ? value : value.nome),
                map(nome => nome ? this._filter(nome) : this.options)
            );
    }

    displayFn(product: ProdutoModel): string {
        return product && product.nome ? product
            .nome : '';
    }

    optionClicked(event: Event, user: ProdutoModel) {
        event.stopPropagation();
        this.toggleSelection(user);
    }

    private _filter(nome: string): ProdutoModel[] {
        console.log(nome.toString())
        const filterValue = nome.toLowerCase();
        return this.options.filter(option => option.nome.toLowerCase().indexOf(filterValue) === 0);
    }

    private findAllCategorias(): ProdutoModel[] {
        this.produtoService.findAll().subscribe(produtos => {
            console.log(produtos)
            produtos.map(categoria => this.options.push(categoria))
        })
        return this.options;
    }


}

