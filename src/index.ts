import SeguradoraContractFetch from "./seguradora_aleatoria/contract-fetch";

(async () => {
    const seguradoraContractFetch = new SeguradoraContractFetch("Instância da página recebida do framework", "Parâmetros recebidos do requisitante");
    await seguradoraContractFetch.run()
})()