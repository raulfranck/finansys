import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDatabase implements InMemoryDbService {
    createDb() {
        const categories = [
            {id: 1, name: "Lazer", description: "Cinema, viagens, bares e restaurantes, etc"},
            {id: 2, name: "Saúde", description: "Convênio, Remédios e gastos similares"},
            {id: 3, name: "Moradia", description: "Aluguel, contas do lar(internet, água, luz), financiamento do imóvel"},
            {id: 4, name: "Salário", description: "Salário"},
            {id: 4, name: "Freelancer", description: "Ganhos com trabalhos externos"}
        ]

        return {categories}
    }
}