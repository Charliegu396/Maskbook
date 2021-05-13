import { useAsyncFn } from 'react-use'
import { Services } from '../../../API'
import type { PersonaIdentifier } from '@dimensiondev/maskbook-shared'

export function useConnectSocialNetwork() {
    return useAsyncFn(async (identifier: PersonaIdentifier, networkIdentifier: string) => {
        return Services.SocialNetwork.connectSocialNetwork(identifier, networkIdentifier)
    })
}
