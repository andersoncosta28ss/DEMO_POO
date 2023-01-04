import ContractFetch from "../base/contract-fetch";
import { timeout } from "../commom";

type SeguradoraPolicyFromSearchPage = {
    number: string;
    endorsement: {
        number: string;
        type: string | null;
    }
}

type SeguradoraPolicyFromDetailPage = {
    insured: {
        name: string
    }
}

type SeguradoraPolicyToPublish = SeguradoraPolicyFromSearchPage & SeguradoraPolicyFromDetailPage;

export default class SeguradoraContractFetch extends ContractFetch<SeguradoraPolicyFromSearchPage, SeguradoraPolicyFromDetailPage, SeguradoraPolicyToPublish> {
    goToSearchPage = async (): Promise<void> => {
        await timeout(2);
        console.log("Chegamos na página de busca");
    };

    applyFiltersInSearchPage = async (): Promise<void> => {
        await timeout(2);
        console.log("Aplicamos os filtros na página de busca");
    };

    getValuesFromSearchPage = async (): Promise<SeguradoraPolicyFromSearchPage[]> => {
        const policies: SeguradoraPolicyFromSearchPage[] = []
        for (let i = 1; i < 3; i++) {
            await timeout(2);
            const policy: SeguradoraPolicyFromSearchPage = { endorsement: { number: '0', type: null }, number: i.toString() }
            policies.push(policy);
        }
        return policies;
    };

    goToDetailsPage = async (contract: SeguradoraPolicyFromSearchPage): Promise<void> => {
        await timeout(2);
        console.log("Entramos na tela de detalhe da apólice " + contract.number);
    };

    getValuesFromDetailsPage = async (): Promise<SeguradoraPolicyFromDetailPage> => {
        await timeout(0.5);
        return { insured: { name: "Fulano de tal" } };
    }

    parseContract = (fromSearchPage: SeguradoraPolicyFromSearchPage, fromDetailPage: SeguradoraPolicyFromDetailPage): SeguradoraPolicyToPublish => {
        return {
            endorsement: { ...fromSearchPage.endorsement },
            insured: { ...fromDetailPage.insured },
            number: fromSearchPage.number
        };
    };
}