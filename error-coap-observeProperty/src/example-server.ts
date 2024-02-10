import { Servient } from '@node-wot/core'
import { CoapServer } from '@node-wot/binding-coap'

// create Servient add CoAP binding
const servient = new Servient()
servient.addServer(new CoapServer())

servient.start().then((WoT) => {
  WoT.produce({
    title: 'MyCounter',
    properties: {
      count: {
        type: 'integer',
        readOnly: false,
        observable: true,
      },
    },
  }).then((thing) => {
    let count = 0

    console.log('Produced ' + thing.getThingDescription().title)

    // set property handlers (using async-await)
    thing.setPropertyReadHandler('count', async () => count)
    thing.setPropertyWriteHandler('count', async (intOutput) => {
      const value = await intOutput.value()
      if (typeof value === 'number') {
        count = value
      }
    })

    thing.expose().then(() => {
      console.info(thing.getThingDescription().title + ' ready')
      console.info('TD : ' + JSON.stringify(thing.getThingDescription()))
    })
  })
})
