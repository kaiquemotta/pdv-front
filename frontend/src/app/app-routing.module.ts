import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {HomeComponent} from "./views/home/home.component";
import {ProdutoComponent} from "./views/produto/produto.component";
import {CategoriaComponent} from "./views/categoria/categoria.component";
import {ProdutoCreateComponent} from "./components/produto/produto-create/produto-create.component";
import {CategoriaCreateComponent} from "./components/categoria/categoria-create/categoria-create.component";
import {ProdutoUpdateComponent} from "./components/produto/produto-update/produto-update.component";
import {ProdutoDeleteComponent} from "./components/produto/produto-delete/produto-delete.component";
import {CategoriaUpdateComponent} from "./components/categoria/categoria-update/categoria-update.component";
import {VendaCreateComponent} from "./components/venda/venda-create/venda-create.component";

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
        path:"venda",
        component: VendaCreateComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
