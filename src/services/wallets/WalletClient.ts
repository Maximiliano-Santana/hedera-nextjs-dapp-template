import { PublicKey, Transaction } from '@hashgraph/sdk';

export abstract class WalletClient {
    abstract connect(): Promise<void>;
    abstract disconnect(): Promise<void>;
    abstract getPublicKey(): PublicKey;
    abstract getAccountId(): string;
    abstract signTransaction<T extends Transaction>(tx: T): Promise<string | null>;
}