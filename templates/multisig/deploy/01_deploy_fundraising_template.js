const func = async function (hre) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, get, read } = deployments;

  const { deployer } = await getNamedAccounts();

  let daoFactory, ensAddress, minimeFactory, argonID

  if (hre.network.name == 'xdai') {
    daoFactory = { address: '0x4037f97fcc94287257e50bd14c7da9cb4df18250'}
    ensAddress = '0xaafca6b0c89521752e559650206d7c925fd0e530'
    minimeFactory = { address: '0xf7d36d4d46cda364edc85e5561450183469484c5' }
    aragonID = { address: '0x0b3b17f9705783bb51ae8272f3245d6414229b36' }
    wxdai = '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d'
    hny = '0x71850b7E9Ee3f13Ab46d67167341E4bDc905Eef9'
  } else {
    daoFactory = await get('DAOFactory')
    ensAddress = await read('APMRegistryFactory', { from: deployer }, 'ens')
    minimeFactory = await get('MiniMeTokenFactory')
    aragonID = await get('FIFSResolvingRegistrar')
  }

  await deploy('FundraisingMultisigTemplate', {
    from: deployer,
    args: [daoFactory.address, ensAddress, minimeFactory.address, aragonID.address, wxdai, hny],
    log: true,
    deterministicDeployment: true,
  })
};

module.exports = func;
