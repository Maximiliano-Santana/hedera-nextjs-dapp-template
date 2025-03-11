import { DAppConnector } from "@hashgraph/hedera-wallet-connect";
import { HederaSessionEvent, HederaChainId, HederaJsonRpcMethod } from "@hashgraph/hedera-wallet-connect";
import { LedgerId, PublicKey } from "@hashgraph/sdk";
import { useWalletState } from "@/services/walletState";
import { SignClientTypes } from "@walletconnect/types";

interface walletConnectClient{
    connector: DAppConnector | undefined;
    session: any;
    getInstance?: () => void;
    connect?: () => void;
    disconnect?: () => void;
    getSigner?: () => void;
    getAccountId?: () => void;
    getPublicKey?: () => void;
    signTransaction?: (tx: any) => void;
}

export default class WalletConnectClient implements walletConnectClient{
    private static instance: WalletConnectClient
    connector: DAppConnector | undefined;
    session: any;

    constructor(){}

    static async getInstance() {
        if (!WalletConnectClient.instance) {
            const instance = new WalletConnectClient();
            await instance.init();
            WalletConnectClient.instance = instance;
        }
        return WalletConnectClient.instance;
    }

    private async init() {
        const appMetadata: SignClientTypes.Metadata = {
            name: "MichiMint",
            description: "Mint michis and mint",
            icons: ["hedera.svg"],   
            url: window.location.origin 
        }
        
        const network: string = process.env.NEXT_PUBLIC_HEDERA_NETWORK || "Testnet";

        this.connector = new DAppConnector(
            appMetadata,
            LedgerId.fromString(network.toLowerCase()),
            process.env.NEXT_PUBLIC_PROJECT_ID || "",
            Object.values(HederaJsonRpcMethod),
            [HederaSessionEvent.ChainChanged, HederaSessionEvent.AccountsChanged],
            [HederaChainId[network as keyof typeof HederaChainId]]
        );
        
        console.log(`Initilizing WalletConnect... :${network}`);
        await this.connector.init({logger: 'error'})
        console.log("Wallet connect initialized");
    }

    async connect(){
        const { connect } = useWalletState.getState();
        this.session = await this.connector?.openModal();
        console.log(this.session);
        
        //Syncronize walletStore
        const sessionAccount = this.session.namespaces?.hedera?.accounts?.[0]
        const sessionParts = sessionAccount?.split(':')
        const accountId = sessionParts.pop()
        connect(accountId)
    }
    
    async disconnect(){
        console.log('disconnecting')
        const { disconnect } = useWalletState.getState();
    
        if(this.session){
            console.log(this.session)
            this.connector?.disconnectAll().then(()=>{
                disconnect()
            });
        } 
    }
    
    getSigner() {
        if (this.connector?.signers.length === 0) {
          throw new Error('No signers found!');
        }
        return this.connector?.signers[0];
    }
    
    getAccountId(){
        const sessionAccount = this.session.namespaces?.hedera?.accounts?.[0]
        const sessionParts = sessionAccount?.split(':')
        const accountId = sessionParts.pop()
        return accountId
    }
    
    getPublicKey(){
        return PublicKey.fromStringED25519(this.session.peer.publicKey)
    }
    
    async signTransaction(tx: any){
        const signer = this.getSigner();
        await tx.freezeWithSigner(signer);
        const txResult = await tx.executeWithSigner(signer);
        return txResult ? txResult.transactionId : null;
    }
}