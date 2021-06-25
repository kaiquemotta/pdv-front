export interface VendaModel {
    id?: number,
    nomeComanda: string
    finalizada: boolean
    subTotal: string
    valorTotal: string
    dataCriacaoVenda: string
    dataFechamentoVenda: string
    porcentagemDesconto:number
}
