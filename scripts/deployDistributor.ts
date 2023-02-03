import { Address, toNano } from 'ton-core'
import { Distributor } from '../wrappers/Distributor'
import { compile, NetworkProvider } from '@ton-community/blueprint'

export async function run(provider: NetworkProvider) {
    const myAddress = Address.parse('EQCAUHFtawOWG4agD3gkE72i8DZpK5Q-i6B_eg4du3ku9Exx')

    const myContract = Distributor.createFromConfig({
        owner: myAddress,
        processingPrice: toNano('0.01'),
        seed: 0,
        shares: [
            {address: myAddress, factor: 1, base: 2, comment: 'first half'},
            {address: myAddress, factor: 1, base: 2, comment: 'second half'},
        ]
    }, await compile('Distributor'))

    await provider.deploy(myContract, toNano('0.05'))

    const openedContract = provider.open(myContract)

    console.log('✅ distributor is deployed at address: ', openedContract.address)
}