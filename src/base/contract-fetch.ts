import { timeout } from "../commom";
import { writeFileSync } from 'fs'

export default abstract class ContractFetch<FromSearchPage, FromDetailPage, ToPublish> {

    page: any;
    params: any;

    constructor(page: any, params: any) {
        this.page = page;
        this.params = params;
    }

    abstract goToSearchPage: () => Promise<void>;
    abstract applyFiltersInSearchPage: () => Promise<void>;
    abstract getValuesFromSearchPage: () => Promise<FromSearchPage[]>;
    abstract goToDetailsPage: (contract: FromSearchPage) => Promise<void>;
    abstract getValuesFromDetailsPage: () => Promise<FromDetailPage>;
    abstract parseContract: (fromSearchPage: FromSearchPage, fromDetailPage: FromDetailPage) => ToPublish
    sendToAPI = async (values: ToPublish[]): Promise<void> => {
        await timeout(5);
        writeFileSync('./resultado.json', JSON.stringify(values), 'utf-8');
        console.log("Enviando para API");
    }

    run = async () => {
        const itemsToPublish: ToPublish[] = [];

        await this.goToSearchPage();
        await this.applyFiltersInSearchPage();
        const values = await this.getValuesFromSearchPage();

        values.forEach(async (value: FromSearchPage) => {            
            await this.goToDetailsPage(value);
            const detail = await this.getValuesFromDetailsPage();
            const toPublish = this.parseContract(value, detail);
            itemsToPublish.push({ ...toPublish });
        })
        
        await this.sendToAPI(itemsToPublish);
    }
}