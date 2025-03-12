import { DAppConnector, DAppSigner } from "@hashgraph/hedera-wallet-connect";
import { HederaSessionEvent, HederaChainId, HederaJsonRpcMethod } from "@hashgraph/hedera-wallet-connect";
import { LedgerId, PublicKey, Transaction, TransactionResponse } from "@hashgraph/sdk";
import { useWalletState } from "@/services/walletState";
import { SessionTypes, SignClientTypes } from "@walletconnect/types";

interface walletConnectClient{
    connector: DAppConnector | undefined;
    session: SessionTypes.Struct | undefined;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    getSigner?: () => DAppSigner;
    getAccountId?: () => string;
    getPublicKey?: () => PublicKey;
    signTransaction?: <T extends Transaction>(tx: T) => Promise<string | null>;
}

export default class WalletConnectClient implements walletConnectClient{
    private static instance: WalletConnectClient
    connector: DAppConnector | undefined;
    session: SessionTypes.Struct | undefined;

    constructor(){}

    static async getInstance(): Promise<WalletConnectClient> {
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
        
        await this.connector.init({logger: 'error'})
    }

    async connect(): Promise<void> {
        const { connect } = useWalletState.getState();
        this.session = await this.connector?.openModal();

        // Validates if session was created
        if (!this.session) {
            console.warn('No session found. Wallet connection failed.');
            return;
        }
        
        //Syncronize walletStore
        const sessionAccount = this.session.namespaces?.hedera?.accounts?.[0]
        const sessionParts = sessionAccount?.split(':')
        const accountId = sessionParts.pop()
        
        if (!accountId) {
            console.warn('Failed to extract accountId.');
            return;
        }
        connect(accountId)
    }
    
    async disconnect(): Promise<void>{
        const { disconnect } = useWalletState.getState();
    
        if(this.session && this.connector){
            await this.connector.disconnectAll()
            disconnect();
        } 
    }
    
    getSigner(): DAppSigner{
        if (!this.connector ||this.connector?.signers.length === 0) {
          throw new Error('No signers found!');
        }
        return this.connector?.signers[0];
    }
    
    getAccountId(): string {
        if(!this.session || !this.session.namespaces?.hedera?.accounts?.[0]) return '';

        const sessionAccount = this.session.namespaces?.hedera?.accounts?.[0]
        const sessionParts = sessionAccount?.split(':')
        const accountId = sessionParts.pop()

        if (!accountId) {
            console.warn('Failed to extract accountId.');
            return '';
        }
        return accountId
    }
    
    getPublicKey(): PublicKey {
        if(!this.session){
            throw new Error('No session found. Wallet connection failed.');           
        }

        return PublicKey.fromStringED25519(this.session.peer.publicKey)
    }
    
    async signTransaction<T extends Transaction>(tx: T): Promise<string | null> {
        const signer: DAppSigner = this.getSigner();
        await tx.freezeWithSigner(signer);
        const txResult: TransactionResponse = await tx.executeWithSigner(signer);
        return txResult ? txResult.transactionId.toString() : null;
    }
}