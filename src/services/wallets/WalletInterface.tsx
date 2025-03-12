import WalletConnectClient from "./wallet-connect/walletConnectClient";

export class WalletInterface{
    static async useWallet(){
        const walletType: string = this.getWalletType();

        if(walletType == "walletconnect"){
            const walletConnectClient = await WalletConnectClient.getInstance();
            return walletConnectClient;
        } else {
            throw new Error("Wallet not selected");
        }        
    }

    static getWalletType(): string{
        const walletType: string | null = localStorage.getItem("walletType")
        if(walletType){
            return walletType
        }else{
            return 'walletconnect'
        }
    }

    static setWalletType(walletType: string){
        localStorage.setItem("walletType", walletType)
    }
}