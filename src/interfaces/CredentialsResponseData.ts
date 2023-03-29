import { TokenData } from './TokenData'
import { UserData } from './UserData';

export interface CredentialsResponseData {
    accessToken: TokenData;
    user: UserData;
}