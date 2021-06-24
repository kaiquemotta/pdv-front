import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {HomeComponent} from "./views/home/home.component";
import {ProdutoComponent} from "./views/produto/produto.component";
import {VendaComponent} from "./views/venda/venda.component";
import {CategoriaComponent} from "./views/categoria/categoria.component";
import {ProdutoCreateComponent} from "./components/produto/produto-create/produto-create.component";
import {CategoriaCreateComponent} from "./components/categoria/categoria-create/categoria-create.component";
import {ProdutoUpdateComponent} from "./components/produto/produto-update/produto-update.component";
import {ProdutoDeleteComponent} from "./components/produto/produto-delete/produto-delete.component";
import {CategoriaUpdateComponent} from "./components/categoria/categoria-update/categoria-update.component";
import {VendaCreateComponent} from "./components/venda/venda-create/venda-create.component";
import {VendaUpdateComponent} from "./components/venda/venda-update/venda-update.component";
import {VendaReadComponent} from "./components/venda/venda-read/venda-read.component";
import {ModoPagamentoComponent} from "./views/modo-pagamento/modo-pagamento.component";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },

    {
        path: "produtos",
        component: ProdutoComponent
    },

    {
        path: "categorias",
        component: CategoriaComponent
    },

    {
        path: "produtos/create",
        component: ProdutoCreateComponent
    },

    {
        path: "categorias/create",
        component: CategoriaCreateComponent
    },

    {
        path: "produtos/update/:id",
        component: ProdutoUpdateComponent
    },

    {
        path: "produtos/delete/:id",
        component: ProdutoDeleteComponent
    },

    {
        path: "categorias/update/:id",
        component: CategoriaUpdateComponent
    },
    {
        path: "venda",
        component: VendaComponent
    },
    {
        path: "venda/read",
        component: VendaReadComponent
    },

    {
        path: "venda/create",
        component: VendaCreateComponent
    },
    {
        path: "venda/update/:id",
        component: VendaUpdateComponent
    },
    {
        path: "venda/delete/:id",
        component: VendaCreateComponent, data: {some_data: 'some value'}
    },
    {
        path: "modosPagamentos",
        component: ModoPagamentoComponent
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
