import { pickBy } from 'lodash-es'
import type { TransactionConfig } from 'web3-core'

import { addGasMargin } from '../../../web3/helpers'
import { getNonce } from './nonce'
import { estimateGas, getGasPrice } from './network'
import { currentSelectedWalletAddressSettings } from '../../../plugins/Wallet/settings'
import { toHex } from 'web3-utils'

/**
 * Compose a common purpose transaction payload
 * @param from
 * @returns
 */
export async function composeTransaction({
    from = currentSelectedWalletAddressSettings.value,
    to,
    data,
    value,
}: TransactionConfig): Promise<TransactionConfig> {
    const [nonce, gas, gasPrice] = await Promise.all([
        getNonce(from as string),
        estimateGas({
            from,
            to,
            data,
            value: value ? toHex(value) : undefined,
        }),
        getGasPrice(),
    ])

    return pickBy({
        from,
        value,
        nonce,
        gas: addGasMargin(gas).toString(),
        gasPrice,
    })
}
