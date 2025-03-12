'use client'

import { useWalletState } from "@/services/wallets/walletState";
import Button from "../ui/buttons/Button";
import { useEffect } from "react";
import { WalletInterface } from "@/services/wallets/WalletInterface";

export default function ConnectWalletButton(){
    const { isConnected, accountId } = useWalletState();
    
    const toggleConnectWallet = async ()=>{
        const wallet = await WalletInterface.useWallet();

        if(isConnected){
            wallet.disconnect();
        } else {
            wallet.connect();
        }

    }

    return <>
        <Button onClick={toggleConnectWallet}>
            {isConnected ? accountId : 'Connect Wallet'}
        </Button>
    </>
}